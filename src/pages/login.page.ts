import { Locator } from '@playwright/test';
import { baseConfig } from '../../config/baseConfig';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  public readonly pagePath: string = '/auth/login';

  readonly emailInput: Locator = this.page.getByTestId('email');
  readonly passwordInput: Locator = this.page.getByTestId('password');
  readonly loginButton: Locator = this.page.getByTestId('login-submit');

  async loginAs(email: string, password: string): Promise<void> {
    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes(`${baseConfig.API_URL}/users/me`)
        && response.status() === 200
        && response.request().method() === 'GET',
    );

    this.emailInput.fill(email);
    this.passwordInput.fill(password);
    this.loginButton.click();

    await responsePromise;
  }
}
