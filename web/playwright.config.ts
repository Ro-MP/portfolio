import { defineConfig, devices } from '@playwright/test';

/** E2E sobre el build estático (dist/web/browser), igual que en producción. Corre `npm run build:staging` antes. */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI'] ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: 'http://localhost:4310', trace: 'retain-on-failure' },
  webServer: {
    command: 'python3 -m http.server 4310 --directory dist/web/browser',
    url: 'http://localhost:4310/en/',
    reuseExistingServer: !process.env['CI'],
    stdout: 'ignore',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
