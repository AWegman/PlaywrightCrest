### Oefening 5.2: Gebruik van de Skill
Nu gaan we testen of de Agent begrijpt dat hij deze specifieke workflow moet starten zodra we hem een testscenario voorschotelen.

## Stap 1: De Skill aanroepen

- Open een nieuwe chat met de agent @playwright-test-generator
- Geef de Agent de volgende prompt:

  "Zet dit scenario om in een test:
  Scenario: Succesvol een nieuw hardloopevenement toevoegen aan de planning
    Given de gebruiker heeft de website geopend
    When de gebruiker als naam invult "OrangeCrest Fun Run"
    And een datum in de toekomst invult in het formaat "dd-mm-yyyy"
    And als afstand "5 km" invult
    And op de knop toevoegen klikt
    Then is de "OrangeCrest Fun Run" opgenomen in de planning

### Stap 2. Controleer

Zoek het zojuist aangemaakte test bestand op en controleer deze op de volgende punten:

- Heeft de Agent de 'When' en 'Then' stappen correct vertaald?
- Heeft hij expliciet vermeld dat hij AGENTS.md heeft geraadpleegd voor de standaarden?
- Check: Zijn er getByRole locators gebruikt? (De Skill verbiedt het gebruik van zwakke CSS-selectors zoals #id of .class tenzij strikt noodzakelijk).
- Bevat de output een test.describe blok?
- Zijn de web-first assertions correct (expect(...).toBeVisible())?
- Heeft de Agent een kebab-case bestandsnaam voorgesteld (bijv. add-running-event.spec.ts)?

Stel, de agent heeft nu exact volgend de stappen in ons SKILL.md bestand gehandeld de corrigeren we hem direct op basis van de skill.

- Open de agent en voer de volgende prompt in:

  Je hebt de Gherkin-naar-Playwright skill niet volledig gevolgd. Stap 5 (de Review tegen de richtlijnen) ontbreekt of is onvoldoende uitgevoerd. Pas de code aan zodat deze strikt voldoet aan de getByRole prioriteit zoals gedefinieerd in ons AGENTS.md bestand en de Skill.

  Is het nu beter?




