# PlaywrightCrest - Installatiegids

---

## ✅ Wat je nodig hebt

Installeer deze 3 dingen. Dat is het!

| Programma | Download | Waarom nodig |
|-----------|----------|------------|
| **Docker Desktop** | https://www.docker.com/products/docker-desktop | Draait alles in containers (database, backend, frontend) |
| **Visual Studio Code** | https://code.visualstudio.com/ | Code editor |
| **Git** | https://git-scm.com/ | Repository downloaden |

Dat is alles! Geen Node.js, npm of iets anders nodig. Alles draait in Docker.

---

## ⚡ Quick Start (3 stappen!)

### Stap 1: Repository klonen

Open Terminal/PowerShell en voer uit:

```bash
git clone https://github.com/AWegman/PlaywrightCrest.git C:\PlayWrightCrest
cd C:\PlaywrightCrest
```

### Stap 2: .env bestand aanmaken

Start Visual Studio Code op
Selecteer Open Folder (Ctrl + K Ctrl + O)

Maak een `.env` bestand in de root van projectfolder met deze inhoud:

```
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=play_right_garden
NODE_ENV=development
```

**In VSCode:**
1. Druk `Ctrl + N` → New File
2. Voeg de bovenstaande inhoud toe
3. Sla op als `.env` (File → Save As)

### Stap 3: Start Docker

Zorg dat Docker Desktop **open en draaiend** is!

Daarna, open in Visual Studio Code een New Terminal
Tik in: docker-compose up

Wacht totdat de container is opgestart.
Open daarna: http://localhost:5173/ 

Wacht tot je ziet dat alles draait. Klaar!

### Stap 4: Installatie Playwright en Playwright Agents

### Installatie Playwright

Open een New Terminal in Visual Studio Code
Voer uit: npm init playwright@latest

Kies voor
- Do you want to use TypeScript or JavaScript? -> TypeScript
- Where to put your end-to-end tests? -> e2e
- Add a GitHub Actions workflow? -> false
- Install Playwright browsers (can be done manually via 'npx playwright install')? -> true

Playwright wordt nu geinstalleerd.
Als de vraag: C:\PlayWrightCrest\playwright.config.ts already exists. Override it? (y/N) komt, kies dan voor false

### Install Playwright Agents

Open een nieuwe terminal (of gebruik de bestaande).

Installeer Playwright Agents:
Voer uit: npx playwright init-agents --loop=vscode

### Stap 5: Installatie extentions in Visual Studio Code

in Visual Studio Code, open Extentions (Ctrl + Shift + X)

Zoek naar Playwright Test for VSCode en installeer deze

Tijdens de workshop maken we gebruik van Claude Code for VS Code.
Zoek deze ook op in de Extiontions van Visual Studio Code en installeer deze.
Indien er om gevraagd wordt, maak een Claude account aan (https://claude.ai/onboarding) of als je deze al hebt log ermee in als daar in Visual Studio Code om gevraagd wordt.

### Stap 6: Final check
Wanneer alles succesvol is geinstalleerd, sluit Visual Studio Code af (of Ctrl + Shift + P en kies voor Developer: Reload Window)
Wanneer Visual Studio Code afgesloten, open Visual Studio Code opnieuw en open het Project PlayWrightCrest.
Open een New Terminal

Voer uit npx playwright test example.spec.ts --headed

Als het goed is, slagen er drie testen. 

Mocht iets niet lukken of kom je ergens niet uit, laat het mij dan weten.
