import { test, expect } from '@playwright/test';

test('Toont melding wanneer er geen wedstrijden zijn (via mocking)', async ({ page }) => {
  // 1. Onderschep het GET verzoek naar de API
  await page.route('**/api/wedstrijden', async (route) => {
    // Geef een lege lijst terug als antwoord
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]), 
    });
  });

  // 2. Ga naar de pagina
  await page.goto('http://localhost:5173/');

  // 3. Controleer of de planning en historie leeg zijn
  await expect(page.getByRole('heading', { name: '🗓️ Planning (0)' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '✅ Historie (0)' })).toBeVisible();
});

test('Zoekbalk filtert gemonteerde data', async ({ page }) => {
  await page.route('**/api/wedstrijden', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify([
        { id: 100, naam: 'Mock Marathon', datum: '2026-10-10', afstand_km: 42.2, categorie: 'weg' },
        { id: 101, naam: 'Test Trail', datum: '2026-11-11', afstand_km: 15, categorie: 'trail' }
      ]),
    });
  });

  await page.goto('http://localhost:5173');

  // Typ in de zoekbalk
  await page.getByTestId('zoekbalk').fill('Mock');

  // Controleer of alleen de Mock Marathon zichtbaar is
  await expect(page.getByText('Mock Marathon')).toBeVisible();
  await expect(page.getByText('Test Trail')).toBeHidden();
});

test('Controleer of het formulier de juiste data verstuurt', async ({ page }) => {
    let interceptedData: any;

    // 1. Onderschep het POST-verzoek
    await page.route('**/api/wedstrijden', async (route) => {
        if (route.request().method() === 'POST') {
            interceptedData = route.request().postDataJSON();
            await route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify({ id: 999, ...interceptedData }),
            });
        } else {
            await route.continue();
        }
    });
    
    // 2. Naar de app
    await page.goto('http://localhost:5173');

    // 3. Vul het formulier in
    await page.getByTestId('input-naam').fill('Interception Run');
    await page.getByTestId('input-datum').fill('2026-05-05');
    await page.getByTestId('input-afstand').fill('21.1');
    await page.getByTestId('select-categorie').selectOption('weg');
    await page.getByTestId('checkbox-pr').check();

    // 4. Klik op toevoegen
    await page.getByTestId('submit-btn').click();

    // 5. Asserties
    expect(interceptedData).toBeDefined();
    expect(interceptedData.naam).toBe('Interception Run');
    expect(interceptedData.afstand_km).toBe('21.1');
    expect(interceptedData.is_pr).toBe(true);

    console.log('Succes: De frontend stuurde de juiste JSON naar de server!');
});