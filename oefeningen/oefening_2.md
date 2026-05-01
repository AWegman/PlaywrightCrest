Oefening 2: Strategisch testen met de playwright-test-planner
In deze oefening gebruik je de Test Planner agent om niet alleen code te genereren, maar eerst na te denken over wat er precies getest moet worden. 

Stap 1: De Planner aan het werk zetten
De Planner-agent is bedoeld om de structuur van je testsuite te bepalen voordat er ook maar één regel code wordt geschreven.

1. Open de chat-interface en switch naar de agent: @playwright-test-planner.

2. Voer de volgende prompt in:

"Open de website http://localhost:5173/. Kijk naar de invoervelden en plan testgevallen om deze invoervelden te testen. Leg deze testgevallen eerst aan mij voor voordat je er test cases van maakt."

3. De agent zal de pagina scannen en een lijst met scenario's voorstellen (bijvoorbeeld: validatie, succesvolle verzending, of foutieve invoer).

Stap 2: Beoordelen van het testplan

Bekijk de lijst met testgevallen die de agent voorstelt in de chat.
2. Stel jezelf de volgende vragen:

Worden alle kritieke velden meegenomen?
Worden er ook "negatieve" scenario's getest (bijv. een leeg formulier verzenden)?
Zijn de scenario's logisch? (Makes sense?)

Optioneel: Als je een scenario mist, kun je nu simpelweg typen: "Voeg ook een testgeval toe voor een te lang wachtwoord" of "Sla de postcode-check maar over".

Stap 3: Het plan archiveren

1. Geef de agent de opdracht om dit plan formeel op te slaan:

"Sla deze testgevallen op in de specs folder."

2. De agent zal nu een document (meestal een .md of een specifiek plan-bestand) aanmaken in je projectstructuur.

Stap 4: Controleer het resultaat
Open de verkenner (explorer) in VS Code.
2. Navigeer naar de map tests/ of specs/ (afhankelijk van je projectstructuur).
3. Open het aangemaakte plan-bestand.
4. Check: Komen de beschreven testgevallen overeen met wat jullie in de chat hebben afgesproken?