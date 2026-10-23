# Rol de deploy para GitHub Actions por OIDC (sin llaves de larga duración) y con mínimo privilegio.

resource "aws_iam_openid_connect_provider" "github" {
  count          = local.deploy_role_enabled && var.create_github_oidc_provider ? 1 : 0
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
}

data "aws_iam_openid_connect_provider" "github" {
  count = local.deploy_role_enabled && !var.create_github_oidc_provider ? 1 : 0
  url   = "https://token.actions.githubusercontent.com"
}

locals {
  github_oidc_arn = local.deploy_role_enabled ? (
    var.create_github_oidc_provider ? aws_iam_openid_connect_provider.github[0].arn : data.aws_iam_openid_connect_provider.github[0].arn
  ) : ""

  # GitHub emite el sub con IDs inmutables ("repo:Ro-MP@<owner_id>/portfolio@<repo_id>:...") en repos nuevos
  # y con nombres ("repo:owner/repo:...") en los antiguos. Se usa el formato de los IDs si se dan ambos.
  github_owner_name = split("/", var.github_repo)[0]
  github_repo_name  = length(split("/", var.github_repo)) > 1 ? split("/", var.github_repo)[1] : ""
  github_sub_prefix = var.github_owner_id != "" && var.github_repo_id != "" ? (
    "repo:${local.github_owner_name}@${var.github_owner_id}/${local.github_repo_name}@${var.github_repo_id}"
  ) : "repo:${var.github_repo}"
}

data "aws_iam_policy_document" "deploy_trust" {
  count = local.deploy_role_enabled ? 1 : 0

  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [local.github_oidc_arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    # Solo la rama main de este repositorio.
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["${local.github_sub_prefix}:ref:refs/heads/main"]
    }
  }
}

resource "aws_iam_role" "deploy" {
  count              = local.deploy_role_enabled ? 1 : 0
  name               = "${var.project}-deploy"
  assume_role_policy = data.aws_iam_policy_document.deploy_trust[0].json
}

data "aws_iam_policy_document" "deploy" {
  count = local.deploy_role_enabled ? 1 : 0

  statement {
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.site.arn]
  }

  statement {
    actions   = ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]
  }

  statement {
    actions   = ["cloudfront:CreateInvalidation"]
    resources = [aws_cloudfront_distribution.site.arn]
  }
}

resource "aws_iam_role_policy" "deploy" {
  count  = local.deploy_role_enabled ? 1 : 0
  name   = "deploy-site"
  role   = aws_iam_role.deploy[0].id
  policy = data.aws_iam_policy_document.deploy[0].json
}
