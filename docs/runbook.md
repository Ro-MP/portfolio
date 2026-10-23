# Runbook de despliegue

Todo lo que cambia AWS o DNS lo ejecutas tú. Nada de esto se ha aplicado todavía.

## 0. Requisitos
- Cuenta de AWS y CLI configurada (`aws sts get-caller-identity`).
- Terraform ≥ 1.10 (`brew install hashicorp/tap/terraform` o OpenTofu).
- Repositorio en GitHub (para el deploy automático).

## 1. Estado de Terraform (una sola vez)
```bash
aws s3api create-bucket --bucket TU-portfolio-tfstate --region us-east-1
aws s3api put-bucket-versioning --bucket TU-portfolio-tfstate --versioning-configuration Status=Enabled
aws s3api put-public-access-block --bucket TU-portfolio-tfstate \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
cd infra && cp backend.hcl.example backend.hcl   # pon el nombre del bucket
cp terraform.tfvars.example terraform.tfvars
```

## 2. Staging en la URL de CloudFront (sin dominio)
```bash
cd infra
terraform init -backend-config=backend.hcl
terraform plan
terraform apply
cd ../web && npm run build:staging
S3_BUCKET=$(terraform -chdir=../infra output -raw bucket_name) \
CF_DISTRIBUTION_ID=$(terraform -chdir=../infra output -raw distribution_id) \
./scripts/deploy.sh
terraform -chdir=../infra output cloudfront_domain   # abre esta URL
```
El sitio responde con `X-Robots-Tag: noindex` (variable `allow_index = false`).

## 3. Dominio propio (DNS en Hostinger)
Hostinger no permite CNAME en el dominio raíz, así que el sitio vive en `www.<dominio>`.

1. En `terraform.tfvars`: `domain_name = "tudominio.com"` y `certificate_validated = false`. `terraform apply`.
2. `terraform output acm_validation_records`: crea ese **CNAME** en Hostinger (hPanel → Dominios → DNS / Zona DNS).
3. Espera a que ACM lo valide (minutos). Pon `certificate_validated = true` y `terraform apply` de nuevo.
4. En Hostinger crea el **CNAME** `www` → el valor de `terraform output hostinger_dns`.
5. En Hostinger configura el reenvío del dominio raíz a `https://www.tudominio.com` (redirección 301).
6. Pon `SITE_URL=https://www.tudominio.com` (variable de GitHub) y `SITE_URL` en `web/src/app/site.config.ts` para canonical, hreflang y sitemap.

## 4. Deploy automático con GitHub Actions
1. `github_repo = "owner/repo"` en `terraform.tfvars` y `terraform apply` (crea el rol OIDC).
2. En GitHub → Settings → Secrets and variables → Actions → **Variables**:
   `AWS_DEPLOY_ROLE_ARN`, `AWS_REGION`, `S3_BUCKET`, `CF_DISTRIBUTION_ID`, `SITE_URL` (valores de `terraform output`).
3. Cada push a `main` que toque `web/` construye, prueba, sube a S3 e invalida CloudFront.

## 5. Publicar de verdad (quitar `noindex`)
Solo cuando hayas revisado `PENDING.md` y confirmado con tu empleador lo que se publica:
1. Completa o elimina todos los pendientes: `npm run build:release` debe pasar.
2. Variable de GitHub `RELEASE = 1`.
3. `allow_index = true` en `terraform.tfvars` y `terraform apply`.

## Costos esperados
Dominio (Hostinger) + centavos al mes en S3/CloudFront con este tráfico. La alarma `budget_email` avisa al 80 % de `budget_limit_usd`.

## 6. Costos por proyecto (tags)
Todos los recursos llevan los tags `App=portfolio`, `Env=prod` y `ManagedBy=terraform` (`default_tags` en `versions.tf`).
Son claves propias: `Project`, `Environment` y `Name` ya los usan otros proyectos de la cuenta y no se tocan.
Cost Explorer ya está habilitado en la cuenta; Terraform no lo gestiona.

**Fase 1: etiquetar.** `terraform apply` con `activate_cost_tags = false` (el valor por defecto). Hasta la fase 2 el presupuesto
`portfolio-monthly` sigue midiendo toda la cuenta.

**Fase 2: activar (≥ 24 h después).** AWS solo deja activar el tag cuando la clave ya aparece en facturación.
1. Comprueba que ya aparece: `aws ce list-cost-allocation-tags --region us-east-1 --tag-keys App`.
2. `activate_cost_tags = true` en `terraform.tfvars` y `terraform apply`. Activa el tag `App`, filtra `portfolio-monthly` por
   `App=portfolio` y crea el monitor de anomalías (resumen diario por correo).

**Ver el gasto del proyecto.** Cost Explorer → Filters → Tag → `App` = `portfolio`, agrupado por Service. Por CLI:
```bash
aws ce get-cost-and-usage --region us-east-1 --granularity MONTHLY --metrics UnblendedCost \
  --time-period Start=$(date -v1d +%F),End=$(date +%F) \
  --filter '{"Tags":{"Key":"App","Values":["portfolio"]}}' --group-by Type=DIMENSION,Key=SERVICE
```
El gasto etiquetado aparece solo desde que el tag está activo (no es retroactivo).
