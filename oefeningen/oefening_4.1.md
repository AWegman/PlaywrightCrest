### Oefening 4.1 Aanmaken van AGENTS.MD 
Het telkens opnieuw moeten meegeven van dezelfde instructies in een prompt is tijdrovend en foutgevoelig. Om dit op te lossen, maken we gebruik van Agent Skills. Hiermee leggen we vooraf onze werkinstructies vast, zodat de Agents deze automatisch oppikken zodra we ze een opdracht geven.

Wat is een Skill?
Een Skill is een herbruikbare set instructies die een Agent leert hoe hij een specifieke taak moet uitvoeren. Technisch gezien is het een mapje in je project dat een SKILL.md bestand bevat. In dit bestand staat metadata (naam en beschrijving) en de stapsgewijze instructies zelf.

Naast specifieke Skills voor vaste taken, is er ook algemene projectkennis die een Agent eigenlijk altijd nodig heeft. Denk aan de mappenstructuur van je project, de best practices die jullie hanteren, of simpelweg hoe je de applicatie en de tests lokaal opstart.

Hiervoor gebruiken we AGENTS.md bestanden.

Projectbrede context met AGENTS.md
Een AGENTS.md bestand fungeert als het "handboek" voor de AI binnen jouw repository. Je kunt deze bestanden bovendien nesten. Hierdoor weet de Agent precies wanneer hij instructies uit een specifiek bestand moet laden op basis van de map waarin hij aan het werk is.

Waarom is dit handig?
- Relevante context: Als de Agent een test schrijft in de map e2e-tests/, leest hij automatisch het AGENTS.md bestand uit die specifieke map. Hij wordt dan niet lastiggevallen met regels over de backend-database die op dat moment niet relevant zijn.

- Geen herhaling: Je hoeft niet in elke prompt uit te leggen hoe de mappenstructuur werkt of dat je npm gebruikt in plaats van yarn. De Agent "weet" dit simpelweg zodra hij in het project landt.

- Standaardisatie: Iedere collega die met de Agent werkt, krijgt dezelfde kwaliteit output omdat de Agent altijd dezelfde richtlijnen uit de Markdown-bestanden volgt.

Skills zijn voor wat de agent moet doen (de actie), en AGENTS.md is voor waarmee de agent rekening moet houden (de context)

Deze bestanden zijn niet bedoeld om statisch te zijn; zie ze als een levend document. Het is de bedoeling dat je ze continu bijwerkt op basis van het gedrag en de resultaten van je Agent.

Wat zet ik in mijn AGENTS.md?
Om de Agent effectief te sturen, focus ik me op de volgende zaken:

- Test scope en overzicht: Wat testen we hier precies en waarom?

- Code-organisatie en structuur: Waar staan de bestanden en hoe zijn ze opgebouwd?

- Testconventies en best practices: Welke naamgeving hanteren we en welke standaarden volgen we?

- Veelvoorkomende patronen: Hoe gaan we om met wachten (waiting), het opzetten van de test-state en het gebruik van locators?

Het doel is om de Agent genoeg context te geven om autonoom te kunnen werken, zonder hem te verdrinken in een zee van instructies.

### Oefening 4 Een AGENTS.md aanmaken

Maak in de root van het project een nieuwe bestand aan: AGENTS.md 
In dit bestand, plaats daarin het volgende:

  # AGENTS.md - Playwright E2E Test Richtlijnen

  Dit document dient als handleiding voor AI-agents die werken aan dit testproject. Volg deze standaarden strikt voor consistente en robuuste tests.

  ## Project Context & Tech Stack
  - **Framework:** Playwright met TypeScript.
  - **Base URL:** http://localhost:5173/ (tenzij anders vermeld).
  - **Test Map:** Alle tests bevinden zich in de map `tests/` of `specs/`.

  ## Code Organisatie & Structuur
  - **Bestandstypes:** Gebruik altijd `.spec.ts` voor testbestanden.
  - **Naamgeving:** Gebruik kebab-case (bijv. `gebruikers-beheer.spec.ts`).
  - **Groepering:** Gebruik `test.describe` om gerelateerde scenario's te groeperen.

  ## Testing Conventies (Best Practices)
  - **Locators:** Geef de voorkeur aan door de gebruiker zichtbare locators (Aria-rollen):
    - `page.getByRole('button', { name: 'Verzenden' })`
    - `page.getByText('Welkom')`
    - `page.getByLabel()`
    - `page.getByPlaceholder()`
    - `page.getByAltText()`
    - `page.getByTitle()`
    - Vermijd CSS-selectors zoals `.btn-primary` of lange XPath-paden. 
    - Gebruik Test ID's als laatste redmiddel. Wanneer een element geen unieke tekst of heeft, gebruik dan een specifiek test-attribuut. Gebruik de data-testid `page.getByTestId(()`
  - **Scoping:** Als elementen in specifieke blokken staan (zoals "Planning" of "Historie"), gebruik dan `page.locator('...').getByRole(...)` om binnen dat blok te zoeken.
  - **Validatie:** Gebruik altijd web-first assertions zoals `expect(locator).toBeVisible()`.

  ## Veelvoorkomende Patronen
  - **State Setup:** Maak gebruik van `test.beforeEach` om naar de juiste URL te navigeren of om verplichte velden in te vullen.
  - **Wachten:** Vertrouw op de automatische wachttijden van Playwright. Gebruik géén harde `page.waitForTimeout()`.
  - **Verplichte velden:** Houd er rekening mee dat sommige velden eerst ingevuld moeten worden voordat andere interacties mogelijk zijn.

  ## Rapportage
  - Zorg dat elke test een heldere omschrijving heeft (bijv. `test('moet een nieuwe wedstrijd aanmaken', async ({ page }) => { ... })`).
