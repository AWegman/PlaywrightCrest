#!/bin/bash

# Quick start script voor het dev environment
# Dit script helpt je aan de slag na "Reopen in Container" in VS Code

echo "🚀 Initializing Playwright Crest development environment..."

# Zorg dat we in de root directory zijn
cd /workspace

# Root dependencies
if [ ! -d "node_modules" ]; then
  echo "📦 Installing root dependencies..."
  npm install
fi

# Backend dependencies
if [ ! -d "backend/node_modules" ]; then
  echo "📦 Installing backend dependencies..."
  cd backend && npm install && cd ..
fi

# Frontend dependencies
if [ ! -d "frontend/node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  cd frontend && npm install && cd ..
fi

# Zorg voor .env file als die niet bestaat
if [ ! -f ".env" ]; then
  echo "📝 Creating .env from .env.example..."
  if [ -f ".env.example" ]; then
    cp .env.example .env
  else
    cat > .env << 'EOF'
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=play_right_garden
NODE_ENV=development
EOF
  fi
fi

echo "✅ Setup complete!"
echo ""
echo "🐳 To start Docker services, run:"
echo "   docker-compose up -d"
echo ""
echo "🧪 To run Playwright tests:"
echo "   npm test"
echo ""
