// @ts-check
// Guided walkthrough for new members, desktop. Run with "npm run demos".
const { test } = require('@playwright/test');
const { tour } = require('./walkthrough');

test('walkthrough: browse, search, explore, note and suggest (desktop)', async ({ page }) => {
  test.setTimeout(180000);
  await tour(page);
});
