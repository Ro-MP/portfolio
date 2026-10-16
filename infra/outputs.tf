output "bucket_name" {
  description = "Bucket S3 del sitio (variable S3_BUCKET en GitHub)."
  value       = aws_s3_bucket.site.bucket
}

output "distribution_id" {
  description = "ID de CloudFront (variable CF_DISTRIBUTION_ID en GitHub)."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain" {
  description = "URL de staging. También es el destino del CNAME de www en Hostinger."
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "acm_validation_records" {
  description = "CNAME que debes crear en Hostinger para validar el certificado."
  value = var.domain_name != "" ? [
    for o in aws_acm_certificate.site[0].domain_validation_options : {
      name  = o.resource_record_name
      type  = o.resource_record_type
      value = o.resource_record_value
    }
  ] : []
}

output "hostinger_dns" {
  description = "Registro final de www (cuando certificate_validated = true)."
  value = local.use_custom_domain ? {
    type  = "CNAME"
    name  = "www"
    value = aws_cloudfront_distribution.site.domain_name
  } : null
}

output "deploy_role_arn" {
  description = "Rol de GitHub Actions (variable AWS_DEPLOY_ROLE_ARN)."
  value       = local.deploy_role_enabled ? aws_iam_role.deploy[0].arn : null
}
