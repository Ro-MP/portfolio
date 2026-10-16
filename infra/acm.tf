# Certificado para www.<dominio>. El DNS vive en Hostinger, así que la validación es manual en dos pasos:
#   1) apply con certificate_validated = false: crea el certificado y muestra los registros (output acm_validation_records).
#   2) crea ese CNAME en Hostinger, pon certificate_validated = true y vuelve a hacer apply.

resource "aws_acm_certificate" "site" {
  count    = var.domain_name != "" ? 1 : 0
  provider = aws.us_east_1

  domain_name       = local.site_host
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "site" {
  count    = local.use_custom_domain ? 1 : 0
  provider = aws.us_east_1

  certificate_arn = aws_acm_certificate.site[0].arn
}
