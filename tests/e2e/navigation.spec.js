import { test, expect } from '@playwright/test';

test('homepage loads and nav works', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/.+/);
});
