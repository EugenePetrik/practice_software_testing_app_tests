import { test as base, expect } from '@playwright/test';
import { AppManager } from '../pages/app.manager';
import { baseConfig } from '../../config/baseConfig';

interface IUser {
  first_name: string;
  last_name: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  },
  phone: string;
  dob: string;
  password: string;
  email: string;
}

interface AppFixtures {
  app: AppManager;
  loggedApp: AppManager;
  loggedNewUserApp: {
    app: AppManager;
    newUser: IUser;
  };
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
  loggedNewUserApp: async ({ app, request, page }, use) => {
    const newUser = {
      first_name: 'John1',
      last_name: 'Doe1',
      address: {
        street: 'Street 1',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        postal_code: '1234AA'
      },
      phone: '0987654321',
      dob: '1970-01-01',
      password: 'SuperSecure@123',
      email: `test_${Date.now().toString()}@example.com`,
    };

    const createUserResponse = await request.post(`${baseConfig.API_URL}/users/register`, {
      data: newUser,
    });

    expect(createUserResponse.ok()).toBeTruthy();

    const loginUserResponse = await request.post(`${baseConfig.API_URL}/users/login`, {
      data: {
        email: newUser.email,
        password: newUser.password,
      },
    });

    expect(loginUserResponse.ok()).toBeTruthy();

    const json = await loginUserResponse.json() as { access_token: string };
    const token = json.access_token;

    await page.goto('/', { waitUntil: 'commit' });
    await page.evaluate(_token => window.localStorage.setItem('auth-token', _token), token);

    await use({ app, newUser });
  },
});

export { test, expect };
