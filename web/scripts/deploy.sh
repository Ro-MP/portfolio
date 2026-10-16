#!/usr/bin/env bash
# Sube dist/web/browser a S3 con el Cache-Control correcto e invalida CloudFront.
# Uso: S3_BUCKET=... CF_DISTRIBUTION_ID=... ./scripts/deploy.sh
set -euo pipefail

: "${S3_BUCKET:?Falta S3_BUCKET (output bucket_name de Terraform)}"
: "${CF_DISTRIBUTION_ID:?Falta CF_DISTRIBUTION_ID (output distribution_id de Terraform)}"

DIST="$(cd "$(dirname "$0")/.." && pwd)/dist/web/browser"
[ -f "$DIST/en/index.html" ] || { echo "No hay build en $DIST. Corre npm run build:staging antes." >&2; exit 1; }

# 1) Archivos con hash en el nombre: cache de un año, nunca cambian. No se borran los antiguos
#    (son inmutables e inofensivos).
aws s3 sync "$DIST" "s3://$S3_BUCKET" \
  --exclude "*" --include "*.js" --include "*.css" --include "media/*" \
  --cache-control "public,max-age=31536000,immutable" --size-only

# 2) Todo lo demás (HTML, favicon, robots, sitemap, 404): se revalida siempre y se borra lo que ya no existe.
aws s3 sync "$DIST" "s3://$S3_BUCKET" --delete \
  --exclude "*.js" --exclude "*.css" --exclude "media/*" \
  --cache-control "public,max-age=0,s-maxage=300,must-revalidate"

aws cloudfront create-invalidation --distribution-id "$CF_DISTRIBUTION_ID" --paths "/*" >/dev/null
echo "Deploy listo: s3://$S3_BUCKET (invalidación enviada)."
