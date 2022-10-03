resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.files-app.id
  branch_name = "main"
  framework = "React"
  stage     = "PRODUCTION"
}