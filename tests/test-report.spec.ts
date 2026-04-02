import { test, expect } from '@playwright/test';

test.describe('Rapportage', () => {
    test('Rapportage toont resultaten', async ({ page }) => {
        let runId: number;
        
        const name = page.getByTestId('input-naam');
        const date = page.getByTestId('input-datum');
        const distance = page.getByTestId('input-afstand');
        const time = page.getByTestId('select-categorie');
        const checkboxPr = page.getByTestId('checkbox-pr');
        const buttonAdd = page.getByTestId('submit-btn');
        const buttonCancelEdit = page.getByTestId('cancel-edit-btn');
        const buttonConfirmDelete = page.getByTestId('bevestig-verwijder-btn')

        await test.step('Open website en controleer header', async () => {
            await page.goto('http://localhost:5173/');
            await expect(page.getByRole('heading', { name: '🏃 Mijn Hardloopkalender' })).toBeVisible();
        });

        await test.step('Voeg een nieuwe run toe', async () => {
            const responsePromise = page.waitForResponse(response => 
            response.url().includes('/api/wedstrijden') && response.request().method() === 'POST'
        );

            await name.fill('Test Run');
            await date.fill('2024-07-01');
            await distance.fill('5');
            await buttonAdd.click();

            const response = await responsePromise;
            const json = await response.json();
            runId = json.id;

            await expect(page.getByTestId(`wedstrijd-item-${runId}`)).toBeVisible();
            await expect(page.getByTestId(`naam-${runId}`)).toHaveText('Test Run');
        });

        await test.step('Verwijder de toegevoegde run', async () => {
            await page.getByTestId(`verwijder-btn-${runId}`).click();
            await page.getByTestId('bevestig-verwijder-btn').click();

            await expect(page.getByTestId(`wedstrijd-item-${runId}`)).toBeHidden();
        });
    });
});