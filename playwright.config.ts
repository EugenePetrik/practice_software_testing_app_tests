import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from './config/baseConfig';
import path from 'path';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? '80%' : undefined,
  reporter: [
    ['list', { printSteps: true }],
    ['html', { open: 'on-failure' }],
  ],
  use: {
    baseURL: baseConfig.WEB_URL,
    trace: 'on',
    testIdAttribute: 'data-test',
    headless: !!process.env.CI,
  },
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.join(process.cwd(), '.auth', 'user.json'),
      },
      dependencies: ['setup'],
    },
  ],
});
