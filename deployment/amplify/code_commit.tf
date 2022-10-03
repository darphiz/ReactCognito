resource "aws_codecommit_repository" "files-app-repo" {
  repository_name = "FilesAppCD"
  description     = "Repository for the Files APP frontend"
}