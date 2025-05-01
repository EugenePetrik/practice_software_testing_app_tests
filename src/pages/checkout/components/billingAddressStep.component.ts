import { Locator } from '@playwright/test';
import { PageHolder } from '../../pageHolder';
import { BillingAddress } from '../../../../testData/billingAddressData';

export class BillingAddressStep extends PageHolder {
  readonly streetInput: Locator = this.page.getByTestId('street');
  readonly cityInput: Locator = this.page.getByTestId('city');
  readonly stateInput: Locator = this.page.getByTestId('state');
  readonly countryInput: Locator = this.page.getByTestId('country');
  readonly zipCodeInput: Locator = this.page.getByTestId('postal_code');
  readonly proceedToCheckoutButton: Locator = this.page.getByTestId('proceed-3');

  async fillInBillingAddress(billingAddress: BillingAddress): Promise<void> {
    const { street, city, state, country, zipCode } = billingAddress;

    await this.streetInput.pressSequentially(street);
    await this.cityInput.pressSequentially(city);
    await this.stateInput.pressSequentially(state);
    await this.countryInput.pressSequentially(country);
    await this.zipCodeInput.pressSequentially(zipCode);
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
