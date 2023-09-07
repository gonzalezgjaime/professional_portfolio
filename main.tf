# establish required providers
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.0.0"
    }
  }
  backend "remote" {
    organization = "gray-beard"
    workspaces {
        name = "dev"
    }
  }
}

# define provider and region
provider "aws" {
  region = var.region
}

provider "aws" {
  alias = "east"
  region = "us-east-1"
}

# create s3 bucket
resource "aws_s3_bucket" "portfolio" {
  bucket = "portfolio-jaimegonzalez-tech"
  force_destroy = true

  tags = {
    Name = "portfolio"
  }
}

# create s3 bucket policy document for public read
data "aws_iam_policy_document" "public_read" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${aws_s3_bucket.portfolio.bucket}/*"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

# create s3 policy for public read
resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.portfolio.id
  policy = data.aws_iam_policy_document.public_read.json
}

# create s3 bucket object
resource "aws_s3_object" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id
  key    = "index.html"
  source = "index.html"
  content_type = "text/html"

  depends_on = [
    aws_s3_bucket.portfolio,
  ]
}

# define bucket website configuration
resource "aws_s3_bucket_website_configuration" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "error.html"
  }
}

# enable bucket versioning
resource "aws_s3_bucket_versioning" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id
  versioning_configuration {
    status = "Enabled"
  }
}

# create hosted zone for jaimegonzalez.tech
resource "aws_route53_zone" "main" {
  name = "www.jaimegonzalez.tech"
}

# create A record for jaimegonzalez.tech
resource "aws_route53_record" "portfolio" {
  name    = "www.jaimegonzalez.tech"
  type    = "A"
  zone_id = aws_route53_zone.main.zone_id

  alias {
    name = aws_cloudfront_distribution.cfd.domain_name
    zone_id = aws_cloudfront_distribution.cfd.hosted_zone_id
    evaluate_target_health = false
  }
}

# define oia for cloudfront
resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for portfolio bucket"
}

# create cloudfront distribution
resource "aws_cloudfront_distribution" "cfd" {
  origin {
    domain_name = aws_s3_bucket.portfolio.bucket_regional_domain_name
    origin_id   = "S3Origin"
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  # define aliases for cloudfront required to access site using www.jaimegonzalez.tech
  aliases = ["www.jaimegonzalez.tech"]

  # define cloudfront dependencies
  depends_on = [
    aws_s3_bucket.portfolio,
    aws_acm_certificate.cert,
  ]

  enabled = true
  is_ipv6_enabled = true
  comment = "CDN for portfolio bucket"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3Origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    # force HTTPS
    viewer_protocol_policy = "redirect-to-https"
    min_ttl = 0
    default_ttl = 3600
    max_ttl = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # reference acm cert and ssl support method
  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    ssl_support_method = "sni-only"
  }
}

# create certificate for cloudfront
resource "aws_acm_certificate" "cert" {
  domain_name = "www.jaimegonzalez.tech"
  validation_method = "DNS"
  provider = aws.east
  lifecycle {
    create_before_destroy = true
  }
}

# automate certificate validation
resource "aws_route53_record" "cert_validation" {
  name = local.domain_validation[0].resource_record_name
  type = local.domain_validation[0].resource_record_type
  zone_id = aws_route53_zone.main.zone_id
  records = [local.domain_validation[0].resource_record_value]
  ttl = 60
}

# complete validation
resource "aws_acm_certificate_validation" "cert" {
  provider = aws.east
  certificate_arn = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.cert_validation.fqdn]
}



