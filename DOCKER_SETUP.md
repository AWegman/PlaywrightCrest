# Docker Setup Guide

## Vereisten
- Docker Desktop geïnstalleerd
- Docker Compose (meestal meegeleverd met Docker Desktop)

## Setup

### 1. Environment variables instellen
**Dit is verplicht!** `.env` staat in `.gitignore` dus je moet het handmatig aanmaken.

Kopieer `.env.example` naar `.env`:
```bash
cp .env.example .env
```

Je kunt de waarden aanpassen naar behoefte, maar de defaults werken prima. Het `.env` bestand bevat gevoelige info (wachtwoorden) en moet uit git gehouden worden.

### 2. Docker containers starten
```bash
docker-compose up
```

Dit start:
- **PostgreSQL database** op `localhost:5432`
- **Backend API** op `http://localhost:5000`
- **Frontend** op `http://localhost:5173`

### 3. Eerste keer? Database initialiseren
Als dit je eerste keer is of je database is leeg, je moet waarschijnlijk je database schema setup uitvoeren. Check je backend code voor SQL scripts.

## Commando's

### Start alle services
```bash
docker-compose up
```

### Start in detached mode (achtergrond)
```bash
docker-compose up -d
```

### Stop containers
```bash
docker-compose down
```

### Stop containers en verwijder volumes
```bash
docker-compose down -v
```

### Logs bekijken
```bash
docker-compose logs -f
```

### Specifieke service logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Container betreden voor debugging
```bash
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec db psql -U postgres -d play_right_garden
```

## Troubleshooting

### Database verbinding faalt
- Zorg dat de `db` container volledig gestart is (check health status)
- Control database credentials in `.env`
- Bekijk logs: `docker-compose logs db`

### Frontend kan backend niet bereiken
- Zorg dat je frontend code `http://localhost:5000` als API URL gebruikt
- In dev mode moeten beide containers op dezelfde host draaien

### Poort al in gebruik
Verander de poort mapping in `docker-compose.yml`:
```yaml
ports:
  - "8080:5000"  # Backend op poort 8080 in plaats van 5000
```

### Dependencies veranderen
Als je npm packages toevoegt:
```bash
docker-compose down  # Stop containers
docker-compose up --build  # Rebuild images
```

## Production Build

Voor production setup met optimized images:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

(We kunnen een prod compose file toevoegen als nodig)
