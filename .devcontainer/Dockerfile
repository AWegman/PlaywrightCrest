# Dev Container Dockerfile - Extra build tools
FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bookworm

# Install extra dev tools
RUN apt-get update && apt-get install -y \
    postgresql-client \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Playwright browsers globally
RUN npm install -g @playwright/test && \
    npx playwright install --with-deps

WORKDIR /workspace
