import { test, expect } from '../fixtures';
import { BILLING_ADDRESS_DATA } from '../../testData/billingAddressData';
import { CREDIT_CARD_DATA, PAYMENT_METHOD } from '../../testData/paymentData';
import { baseConfig } from '../../config/baseConfig';

test('Verify user can purchase a product', async ({ loggedApp, page }) => {
  await test.step('Open Home page', async () => {
    await loggedApp.home.open();
  });

  const { title, price } = await loggedApp.home.getProductDetailsByIndex();

  await test.step('Open Product details page', async () => {
    await loggedApp.home.openProductDetails(title);
  });

  await test.step('Verify Product details page', async () => {
    await expect(page).toHaveURL(/\/product\//);

    await expect(loggedApp.productDetails.productName).toHaveText(title);
    await expect(loggedApp.productDetails.productPrice).toHaveText(price.toString());
  });

  await test.step('Add product to cart', async () => {
    await loggedApp.productDetails.addToCart();
  });

  await test.step('Verify product is added to cart', async () => {
    await expect(loggedApp.home.notification.alert).toBeVisible();
    await expect(loggedApp.home.notification.alert).toHaveText('Product added to shopping cart.');
    await expect(loggedApp.home.notification.alert).toBeHidden({ timeout: 8_000 });

    await expect(loggedApp.home.header.cartQuantity).toHaveText('1');
  });

  await test.step('Open cart', async () => {
    await loggedApp.home.header.openCart();
  });

  await test.step('Verify checkout page', async () => {
    await expect(page).toHaveURL(/\/checkout$/);

    await expect(loggedApp.checkout.numberOfProducts).toHaveCount(1);
    await expect(loggedApp.checkout.productTitle).toHaveText(title);
    await expect(loggedApp.checkout.productPrice).toHaveText(`$${price.toString()}`);
    await expect(loggedApp.checkout.totalPrice).toHaveText(`$${price.toString()}`);
    await expect(loggedApp.checkout.proceedToCheckoutButton).toBeVisible();
  });

  await test.step('Proceed to Sign In step', async () => {
    await loggedApp.checkout.proceedToCheckout();
  });

  await test.step('Verify Sign In step on the Checkout page', async () => {
    await expect(page).toHaveURL(/\/checkout$/);

    await expect(loggedApp.checkout.signInStep.successfulSignInMessage).toHaveText(
      `Hello ${baseConfig.USER_NAME}, you are already logged in. You can proceed to checkout.`,
    );
  });

  await test.step('Proceed to Billing Address step', async () => {
    await loggedApp.checkout.signInStep.proceedToCheckout();
  });

  await test.step('Fill in billing address', async () => {
    await loggedApp.checkout.billingAddressStep.fillInBillingAddress(BILLING_ADDRESS_DATA);
  });

  await test.step('Proceed to Payment step', async () => {
    await loggedApp.checkout.billingAddressStep.proceedToCheckout();
  });

  await test.step('Fill in credit card details', async () => {
    await loggedApp.checkout.paymentStep.selectPaymentMethod(PAYMENT_METHOD.CREDIT_CARD);
    await loggedApp.checkout.paymentStep.fillInPaymentDetails(CREDIT_CARD_DATA);
  });

  await test.step('Finish payment step', async () => {
    await loggedApp.checkout.paymentStep.proceedToCheckout();
  });

  await test.step('Verify that the payment was successful', async () => {
    await expect(page).toHaveURL(/\/checkout$/);

    await expect(loggedApp.checkout.paymentStep.paymentSuccessMessage).toBeVisible();
    await expect(loggedApp.checkout.paymentStep.paymentSuccessMessage).toHaveText('Payment was successful');
  });
});
