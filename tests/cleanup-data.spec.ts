import { test, expect } from '@playwright/test';

test.describe('Test data cleanup via API', () => {
  test('Leeg test data', async ({ request }) => {
    console.log('Opschonen van oude testdata via API...');
    
    // Get all wedstrijden
    const listResponse = await request.get('http://localhost:5000/api/wedstrijden');
    expect(listResponse.ok()).toBeTruthy();
    
    const wedstrijden = await listResponse.json();
    console.log(`Gevonden: ${wedstrijden.length} wedstrijden om te verwijderen`);
    
    // Delete each one
    for (const w of wedstrijden) {
      const deleteResponse = await request.delete(`http://localhost:5000/api/wedstrijden/${w.id}`);
      expect(deleteResponse.ok()).toBeTruthy();
      console.log(`Verwijderd: ${w.naam} (ID: ${w.id})`);
    }

    // Verify all data is gone
    const verifyResponse = await request.get('http://localhost:5000/api/wedstrijden');
    expect(verifyResponse.ok()).toBeTruthy();
    const remaining = await verifyResponse.json();
    
    console.log(`Aantal wedstrijden in DB na opschonen: ${remaining.length}`);
    expect(remaining.length).toBe(0);
  });
});