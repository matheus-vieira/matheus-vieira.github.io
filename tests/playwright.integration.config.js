import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './integration',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report-integration' }],
    ['json', { outputFile: 'test-results/playwright-integration-results.json' }],
    ['junit', { outputFile: 'test-results/playwright-integration-results.xml' }],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:4001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    timeout: 60000, // Longer timeout for integration tests
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        timeout: 120000, // Extra timeout for Mobile Safari in integration tests
        actionTimeout: 60000,
        navigationTimeout: 60000,
      },
    },
  ],

  webServer: {
    command: 'cd .. && python -m http.server 4001 --directory _site',
    url: 'http://localhost:4001',
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
});
