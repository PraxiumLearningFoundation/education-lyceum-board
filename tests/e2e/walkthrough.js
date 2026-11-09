// @ts-check
// A guided tour of the board for new members, shared by the desktop and phone demos.
// It narrates each step with an on-screen caption, so the recording explains itself
// without a voice-over: browse, search, open a gathering, explore it, keep a private
// note, and draft a suggestion to the shared record.
const { expect } = require('@playwright/test');

const RECORD = '2026-10-04-democracy';

// The suggestion form hands off to GitHub in a new tab, which a recording of this page
// cannot show. In the demo, window.open is caught and the caption says where it would
// have gone, so the tour never leaves the site and never opens a real issue.
async function prepare(page) {
  await page.addInitScript(() => {
    // Return a stand-in window: null reads as a blocked pop-up, and the page then
    // navigates this tab to GitHub instead.
    window.open = (url) => {
      window.__demoOpened = String(url);
      return {};
    };
  });
  // Belt and braces: nothing in a demo may reach GitHub.
  await page.route(/github\.com/, (route) => route.abort());
}

async function caption(page, text, hold = 2200) {
  await page.evaluate((t) => {
    let el = document.getElementById('demo-caption');
    if (!el) {
      el = document.createElement('div');
      el.id = 'demo-caption';
      el.setAttribute('aria-hidden', 'true');
      el.style.cssText = [
        'position:fixed', 'left:50%', 'top:16px', 'transform:translateX(-50%)',
        'z-index:99999', 'max-width:min(92vw,640px)', 'padding:10px 16px',
        'border-radius:12px', 'background:rgba(28,25,23,.88)', 'color:#fff',
        'font:500 15px/1.4 system-ui,sans-serif', 'text-align:center',
        'box-shadow:0 6px 24px rgba(0,0,0,.25)', 'pointer-events:none',
      ].join(';');
      document.body.appendChild(el);
    }
    el.textContent = t;
  }, text);
  await page.waitForTimeout(hold);
}

async function scrollBy(page, px, steps = 4) {
  for (let i = 0; i < steps; i += 1) {
    await page.mouse.wheel(0, px / steps);
    await page.waitForTimeout(350);
  }
}

async function tour(page, { phone = false } = {}) {
  await prepare(page);

  // 1. The board
  await page.goto('/');
  await expect(page.locator('#app a[href^="#/inquiry/"]')).toHaveCount(16);
  await caption(page, 'Welcome to the Lyceum. Every card is one gathering of the circle.');
  await scrollBy(page, phone ? 1400 : 900);
  await caption(page, 'Scroll to browse them all, newest first.');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(900);

  // 2. Search
  await caption(page, 'Search several words at once to find a topic.', 1600);
  const search = page.getByRole('searchbox');
  await search.click();
  await search.pressSequentially('voting news', { delay: 110 });
  await caption(page, 'Results narrow as you type.');
  await search.fill('');
  await search.pressSequentially('democracy', { delay: 110 });
  await page.waitForTimeout(700);

  // 3. Open a gathering
  await caption(page, 'Open a gathering to read what the circle worked through.', 1600);
  await page.locator(`#app a[href="#/inquiry/${RECORD}"]`).click();
  await expect(page.locator('#page-title')).toBeVisible();
  await caption(page, 'Each record starts with the question the circle chose.');

  // 4. Explore the Sequence of Inquiry
  const theories = page.locator('section', { hasText: 'Theories / Concepts' }).first();
  await theories.scrollIntoViewIfNeeded();
  await caption(page, 'The six sections follow the Sequence of Inquiry, from theories to a way ahead.');
  await scrollBy(page, phone ? 1600 : 900);
  await caption(page, 'Each point is short, plain and names nobody.');

  // 5. Follow a timestamp into the storyboard
  const stamp = theories.getByRole('link', { name: '@21:23' }).first();
  await stamp.scrollIntoViewIfNeeded();
  await caption(page, 'A timestamp shows when a point came up. Tap it to see that moment.', 1800);
  await stamp.click();
  await expect(page.locator('#beat-5')).toBeInViewport();
  await caption(page, 'The storyboard tells the evening in order, beat by beat.');
  await scrollBy(page, phone ? 1200 : 700);

  // 6. A private note
  const notes = page.locator('#comment-form');
  await notes.scrollIntoViewIfNeeded();
  await caption(page, 'Keep a private note. It stays in this browser and nobody else sees it.');
  await notes.locator('textarea[name="text"]').click();
  await notes.locator('textarea[name="text"]').pressSequentially(
    'Ask my own representative about early voting.', { delay: 45 });
  await notes.getByRole('button', { name: 'Save note' }).click();
  await expect(page.getByText('Ask my own representative about early voting.')).toBeVisible();
  await page.getByText('Ask my own representative about early voting.').scrollIntoViewIfNeeded();
  await caption(page, 'Saved. Your notes are here when you come back.');

  // 7. Suggest an addition or correction
  const suggest = page.locator('#suggest-form');
  await suggest.scrollIntoViewIfNeeded();
  await caption(page, 'To improve the shared record, use Add to this record.');
  await suggest.locator('select[name="section"]').selectOption({ index: 2 });
  await page.waitForTimeout(500);
  await suggest.locator('select[name="kind"]').selectOption({ index: 0 });
  await page.waitForTimeout(500);
  await suggest.locator('textarea[name="text"]').click();
  await suggest.locator('textarea[name="text"]').pressSequentially(
    'Local libraries also run voter registration drives.', { delay: 40 });
  await caption(page, 'Leave out names, including your own. Short and plain is best.');
  await suggest.getByRole('button', { name: 'Open this as a suggestion' }).click();
  const opened = await page.evaluate(() => window.__demoOpened || '');
  expect(opened).toContain('github.com');
  await caption(page, 'This opens a pre-filled suggestion on GitHub for the stewards to review.', 2600);
  await caption(page, 'That is the Lyceum: browse, search, explore, note, and help the record grow.', 3000);
}

module.exports = { tour };
