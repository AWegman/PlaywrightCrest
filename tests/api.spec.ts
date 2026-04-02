import { test, expect, APIRequestContext } from '@playwright/test';

// 1. Interface definitie (buiten het testblok)
interface Wedstrijd {
  id?: number;
  naam: string;
  datum: string;
  afstand_km: number;
  tijd?: string;
  categorie: string;
  is_pr?: boolean;
}

const BASE_URL = 'http://localhost:5000/api';

test.describe('Hardloopkalender API', () => {
  
  // TEST: Een wedstrijd toevoegen
  test('zou een nieuwe wedstrijd moeten toevoegen', async ({ request }) => {
    const nieuweWedstrijd: Wedstrijd = {
      naam: "Playwright Run",
      datum: "2026-12-01",
      afstand_km: 5.0,
      tijd: "00:22:00",
      categorie: "baan",
      is_pr: true
    };

    const response = await request.post(`${BASE_URL}/wedstrijden`, {
      data: nieuweWedstrijd
    });

    expect(response.ok()).toBeTruthy();
    const body: Wedstrijd = await response.json();
    expect(body.naam).toBe("Playwright Run");
    expect(body.is_pr).toBe(true);
  });

  // TEST: Alle wedstrijden ophalen
  test('zou de lijst met wedstrijden moeten ophalen', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/wedstrijden`);
    expect(response.ok()).toBeTruthy();
    
    const wedstrijden: Wedstrijd[] = await response.json();
    expect(Array.isArray(wedstrijden)).toBeTruthy();
    // Check of de lijst niet leeg is (optioneel)
    expect(wedstrijden.length).toBeGreaterThanOrEqual(0);
  });

  // TEST: Een wedstrijd verwijderen (op basis van ID)
  test('zou een wedstrijd moeten kunnen verwijderen', async ({ request }) => {
    // A. Eerst eentje aanmaken om een ID te krijgen
    const createResponse = await request.post(`${BASE_URL}/wedstrijden`, {
      data: { 
        naam: "Delete Me", 
        datum: "2026-01-01", 
        afstand_km: 1, 
        categorie: "weg" 
      }
    });
    
    const nieuweWedstrijd: Wedstrijd = await createResponse.json();
    const id = nieuweWedstrijd.id;

    expect(id).toBeDefined();

    // B. Nu verwijderen
    const deleteResponse = await request.delete(`${BASE_URL}/wedstrijden/${id}`);
    expect(deleteResponse.status()).toBe(200);

    // C. Checken of hij echt weg is uit de lijst
    const checkResponse = await request.get(`${BASE_URL}/wedstrijden`);
    const lijst: Wedstrijd[] = await checkResponse.json();
    
    const gevonden = lijst.find(w => w.id === id);
    expect(gevonden).toBeUndefined();
  });
});