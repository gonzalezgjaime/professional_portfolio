# aws region for Gray Beard Labs
variable "region" {
    default = "us-west-2"
}

# convert domain_validation_options to a list in order to access
locals {
    domain_validation = [for dvo in aws_acm_certificate.cert.domain_validation_options : dvo if dvo.domain_name == "www.jaimegonzalez.tech"]
}