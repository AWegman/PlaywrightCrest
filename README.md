# PlaywrightCrest - Installatiegids

---

## ✅ Wat je nodig hebt

Installeer deze 4 tools voordat we beginnen. 

| Programma | Download | Waarom nodig |
|-----------|----------|------------|
| **Docker Desktop** | [Download Docker](https://www.docker.com/products/docker-desktop) | Draait de applicatie (database, backend, frontend) in containers |
| **Node.js (v18+)** | [Download Node.js](https://nodejs.org/) | Nodig om Playwright, de MCP-server en Claude lokaal aan te sturen |
| **Visual Studio Code** | [Download VS Code](https://code.visualstudio.com/) | De code editor waarin we werken |
| **Git** | [Download Git](https://git-scm.com/) | Om de repository te downloaden |

---

## Quick Start

### Stap 1: Repository klonen

Open je Terminal (Mac/Linux) of PowerShell (Windows) en voer de volgende commando's uit:

    git clone [https://github.com/AWegman/PlaywrightCrest.git](https://github.com/AWegman/PlaywrightCrest.git) C:\PlayWrightCrest
    cd C:\PlaywrightCrest

(Je mag de map uiteraard ook ergens anders plaatsen, onthoud dan even de locatie).

### Stap 2: .env bestand aanmaken
Start Visual Studio Code op.

Selecteer Open Folder (Ctrl + K Ctrl + O) en open de map C:\PlayWrightCrest.

Maak een nieuw bestand aan (Ctrl + N), noem het .env en plak de volgende inhoud erin:

    Codefragment
    DB_USER=postgres
    DB_PASSWORD=postgres
    DB_NAME=play_right_garden
    NODE_ENV=development

Sla het bestand op in de hoofdmap (root) van het project.

### Stap 3: Start de applicatie via Docker
Zorg dat Docker Desktop open is en op de achtergrond draait.

Open in Visual Studio Code een nieuwe terminal (`Ctrl + Shift + ``).

Voer het volgende commando uit:

    docker-compose up -d

Wacht totdat de containers zijn opgestart.

Controleer of de applicatie werkt door in je browser naar http://localhost:5173/ te gaan.

### Stap 4: Installatie Playwright & Agents
Open een nieuwe terminal in Visual Studio Code en volg de onderstaande stappen.

### Playwright installeren
Voer uit in de terminal:

    npm init playwright@latest

Kies tijdens de configuratie voor de volgende opties:

- TypeScript or JavaScript? -> TypeScript
- Where to put your end-to-end tests? -> e2e
- Add a GitHub Actions workflow? -> false
- Install Playwright browsers? -> true
- Krijg je de vraag: playwright.config.ts already exists. Override it? (y/N)? Kies dan voor false (N).

### Playwright Agents installeren
Voer in dezelfde terminal het volgende commando uit om de AI-agents voor te bereiden:

    npx playwright init-agents --loop=vscode

### Stap 5: VS Code Extensies & Claude (MCP) instellen
In Visual Studio Code, open het Extensies-menu (Ctrl + Shift + X). Zoek en installeer de volgende twee extensies:

- Playwright Test for VSCode
- Claude Code for VS Code (of de officiële Anthropic Claude extensie)

### Claude & Playwright MCP koppelen
Omdat Playwright MCP een server is, moeten we Claude vertellen hoe hij ermee moet praten.

Zorg dat je bent ingelogd in de Claude-extensie met je (gratis) Claude-account. Heb je deze nog niet, maak aan op: (https://claude.ai/onboarding).

- Druk in VS Code op de sneltoets Ctrl + Shift + P 
- Typ bovenin de balk die verschijnt: Preferences: Open User Settings (JSON) en druk op Enter.
- Er opent nu een bestand genaamd settings.json.
- Scroll helemaal naar beneden in dit bestand. Voeg vóór de allerlaatste accolade (}) een komma toe aan de regel erboven, en plak daarna de code voor Playwright MCP erin:

{
  "claude.mcp": {
    "mcpServers": {
      "playwright": {
        "command": "npx",
        "args": ["-y", "@playwright/mcp@latest"]
      }
    }
  }
}

Het moet er onderaan je bestand zo uit komen te zien:

{
    // ... hier staan al jouw andere instellingen ...
    
    "claudeCode.preferredLocation": "panel",
    "claudeCode.environmentVariables": [

    ], // <-- Vergeet de komma hier niet!
    "claude.mcp": {
        "mcpServers": {
            "playwright": {
                "command": "npx",
                "args": ["-y", "@playwright/mcp@latest"]
            }
        }
    }
} // Dit is de allerlaatste sluit-accolade van het bestand

Sla het bestand op met Ctrl + S en sluit het tabblad.


### Stap 6: Final check
We controleren of alles goed is geïnstalleerd.

Herstart Visual Studio Code (Ctrl + Shift + P -> typ Developer: Reload Window). (Of sluit af en open Visual Studio Code opnieuw)

Open een nieuwe terminal in VS Code.
Voer de standaard Playwright-test uit om te zien of de browsers werken:

    npx playwright test example.spec.ts --headed

Als het goed is opent er nu kort een browser en slagen er drie tests. Als dat werkt, ben je helemaal klaar voor de workshop!

Mocht je onverhoopt toch tegen issues of vragen aanlopen, laat het ons dan voor donderdag even weten, dan lossen we het samen op.