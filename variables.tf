# aws region for Gray Beard Labs
variable "region" {
  default = "us-west-2"
}

variable "AWS_ACCESS_KEY_ID" {
  description = "AWS Access Key ID"
  type        = string
  sensitive   = true
}

variable "AWS_SECRET_ACCESS_KEY" {
  description = "AWS Secret Access Key"
  type        = string
  sensitive   = true
}

# convert domain_validation_options to a list in order to access
locals {
  domains = {
    "jaimegonzalez.tech"     = {},
    "www.jaimegonzalez.tech" = {}
  }

  domain_validation = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => dvo
  }
}