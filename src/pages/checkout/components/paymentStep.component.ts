import { Locator } from '@playwright/test';
import { PageHolder } from '../../pageHolder';
import { CreditCard, PAYMENT_METHOD } from '../../../../testData/paymentData';

export class PaymentStep extends PageHolder {
  readonly paymentMethodDropdown: Locator = this.page.getByTestId('payment-method');
  readonly confirmButton: Locator = this.page.getByTestId('finish');

  readonly cardNumberInput: Locator = this.page.getByTestId('credit_card_number');
  readonly expirationDateInput: Locator = this.page.getByTestId('expiration_date');
  readonly cvvInput: Locator = this.page.getByTestId('cvv');
  readonly cardHolderNameInput: Locator = this.page.getByTestId('card_holder_name');

  readonly paymentSuccessMessage: Locator = this.page.getByTestId('payment-success-message');

  async selectPaymentMethod(paymentMethod: PAYMENT_METHOD): Promise<void> {
    await this.paymentMethodDropdown.selectOption(paymentMethod);
  }

  async fillInPaymentDetails(cardData: CreditCard): Promise<void> {
    const { cardNumber, expirationDate, cvv, cardHolderName } = cardData;

    await this.cardNumberInput.pressSequentially(cardNumber);
    await this.expirationDateInput.pressSequentially(expirationDate);
    await this.cvvInput.pressSequentially(cvv);
    await this.cardHolderNameInput.pressSequentially(cardHolderName);
  }

  async proceedToCheckout(): Promise<void> {
    await this.confirmButton.click();
  }
}
