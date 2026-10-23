data "aws_caller_identity" "current" {}

locals {
  site_host           = var.domain_name != "" ? "www.${var.domain_name}" : ""
  use_custom_domain   = var.domain_name != "" && var.certificate_validated
  bucket_name         = "${var.project}-site-${data.aws_caller_identity.current.account_id}"
  origin_id           = "s3-site"
  deploy_role_enabled = var.github_repo != ""

  # Tags de todos los recursos (vía default_tags de los providers). Claves propias de este proyecto,
  # distintas de las que ya usa el resto de la cuenta (Project, Environment, Name), para poder filtrar
  # el gasto por App en Cost Explorer sin mezclarlo con otros proyectos.
  common_tags = {
    App       = var.project
    Env       = var.environment
    ManagedBy = "terraform"
  }

  # CSP estricta: todo el sitio es autoalojado. 'unsafe-inline' en estilos porque Angular inyecta
  # los estilos de los componentes en <style>. El video de demo (cuando exista) viene de YouTube.
  csp = join("; ", [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "media-src 'self'",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-src https://www.youtube-nocookie.com https://player.vimeo.com",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
  ])
}

# ---------- Bucket privado (solo CloudFront puede leerlo) ----------

resource "aws_s3_bucket" "site" {
  bucket = local.bucket_name
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = aws_s3_bucket.site.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "site" {
  bucket = aws_s3_bucket.site.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

data "aws_iam_policy_document" "site_read" {
  statement {
    sid       = "AllowCloudFrontRead"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.site.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket     = aws_s3_bucket.site.id
  policy     = data.aws_iam_policy_document.site_read.json
  depends_on = [aws_s3_bucket_public_access_block.site]
}

# ---------- CloudFront ----------

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.project}-site"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Reglas de ruta del sitio estático:
#  - "/" redirige a /en/ o /es/ según Accept-Language.
#  - "/ruta" redirige a "/ruta/" y "/ruta/" sirve "/ruta/index.html" (S3 + OAC no hace eso solo).
resource "aws_cloudfront_function" "routes" {
  name    = "${var.project}-routes"
  runtime = "cloudfront-js-2.0"
  publish = true
  comment = "Redirección por idioma y reescritura a index.html"
  code    = file("${path.module}/routes.js")
}

# Managed-CachingOptimized: respeta el Cache-Control que pone el script de deploy
# (immutable para archivos con hash, corto para HTML) y comprime con gzip y brotli.
data "aws_cloudfront_cache_policy" "optimized" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_response_headers_policy" "site" {
  name = "${var.project}-security-headers"

  security_headers_config {
    content_security_policy {
      content_security_policy = local.csp
      override                = true
    }
    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "DENY"
      override     = true
    }
    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }
    strict_transport_security {
      access_control_max_age_sec = 63072000
      include_subdomains         = true
      preload                    = false
      override                   = true
    }
  }

  custom_headers_config {
    items {
      header   = "Permissions-Policy"
      value    = "camera=(), microphone=(), geolocation=(), payment=()"
      override = true
    }

    dynamic "items" {
      for_each = var.allow_index ? [] : [1]
      content {
        header   = "X-Robots-Tag"
        value    = "noindex, nofollow"
        override = true
      }
    }
  }
}

resource "aws_cloudfront_distribution" "site" {
  enabled         = true
  is_ipv6_enabled = true
  http_version    = "http2and3"
  price_class     = var.price_class
  comment         = "${var.project} portfolio"
  aliases         = local.use_custom_domain ? [local.site_host] : []

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = local.origin_id
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id           = local.origin_id
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD", "OPTIONS"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    cache_policy_id            = data.aws_cloudfront_cache_policy.optimized.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.site.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.routes.arn
    }
  }

  # S3 con OAC responde 403 a las claves que no existen.
  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 60
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 60
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = local.use_custom_domain ? null : true
    acm_certificate_arn            = local.use_custom_domain ? aws_acm_certificate_validation.site[0].certificate_arn : null
    ssl_support_method             = local.use_custom_domain ? "sni-only" : null
    minimum_protocol_version       = local.use_custom_domain ? "TLSv1.2_2021" : null
  }
}
