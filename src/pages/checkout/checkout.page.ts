import { Locator } from '@playwright/test';
import { SignInStep } from './components/signInStep.component';
import { BillingAddressStep } from './components/billingAddressStep.component';
import { PaymentStep } from './components/paymentStep.component';
import { BasePage } from '../base.page';

export class CheckoutPage extends BasePage {
  public readonly pagePath: string = '/checkout';

  readonly signInStep: SignInStep = new SignInStep(this.page);
  readonly billingAddressStep: BillingAddressStep = new BillingAddressStep(this.page);
  readonly paymentStep: PaymentStep = new PaymentStep(this.page);

  readonly numberOfProducts: Locator = this.page.locator('table tbody tr');
  readonly productTitle: Locator = this.page.getByTestId('product-title');
  readonly productPrice: Locator = this.page.getByTestId('product-price');
  readonly totalPrice: Locator = this.page.getByTestId('cart-total');
  readonly proceedToCheckoutButton: Locator = this.page.getByTestId('proceed-1');

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
