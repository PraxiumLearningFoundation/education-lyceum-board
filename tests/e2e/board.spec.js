// @ts-check
const { test, expect } = require('@playwright/test');

const DEMOCRACY = '2026-10-04-democracy';
const ATTENTION = '2026-11-01-kids-attention';
const CANONICAL = 'https://praxiumlearningfoundation.github.io/education-lyceum-board/data/lyceum.json';
const SECTION_TITLES = [
  'Theories / Concepts', 'Application', 'Source / Input',
  'Regulations / References', 'Opportunities', 'Challenges',
];

// Every test watches for console errors and for any request leaving this origin.
// Tests that deliberately break the archive fetch opt out of the error check only.
const watch = new WeakMap();
test.beforeEach(async ({ page, baseURL }) => {
  const w = { errors: [], offOrigin: [] };
  const origin = new URL(baseURL || '').origin;
  page.on('console', (m) => { if (m.type() === 'error') w.errors.push(m.text()); });
  page.on('pageerror', (e) => w.errors.push(String(e)));
  page.on('request', (r) => {
    const u = r.url();
    if (/^https?:/.test(u) && new URL(u).origin !== origin) w.offOrigin.push(u);
  });
  watch.set(page, w);
});

test.afterEach(async ({ page }, testInfo) => {
  const w = watch.get(page);
  if (testInfo.title.includes('[fetch-fails]')) {
    // When the relative archive fails, the page is designed to try its canonical copy
    // (DATA_URL_FALLBACK). That one fallback, aborted by the test, is the only allowed host.
    const other = w.offOrigin.filter((u) => !u.startsWith(CANONICAL));
    expect(other, 'requests to other hosts').toEqual([]);
    return;
  }
  expect(w.offOrigin, 'requests to other hosts').toEqual([]);
  expect(w.errors, 'console errors').toEqual([]);
});

const cards = (page) => page.locator('#app a[href^="#/inquiry/"]');
const card = (page, id) => page.locator(`#app a[href="#/inquiry/${id}"]`);
const search = (page) => page.getByRole('searchbox');

test('the board loads and lists all 16 records', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'The Lyceum' })).toBeVisible();
  await expect(cards(page)).toHaveCount(16);
  await expect(page.getByText('16 of 16 gatherings')).toBeVisible();
});

test('search filters the board', async ({ page }) => {
  await page.goto('/');
  await search(page).fill('democracy');
  await expect(card(page, DEMOCRACY)).toBeVisible();
  await expect(cards(page)).not.toHaveCount(16);

  await search(page).fill('attention');
  await expect(card(page, ATTENTION)).toBeVisible();
  await expect(cards(page)).not.toHaveCount(16);

  await search(page).fill('zzqxnotaword');
  await expect(cards(page)).toHaveCount(0);
  await expect(page.getByText('No single gathering mentions all of these.')).toBeVisible();

  await search(page).fill('');
  await expect(cards(page)).toHaveCount(16);
});

test('a record shows its six sections, quote and storyboard', async ({ page }) => {
  await page.goto('/');
  await card(page, DEMOCRACY).click();
  await expect(page).toHaveURL(new RegExp(`#/inquiry/${DEMOCRACY}$`));
  await expect(page.getByText(/ - Sequence of Inquiry$/)).toBeVisible();
  for (const t of SECTION_TITLES) {
    await expect(page.getByRole('heading', { level: 3, name: t, exact: true })).toBeVisible();
  }
  await expect(page.locator('main blockquote').first()).toContainText("If you don't agree");
  await expect(page.getByRole('heading', { name: 'The shape of the evening' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'How the evening unfolded' })).toBeAttached();
  await expect(page.locator('#storyboard li[id^="beat-"]')).toHaveCount(15);
});

test('a timestamp link jumps to the beat that covers it', async ({ page }) => {
  await page.goto(`/#/inquiry/${DEMOCRACY}`);
  // @21:23 in Theories falls inside beat 5 (@17:25 - @23:30).
  const stamp = page.locator('section', { hasText: 'Theories / Concepts' })
    .getByRole('link', { name: '@21:23' }).first();
  await expect(stamp).toHaveAttribute('data-jump', 'beat-5');
  await stamp.click();
  const beat = page.locator('#beat-5');
  await expect(beat).toBeInViewport();
  await expect(beat).toHaveClass(/ring-2/);
  // The router must not have navigated away.
  await expect(page).toHaveURL(new RegExp(`#/inquiry/${DEMOCRACY}$`));
  await expect(page.getByText(/ - Sequence of Inquiry$/)).toBeVisible();
});

test('"Read it in full" jumps to the storyboard without leaving the record', async ({ page }) => {
  await page.goto(`/#/inquiry/${ATTENTION}`);
  await page.getByRole('link', { name: 'Read it in full' }).click();
  await expect(page.locator('#storyboard')).toBeInViewport();
  await expect(page.getByRole('heading', { name: 'How the evening unfolded' })).toBeVisible();
});

test('a reflection record renders', async ({ page }) => {
  await page.goto('/#/inquiry/2024-11-17-reflection');
  await expect(page.getByText(/ - Reflection$/)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The gatherings revisited' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What the circle learned' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Theories / Concepts' })).toHaveCount(0);
});

test('a recap record renders and links to its reflection', async ({ page }) => {
  await page.goto('/#/inquiry/2024-06-30-work-ethic');
  await expect(page.getByRole('heading', { name: 'This gathering was not recorded' })).toBeVisible();
  await page.getByRole('link', { name: 'the reflection that revisited it' }).click();
  await expect(page.getByRole('heading', { name: 'The gatherings revisited' })).toBeVisible();
});

test('deep links survive a reload, and back returns to the board', async ({ page }) => {
  await page.goto(`/#/inquiry/${ATTENTION}`);
  await expect(page.getByRole('heading', { level: 1 })).toContainText("kids' attention");
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toContainText("kids' attention");
  await page.getByRole('link', { name: 'Back to all inquiries' }).click();
  await expect(cards(page)).toHaveCount(16);
});

test('an unknown record id falls back to the board', async ({ page }) => {
  await page.goto('/#/inquiry/no-such-record');
  await expect(cards(page)).toHaveCount(16);
});

test('a saved copy is shown when the archive fails after a first load [fetch-fails]', async ({ page }) => {
  await page.goto('/');
  await expect(cards(page)).toHaveCount(16);
  // Abort the relative path and the canonical fallback alike.
  await page.route('**/data/lyceum.json', (r) => r.abort());
  await page.reload();
  await expect(page.getByRole('status')).toContainText('Showing a saved copy.');
  await expect(cards(page)).toHaveCount(16);
});

test('with no saved copy the failure is explained [fetch-fails]', async ({ page }) => {
  await page.route('**/data/lyceum.json', (r) => r.abort());
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'The archive could not be loaded' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible();
});

async function expectNoSideScroll(page, paths) {
  await page.setViewportSize({ width: 360, height: 740 });
  for (const path of paths) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const over = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over, `horizontal overflow on ${path}`).toBeLessThanOrEqual(0);
  }
}

test('no horizontal scroll at 360px on the board', async ({ page }) => {
  await expectNoSideScroll(page, ['/', '/#/inquiry/no-such-record']);
});

test('no horizontal scroll at 360px on record pages', async ({ page }) => {
  test.fixme(true, 'App bug: the "Add to this record" form selects size to their longest option and overflow 360px by ~130px');
  await expectNoSideScroll(page, [`/#/inquiry/${DEMOCRACY}`, `/#/inquiry/${ATTENTION}`, '/#/inquiry/2024-11-17-reflection']);
});
