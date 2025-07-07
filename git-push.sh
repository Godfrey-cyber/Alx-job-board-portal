#!/bin/bash

# Prompt for commit message
echo "Enter your commit message:"
read commit_message

# Run git commands
git add .
git commit -m "$commit_message"
git push

echo "✅ Changes pushed successfully!"
