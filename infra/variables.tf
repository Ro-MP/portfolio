variable "project" {
  description = "Prefijo para nombrar los recursos."
  type        = string
  default     = "portfolio"
}

variable "aws_region" {
  description = "Región del bucket del sitio."
  type        = string
  default     = "us-east-1"
}

# [PENDIENTE: nombre del dominio, p. ej. "tudominio.com"]
variable "domain_name" {
  description = "Dominio raíz (sin www). El sitio se sirve en www.<dominio>. Vacío = solo la URL de CloudFront."
  type        = string
  default     = ""
}

variable "certificate_validated" {
  description = "Pon true cuando ya creaste en Hostinger el CNAME de validación del certificado (ver output acm_validation_records)."
  type        = bool
  default     = false
}

variable "allow_index" {
  description = "false = el sitio responde con X-Robots-Tag noindex. Ponlo en true solo cuando Rodrigo apruebe el contenido."
  type        = bool
  default     = false
}

variable "price_class" {
  description = "Clase de precio de CloudFront. PriceClass_100 cubre Norteamérica y Europa, la más barata."
  type        = string
  default     = "PriceClass_100"
}

# [PENDIENTE: owner/repo de GitHub, p. ej. "rodrigo/portafolio"]
variable "github_repo" {
  description = "Repositorio autorizado a desplegar por OIDC (owner/repo). Vacío = no se crea el rol de deploy."
  type        = string
  default     = ""
}

variable "create_github_oidc_provider" {
  description = "false si la cuenta ya tiene el proveedor OIDC de GitHub (solo puede haber uno por cuenta)."
  type        = bool
  default     = true
}

variable "budget_limit_usd" {
  description = "Límite mensual de la alarma de costos."
  type        = number
  default     = 5
}

variable "budget_email" {
  description = "Correo que recibe las alertas de costos. Vacío = no se crea la alarma."
  type        = string
  default     = ""
}
