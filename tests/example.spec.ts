import { test, expect } from '@playwright/test';

test('has heading', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page.getByRole('heading', { name: '🏃 Mijn Hardloopkalender' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '🗓️ Planning (2)' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '✅ Historie (2)' })).toBeVisible();
});

test('add new run', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const name = page.getByTestId('input-naam');
  const date = page.getByTestId('input-datum');
  const distance = page.getByTestId('input-afstand');
  const time = page.getByTestId('select-categorie');
  const checkboxPr = page.getByTestId('checkbox-pr');
  const buttonAdd = page.getByTestId('submit-btn');
  const buttonCancelEdit = page.getByTestId('cancel-edit-btn');
  const buttonConfirmDelete = page.getByTestId('bevestig-verwijder-btn')

  // Listener
  const responsePromise = page.waitForResponse(response => 
    response.url().includes('/api/wedstrijden') && response.request().method() === 'POST'
  );

  await name.fill('Test Run');
  await date.fill('2024-07-01');
  await distance.fill('5');
  await buttonAdd.click();

  const response = await responsePromise;
  const json = await response.json();
  const runId = json.id;

  // Wait for the new item to appear with the new runId
  await expect(page.getByTestId(`wedstrijd-item-${runId}`)).toBeVisible();
  await expect(page.getByTestId(`wedstrijd-item-${runId}`).getByText('Test Run')).toBeVisible();

  const buttonRemove = page.getByTestId(`verwijder-btn-${runId}`);

  await buttonRemove.click();
  await buttonConfirmDelete.click();

  await expect(page.getByTestId(`wedstrijd-item-${runId}`)).not.toBeVisible();
});
