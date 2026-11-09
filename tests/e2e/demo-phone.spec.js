// @ts-check
// Demo recording on a phone viewport. Run with "npm run test:e2e:demo".
const { test, expect } = require('@playwright/test');

test.use({
  viewport: { width: 360, height: 740 },
  isMobile: true,
  hasTouch: true,
  video: { mode: 'on', size: { width: 360, height: 740 } },
});

test('the kids-attention record on a phone', async ({ page }) => {
  await page.goto('/#/inquiry/2026-11-01-kids-attention');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.waitForTimeout(1000);
  for (let i = 0; i < 8; i++) { await page.mouse.wheel(0, 500); await page.waitForTimeout(500); }
  const full = page.getByRole('link', { name: 'Read it in full' });
  await full.scrollIntoViewIfNeeded();
  await full.click();
  await page.waitForTimeout(1500);
  for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 500); await page.waitForTimeout(500); }
});
