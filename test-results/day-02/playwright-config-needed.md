# Playwright Configuration Needed

**For Engineer:** The test suite I wrote (`tests/web/dashboard.spec.ts`) needs a `playwright.config.ts` file in the repo root.

## Suggested configuration

Create `playwright.config.ts` with these settings:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/web',
  timeout: 30 * 1000,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Serial execution to avoid Etsy API rate limits
  
  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-results/playwright-report' }]
  ],
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

## Why this matters

- Sets base URL so tests can use relative paths
- Configures timeouts to match NFR-1 (2-second API calls)
- Captures screenshots on failure (evidence for test reports)
- Runs tests serially to avoid hitting Etsy API rate limits

## How to run tests (once app is built)

```bash
cd ~/order-inventory-dashboard-for-etsy-multi-listers
PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-browsers npx playwright test --reporter=list
```

The `PLAYWRIGHT_BROWSERS_PATH` prefix is critical on the server — without it, Playwright looks in the wrong directory and fails with "Executable doesn't exist."
