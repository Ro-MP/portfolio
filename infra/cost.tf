# Control de costos por proyecto. Se activa en la fase 2 (activate_cost_tags = true), cuando la clave de tag App
# ya aparece en los datos de facturación (hasta ~24 h después de aplicar los tags). Ver docs/runbook.md.
# Cost Explorer en sí ya está habilitado en la cuenta y no se gestiona con Terraform.
# La API de Cost Explorer solo existe en us-east-1.

# Tag propio de este proyecto. No se tocan Project/Environment/Name: los usan otros proyectos de la cuenta.
resource "aws_ce_cost_allocation_tag" "app" {
  count    = var.activate_cost_tags ? 1 : 0
  provider = aws.us_east_1

  tag_key = "App"
  status  = "Active"
}

# Detecta picos de gasto inusuales solo en los recursos con App = <project>.
resource "aws_ce_anomaly_monitor" "app" {
  count    = var.activate_cost_tags ? 1 : 0
  provider = aws.us_east_1

  name         = "${var.project}-cost"
  monitor_type = "CUSTOM"

  monitor_specification = jsonencode({
    Tags = {
      Key          = "App"
      Values       = [var.project]
      MatchOptions = ["EQUALS"]
    }
  })

  depends_on = [aws_ce_cost_allocation_tag.app]
}

# Resumen diario por correo si una anomalía supera el límite del presupuesto.
resource "aws_ce_anomaly_subscription" "app" {
  count    = var.activate_cost_tags && var.budget_email != "" ? 1 : 0
  provider = aws.us_east_1

  name             = "${var.project}-cost-anomalies"
  frequency        = "DAILY"
  monitor_arn_list = [aws_ce_anomaly_monitor.app[0].arn]

  subscriber {
    type    = "EMAIL"
    address = var.budget_email
  }

  threshold_expression {
    dimension {
      key           = "ANOMALY_TOTAL_IMPACT_ABSOLUTE"
      match_options = ["GREATER_THAN_OR_EQUAL"]
      values        = [tostring(var.budget_limit_usd)]
    }
  }
}
