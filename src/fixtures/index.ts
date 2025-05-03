import { test as base, expect } from '@playwright/test';
import { AppManager } from '../pages/app.manager';
import { baseConfig } from '../../config/baseConfig';

interface AppFixtures {
  app: AppManager;
  loggedApp: AppManager;
}

const test = base.extend<AppFixtures>({
  app: async ({ page }, use) => {
    const app = new AppManager(page);
    await use(app);
  },
  loggedApp: async ({ app, request, page }, use) => {
    const response = await request.post(`${baseConfig.API_URL}/users/login`, {
      data: {
        email: baseConfig.USER_EMAIL,
        password: baseConfig.USER_PASSWORD,
      },
    });

    expect(response.ok()).toBeTruthy();

    const json = await response.json() as { access_token: string };
    const token = json.access_token;

    await page.goto('/', { waitUntil: 'commit' });
    await page.evaluate(_token => window.localStorage.setItem('auth-token', _token), token);

    await use(app);
  },
});

export { test, expect };
