import { test, expect } from '@playwright/test';

test('has heading', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page.getByRole('heading', { name: '🏃 Mijn Hardloopkalender' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '🗓️ Planning (2)' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '✅ Historie (2)' })).toBeVisible();
});