Oefening 4.2: Gebruik van AGENTS.md
In deze oefening gaan we testen of de playwright-test-generator agent slim genoeg is om onze nieuwe richtlijnen uit AGENTS.md te volgen zonder dat we die expliciet in de prompt noemen.

Stap 1: De AGENTS.md activeren
1. Zorg dat het bestand AGENTS.md (uit de vorige stap) in de hoofdmap van je project staat.
2. Open de chat-interface. De Agent laadt bij het starten van een nieuw gesprek automatisch de context van dit bestand.

Stap 2: Een test genereren met een algemene prompt
We gaan de Agent nu een opdracht geven die op meerdere manieren uitgevoerd kan worden. We kijken of hij de keuzes maakt die in onze AGENTS.md staan (zoals het gebruik van specifieke locators en bestandstypes).

1. Selecteer de agent @playwright-test-generator.
2. Voer de volgende prompt in:

"Maak een test voor de homepage (http://localhost:5173/) die controleert of de toevoegen knop zichtbaar is. Sla dit op in de juiste map."

Stap 3: De controle
Open het nieuw gegenereerde bestand en controleer de volgende punten op basis van onze AGENTS.md:

- Bestandsnaam	Is de naam in kebab-case (bijv. homepage-check.spec.ts)?
- Locators	Gebruikt de agent getByRole('button', ...) in plaats van een CSS selector?
- Bestandstype	Eindigt het bestand op .spec.ts?
- Assertions	Wordt er gebruik gemaakt van een web-first assertion zoals toBeVisible()?


Je ziet dat je prompts veel korter kunnen worden. Je hoeft niet meer te zeggen: "Gebruik TypeScript, hanteer kebab-case en gebruik role-based locators". De Agent weet dit nu door het AGENTS.md bestand. Dit bespaart tijd en zorgt voor een uniforme testsuite binnen het hele team.