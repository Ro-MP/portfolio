terraform {
  required_version = ">= 1.10" # use_lockfile (bloqueo de estado en S3, sin DynamoDB)

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # Estado remoto. Los valores van en backend.hcl (ver backend.hcl.example y docs/runbook.md).
  backend "s3" {}
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = local.common_tags
  }
}

# CloudFront solo acepta certificados de ACM emitidos en us-east-1.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = local.common_tags
  }
}
