data "aws_route53_zone" "primary" {
    name = "btcalerter.com"
}

data "aws_ssm_parameter" "elb_arb" {
  name = "/elb/arn"
}

data "aws_lb" "btc" {
  arn = data.aws_ssm_parameter.elb_arb.value
}

resource "aws_route53_record" "api" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "api.btcalerter.com"
  type    = "A"
  
  alias {
    name                   = data.aws_lb.btc.dns_name
    zone_id                = data.aws_lb.btc.zone_id
    evaluate_target_health = false
  }
}
