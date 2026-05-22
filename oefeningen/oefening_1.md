### Oefening 1: Werken met de playwright-test-generator en healer agent
In deze oefening gebruik je de AI-agent om een test te schrijven op basis van een natuurlijke taal-opdracht, en gebruik je de healer om fouten te herstellen.

### Stap 1: Voorbereiding
Zorg dat je lokale server draait op: http://localhost:5173/. (Wanneer deze nog niet draait, in de terminal, typ in: docker compose en druk op Enter)

- Open de Chat-interface in je editor (waar de Playwright agents beschikbaar zijn).

### Stap 2: Test genereren via de Agent
In plaats van zelf te klikken, geef je de opdracht aan de agent.

- Selecteer de agent @playwright-test-generator in het chatvenster.
- Typ de volgende prompt:

    "Open de website http://localhost:5173/ en genereer een simpele test die kijkt of de website online is."

De agent zal de browser op de achtergrond openen, de pagina inspecteren en een codevoorstel doen.

- Klik op Insert of Copy om de test in een nieuw testbestand te plaatsen.

### Stap 3: De test handmatig laten falen
Om de "Healer" agent straks te kunnen testen, moeten we de test eerst onklaar maken.

- Open het testbestand dat je net hebt gemaakt.
- Pas de verwachting (de expect) aan naar iets dat niet klopt.

    Voorbeeld: Verander de tekst die gezocht wordt naar "Deze tekst bestaat niet".

- Sla het bestand op en draai de test via de Playwright Sidebar of de terminal.
- Resultaat: De test faalt (rood).

### Stap 4: De playwright-test-healer inschakelen
Nu roepen we de hulp in van de healer-agent.

- Ga terug naar het chatvenster en selecteer nu de agent @playwright-test-healer.
- Typ de volgende prompt:

    "Fix mijn test"

- De healer-agent analyseert waarom de test faalt en vergelijkt de code met de actuele staat van de website op localhost:5173.
- De agent komt met een voorstel om de selector of tekst te herstellen.
- Klik op Keep of Accept om de fix door te voeren.

### Stap 5: Verificatie

Sla de wijzigingen op.

- Draai de test nogmaals.
- Als het goed is, kleurt de test nu weer groen.

Waarom dit handig is:
De playwright-test-generator agent is vaak slimmer dan de standaard recorder, omdat hij probeert direct de meest "robuuste" selectors te kiezen (zoals ARIA-rollen of test-ID's) in plaats van lange CSS-paden.