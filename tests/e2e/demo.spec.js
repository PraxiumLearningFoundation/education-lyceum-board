// @ts-check
// Demo recordings, not assertions of record. Run with "npm run test:e2e:demo";
// the videos land in test-results/ and are never committed.
const { test, expect } = require('@playwright/test');

test('browse, search, open the democracy record and follow a timestamp', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#app a[href^="#/inquiry/"]')).toHaveCount(16);
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(800);
  await page.mouse.wheel(0, -600);
  await page.getByRole('searchbox').pressSequentially('democracy', { delay: 120 });
  await page.waitForTimeout(800);
  await page.locator('#app a[href="#/inquiry/2026-10-04-democracy"]').click();
  await page.waitForTimeout(1200);
  const stamp = page.locator('section', { hasText: 'Theories / Concepts' })
    .getByRole('link', { name: '@21:23' }).first();
  await stamp.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await stamp.click();
  await expect(page.locator('#beat-5')).toBeInViewport();
  await page.waitForTimeout(2000);
});
