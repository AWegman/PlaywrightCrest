# 🐳 Dev Container Setup Guide

Dit project is nu geconfigureerd met VS Code **Dev Containers** zodat je alles in een Docker container kunt werken zonder alles handmatig te hoeven installeren.

## Quick Start

### 1️⃣ Vereisten
- **VS Code** met [Dev Containers extensie](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- **Docker Desktop** (geïnstalleerd en draaiend)

### 2️⃣ Container Starten

In VS Code:
1. Open het Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Zoek: **"Dev Containers: Reopen in Container"**
3. Wacht tot de container gebuild en geopend is ⏳

### 3️⃣ Setup Voltooien

Zodra je in de container bent:
```bash
# Dependencies voor alle services installeren
bash .devcontainer/setup.sh
```

Of handmatig:
```bash
# Root dependencies (Playwright tests)
npm install

# Backend dependencies
cd backend && npm install && cd ..

# Frontend dependencies  
cd frontend && npm install && cd ..
```

### 4️⃣ Docker Services Starten

In dezelfde terminal:
```bash
# Start database, backend, en frontend
docker-compose up -d

# Controleer of alles draait
docker-compose ps
```

Nu heb je:
- 📦 **Frontend**: http://localhost:5173
- 🔌 **Backend API**: http://localhost:5000
- 🗄️ **PostgreSQL**: localhost:5432

## 🧪 Playwright Tests Runnen

```bash
# Alle tests
npx playwright test

# Specifieke file
npx playwright test tests/example.spec.ts

# Debug mode
npx playwright test --debug

# UI mode (interactief)
npx playwright test --ui
```

## 📝 Dev Container Features

✅ **Automatische Setup:**
- Node.js 20
- TypeScript
- Playwright (inclusief alle browsers)
- PostgreSQL client tools
- Docker CLI (voor docker-compose commands)

✅ **VS Code Extensions:**
- Playwright Inspector
- Git Lens
- GitHub Copilot
- ESLint

✅ **Automatisch Forwarded:**
- Port 5173 (Frontend)
- Port 5000 (Backend)
- Port 5432 (Database)

## 🔗 Docker Services Beheren

```bash
# Logs bekijken (allemaal)
docker-compose logs -f

# Logs van één service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f db

# In een container gaan
docker-compose exec backend sh
docker-compose exec frontend sh

# Database query uitvoeren
docker-compose exec db psql -U postgres -d play_right_garden

# Services stoppen (data behouden)
docker-compose stop

# Services volledig verwijderen
docker-compose down

# Services verwijderen + data opschonen
docker-compose down -v

# Opnieuw builden (na dependency changes)
docker-compose up --build
```

## 🚨 Troubleshooting

### Dev Container start niet
- Zorg dat **Docker Desktop draait**
- Check VS Code Output: `Remote Containers`
- Verwijder container en rebuild: `Dev Containers: Rebuild Container`

### docker-compose command niet gevonden
- Zorg dat je **in de container bent** (zie Status Bar in VS Code)
- Docker socket moet gemount zijn (zou automatisch moeten lukken)

### Poorten al in gebruik
Als 5173, 5000 of 5432 al gebruikt worden:
```bash
# Verander de port in docker-compose.yml:
ports:
  - "3000:5173"   # Frontend op poort 3000
  - "3001:5000"   # Backend op poort 3001
```

### Dependencies niet geïnstalleerd
```bash
# Forceer rebuild van images
docker-compose down -v
docker-compose up --build
```

## 📚 Meer Info

- [Dev Containers Docs](https://code.visualstudio.com/docs/devcontainers/containers)
- [docker-compose.yml specifics](docker-compose.yml)
- [DOCKER_SETUP.md](DOCKER_SETUP.md) - Originele Docker guide
