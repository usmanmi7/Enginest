#!/bin/bash
# Auto-push script for Enginest repo
# Commits all changes and pushes to GitHub

PROJECT_DIR="/home/z/my-project"
cd "$PROJECT_DIR"

# Check if there are any changes
if ! git diff --quiet 2>/dev/null || ! git diff --cached --quiet 2>/dev/null || [ -n "$(git ls-files --others --exclude-standard 2>/dev/null)" ]; then
  git add -A
  TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
  git commit -m "auto: update $TIMESTAMP" --allow-empty-message 2>/dev/null
  git push origin main 2>/dev/null && echo "[$TIMESTAMP] Pushed to Enginest" || echo "[$TIMESTAMP] Push failed"
else
  echo "No changes to push"
fi
