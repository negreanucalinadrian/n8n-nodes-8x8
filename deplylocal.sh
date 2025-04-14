#!/bin/bash

# Get the package name directly using npm CLI
PROJECT_NAME=$(npm pkg get name --json | tr -d '"')
echo "📦 Deploying $PROJECT_NAME to n8n..."

# Build the project
echo "🔨 Building..."
if ! npm run build; then
  echo "❌ Build failed! Stopping deployment."
  exit 1
fi

# Run link script if it exists
echo "🔗 Running npm link in project..."
npm link

# Link to n8n custom nodes directory
echo "🔗 Linking to n8n custom nodes directory..."
cd ~/.n8n/custom
npm link $PROJECT_NAME

echo "✅ Deployment complete! $PROJECT_NAME is now available in n8n."