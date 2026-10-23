resource "aws_budgets_budget" "monthly" {
  count        = var.budget_email != "" ? 1 : 0
  name         = "${var.project}-monthly"
  budget_type  = "COST"
  limit_amount = tostring(var.budget_limit_usd)
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  # Solo el gasto de este proyecto (tag App). Sin filtro mide toda la cuenta; el filtro exige que el tag
  # ya esté activo como cost allocation tag, por eso depende de activate_cost_tags (ver cost.tf).
  dynamic "cost_filter" {
    for_each = var.activate_cost_tags ? [1] : []
    content {
      name   = "TagKeyValue"
      values = [format("user:App$%s", var.project)]
    }
  }

  depends_on = [aws_ce_cost_allocation_tag.app]

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.budget_email]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = [var.budget_email]
  }
}
