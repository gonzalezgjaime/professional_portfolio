# s3 static website url

output "website_url" {
  value = "https://${aws_s3_bucket.portfolio.bucket}.s3-website.${var.region}.amazonaws.com"
}