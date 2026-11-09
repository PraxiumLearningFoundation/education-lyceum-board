// End-to-end tests for the Lyceum board. The board is a zero-build static site, so
// the test server is the same one the README suggests for previewing it.
const { defineConfig, devices } = require('@playwright/test');

const PORT = Number(process.env.E2E_PORT) || 8765;

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `python3 -m http.server ${PORT} --bind 127.0.0.1`,
    url: `http://127.0.0.1:${PORT}/index.html`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium-desktop',
      testIgnore: /demo.*\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-360',
      testIgnore: /demo.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 360, height: 740 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
      },
    },
    {
      // Demo recordings only; run with "npm run test:e2e:demo".
      name: 'demo',
      testMatch: /demo.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        video: { mode: 'on', size: { width: 1280, height: 800 } },
        launchOptions: { slowMo: 400 },
      },
    },
  ],
});
