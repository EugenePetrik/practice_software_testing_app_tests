import { baseConfig } from '../../config/baseConfig';
import { test, expect } from '../fixtures';

test('Verify login as a user with valid credentials', async ({ app, page }) => {
  await test.step('Open Login page', async () => {
    await app.login.open();
  });

  await test.step('Fill in login form', async () => {
    await app.login.loginAs(baseConfig.USER_EMAIL, baseConfig.USER_PASSWORD);
  });

  await test.step('Verify successful login', async () => {
    await expect(page).toHaveURL(/\/account$/);

    await expect(app.account.pageTitle).toHaveText('My account');
    await expect(app.account.header.navMenuDropdown).toHaveText(baseConfig.USER_NAME);
  });
});

test('Verify login as an admin with valid credentials', async ({ app, page }) => {
  await test.step('Open Login page', async () => {
    await app.login.open();
  });

  await test.step('Fill in login form', async () => {
    await app.login.loginAs(baseConfig.ADMIN_EMAIL, baseConfig.ADMIN_PASSWORD);
  });

  await test.step('Verify successful login', async () => {
    await expect(page).toHaveURL(/\/admin\/dashboard$/);

    await expect(app.dashboard.pageTitle).toHaveText('Sales over the years');
    await expect(app.dashboard.header.navMenuDropdown).toHaveText(baseConfig.ADMIN_NAME);
  });
});
