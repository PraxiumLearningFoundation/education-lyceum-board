// @ts-check
// Guided walkthrough for new members, on a 390px phone. Run with "npm run demos".
const { test } = require('@playwright/test');
const { tour } = require('./walkthrough');

test.use({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  video: { mode: 'on', size: { width: 390, height: 844 } },
});

test('walkthrough: browse, search, explore, note and suggest (phone)', async ({ page }) => {
  test.setTimeout(180000);
  await tour(page, { phone: true });
});
