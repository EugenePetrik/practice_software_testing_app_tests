import { Locator } from '@playwright/test';
import { PageHolder } from '../../pageHolder';

export class SignInStep extends PageHolder {
  readonly successfulSignInMessage: Locator = this.page.locator('div.container p');
  readonly proceedToCheckoutButton: Locator = this.page.getByTestId('proceed-2');

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
