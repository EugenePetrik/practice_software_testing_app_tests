import { test as base, expect } from '@playwright/test';
import { AppManager } from '../pages/app.manager';

interface AppFixtures {
  app: AppManager;
}

const test = base.extend<AppFixtures>({
  app: async ({ page }, use) => {
    const app = new AppManager(page);
    await use(app);
  },
});

export { test, expect };
