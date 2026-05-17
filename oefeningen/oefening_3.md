Oefening 3: Van plan naar code
In deze oefening gaan we de stap zetten van het abstracte testplan uit de vorige opgave naar daadwerkelijk uitvoerbare code. Je leert hoe je de agent context meegeeft om slimmere tests te schrijven.

Stap 1: Specifieke tests genereren
We gaan nu de planner vragen om een specifiek deel van het plan uit te voeren.

1. Open de chat-interface en selecteer de agent: @playwright-test-planner.
2. Voer de volgende prompt in:

"Kijk naar het 'Input Fields Test Plan*'. Genereer de code voor de 'Naam-veld Testen' (1.1 tot en met 1.2) en sla deze op in een nieuw bestand tests/naam_velden.spec.ts."

* Gebruik als naam die van het bestand gegenereerd in oefening 2

3. Controleer of het bestand is aangemaakt in je tests folder.
4. Actie: Draai de nieuwe tests via de Playwright Sidebar.

Grote kans dat ze nu falen omdat de agent nog geen rekening hield met afhankelijkheden (zoals verplichte velden).

Stap 2: Context en afhankelijkheden toevoegen

1. Gooi het zojuist gemaakte bestand tests/naam_velden.spec.ts weg. We gaan het opnieuw doen, maar dan beter.
2. Gebruik in de chat met @playwright-test-planner de volgende uitgebreide prompt:

"Genereer opnieuw de Naam-veld Testen 1.1 t/m 1.2 in tests/naam_velden.spec.ts. Hou nu rekening met velden die verplicht zijn om in te vullen voordat het Naam-veld verwerkt kan worden. Let ook op dat er meerdere velden met dezelfde naam op de pagina kunnen staan; kies de juiste context."

3. Bekijk de nieuwe code. Zie je dat de agent nu extra fill acties heeft toegevoegd?

Stap 3: Debuggen met de Healer
Soms wordt een element pas zichtbaar na een actie, of staat het in een specifiek blok. We gebruiken de Healer om dit aan de agent uit te leggen.

1. Draai de test. Als deze faalt (bijv. omdat een element niet gevonden wordt), switch je naar de agent: @playwright-test-healer.
2. Voer de volgende prompt uit om de healer de juiste richting op te sturen:

"Fix de falende test. Hou er rekening mee dat een aangemaakt item pas terug te vinden is onder het blok 'Planning' of 'Historie'. Zoek daar naar de bevestiging."

3. De Healer zal de testcode aanpassen om eerst naar het juiste gedeelte van de pagina te kijken (scoping).
4. Klik op Keep om de verbeterde code te accepteren.

Stap 4: Check

1. Sla alles op.
2. Draai de tests in de naam_velden.spec.ts opnieuw.
3. Check: Zijn de tests nu groen? En zijn ze robuuster dan de eerste poging?