Oefening 5.2: Gebruik van de Skill
Nu gaan we testen of de Agent begrijpt dat hij deze specifieke workflow moet starten zodra we hem een testscenario voorschotelen.

Stap 1: De Skill aanroepen
1. Open een nieuwe chat met de agent @playwright-test-generator
2. Geef de Agent de volgende prompt:

"Zet dit scenario om in een test:
Scenario: Succesvol een nieuw hardloopevenement toevoegen aan de planning
  Given de gebruiker heeft de website geopend
  When de gebruiker als naam invult "OrangeCrest Fun Run"
  And een datum in de toekomst invult in het formaat "dd-mm-yyyy"
  And als afstand "5 km" invult
  And op de knop toevoegen klikt
  Then is de "OrangeCrest Fun Run" opgenomen in de planning

Stap 2. Controleer




