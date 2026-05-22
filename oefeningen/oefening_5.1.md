### Oefeing 5.1 Aanmaken van SKILLS.md
In de vorige module hebben we gezien hoe AGENTS.md de Agent voorziet van de juiste context. Maar wat als we de Agent een specifieke, complexe taak willen laten uitvoeren die uit meerdere stappen bestaat? Bijvoorbeeld: het omzetten van een handmatig testscenario (Gherkin/Cucumber) naar een Playwright test, inclusief het controleren van de codestandaarden.

Als we dit elke keer handmatig moeten instrueren, worden onze prompts alsnog lang. Hiervoor gebruiken we een Skill.

Wat is een Skill?
Een Skill is een herbruikbare blauwdruk voor een specifieke taak. Technisch gezien is het een submap in je project  met daarin een SKILL.md bestand.

Dit bestand bevat:

- Metadata: De naam van de skill en wanneer de agent deze moet activeren.
- De Workflow: Een stapsgewijs algoritme dat de agent moet doorlopen om tot het eindresultaat te komen.

Oefening 5.1: De 'Gherkin-naar-Playwright' Skill
In deze oefening gaan we een Skill maken die de Agent leert hoe hij een functioneel scenario (geschreven in Given-When-Then/Gherkin stijl) feilloos omzet in een Playwright test die voldoet aan onze AGENTS.md.

#### Stap 1: De mappenstructuur opzetten

-  Maak in de root van je project een map aan genaamd: skills/gherking-to-playwright
- In die map maak een nieuw bestand aan: SKILL.md

#### Stap 2: De Skill definiëren
Plaats de volgende inhoud in het SKILL.md bestand:

   # Skill: Gherkin naar Playwright Converter

   ## Beschrijving
   Gebruik deze skill wanneer de gebruiker vraagt om een user story, acceptatiecriteria of een Gherkin-scenario (Given/When/Then) om te zetten in een geautomatiseerde Playwright test.

   ## Workflow / Stappenplan

   Als deze skill wordt geactiveerd, voer dan strikt de volgende stappen uit:

   1. **Analyseer de input:** Read het aangeleverde scenario en identificeer de belangrijkste acties (When) en de verwachte resultaten (Then).
   2. **Raadpleeg AGENTS.md:** Open het `AGENTS.md` bestand in de root van het project om de codeconventies (zoals locator-voorkeuren en bestandsextensies) op te halen.
   3. **Ontwerp de teststructuur:**
      - Bepaal de kebab-case bestandsnaam op basis van het scenario.
      - Bepaal welke `page.getByRole` locators waarschijnlijk nodig zijn voor de beschreven knoppen en velden.
   4. **Genereer de code:** Schrijf de Playwright test in TypeScript. Zorg voor web-first assertions (`expect(...).toBeVisible()`).
   5. **Review tegen richtlijnen:** Controleer je eigen code vóór oplevering:
      - Zijn er stiekem toch CSS-selectors gebruikt? Zo ja, vervang ze door Aria-rollen.
      - Is er een `test.describe` gebruikt?
   6. **Output opleveren:** Toon de gegenereerde code en geef aan in welke map en onder welke bestandsnaam de gebruiker dit moet opslaan (of sla het direct op als je schrijfrechten hebt).