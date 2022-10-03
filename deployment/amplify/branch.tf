resource "aws_amplify_branch" "master" {
  app_id      = aws_amplify_app.files-app.id
  branch_name = "master"
  framework = "React"
  stage     = "PRODUCTION"
}