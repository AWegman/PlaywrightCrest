import { test, expect } from '@playwright/test';

const wedstrijdenToSeed = [
  { naam: 'Marathon Rotterdam', datum: '2026-04-12', afstand_km: 42.2, tijd: '', categorie: 'weg', is_pr: false },
  { naam: 'Dam tot Damloop', datum: '2025-09-20', afstand_km: 16.1, tijd: '01:15:00', categorie: 'weg', is_pr: true },
  { naam: 'Veluwezoom Trail', datum: '2026-06-15', afstand_km: 21.1, tijd: '', categorie: 'trail', is_pr: false },
  { naam: 'Baanwedstrijd 5k', datum: '2025-05-10', afstand_km: 5.0, tijd: '00:19:45', categorie: 'baan', is_pr: true },
];

test.describe('Database Seeding via API', () => {
  test('Laad bulk data via backend API', async ({ request }) => {
    console.log(`Bezig met laden van ${wedstrijdenToSeed.length} wedstrijden via API...`);

    for (const w of wedstrijdenToSeed) {
      const response = await request.post('http://localhost:5000/api/wedstrijden', {
        data: {
          naam: w.naam,
          datum: w.datum,
          afstand_km: w.afstand_km,
          tijd: w.tijd,
          categorie: w.categorie,
          is_pr: w.is_pr,
        },
      });

      expect(response.ok()).toBeTruthy();
      const json = await response.json();
      console.log(`Toegevoegd: ${w.naam} met ID: ${json.id}`);
      expect(json.id).toBeGreaterThan(0);
    }

    // Verify alle data is geladen
    const listResponse = await request.get('http://localhost:5000/api/wedstrijden');
    expect(listResponse.ok()).toBeTruthy();
    const allData = await listResponse.json();
    console.log(`Totaal aantal wedstrijden in DB: ${allData.length}`);
    expect(allData.length).toBeGreaterThanOrEqual(wedstrijdenToSeed.length);
  });
});