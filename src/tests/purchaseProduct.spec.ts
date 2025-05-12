import { test, expect } from '../fixtures';
import { BILLING_ADDRESS_DATA } from '../../testData/billingAddressData';
import { CREDIT_CARD_DATA, PAYMENT_METHOD } from '../../testData/paymentData';
import { baseConfig } from '../../config/baseConfig';

test.skip(baseConfig.CI, 'Test is skipped in CI due to the Cloudflare protection.');

test('Verify user can purchase a product', async ({ app, page }) => {
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

  await test.step('Open Home page', async () => {
    await app.home.header.navigateToHomePage();
  });

  const { title, price } = await app.home.getProductDetailsByIndex();

  await test.step('Open Product details page', async () => {
    await app.home.openProductDetails(title);
  });

  await test.step('Verify Product details page', async () => {
    await expect(page).toHaveURL(/\/product\//);

    await expect(app.productDetails.productName).toHaveText(title);
    await expect(app.productDetails.productPrice).toHaveText(price.toString());
  });

  await test.step('Add product to cart', async () => {
    await app.productDetails.addToCart();
  });

  await test.step('Verify product is added to cart', async () => {
    await expect(app.home.notification.alert).toBeVisible();
    await expect(app.home.notification.alert).toHaveText('Product added to shopping cart.');
    await expect(app.home.notification.alert).toBeHidden({ timeout: 8_000 });

    await expect(app.home.header.cartQuantity).toHaveText('1');
  });

  await test.step('Open cart', async () => {
    await app.home.header.openCart();
  });

  await test.step('Verify checkout page', async () => {
    await expect(page).toHaveURL(/\/checkout$/);

    await expect(app.checkout.numberOfProducts).toHaveCount(1);
    await expect(app.checkout.productTitle).toHaveText(title);
    await expect(app.checkout.productPrice).toHaveText(`$${price.toString()}`);
    await expect(app.checkout.totalPrice).toHaveText(`$${price.toString()}`);
    await expect(app.checkout.proceedToCheckoutButton).toBeVisible();
  });

  await test.step('Proceed to Sign In step', async () => {
    await app.checkout.proceedToCheckout();
  });

  await test.step('Verify Sign In step on the Checkout page', async () => {
    await expect(page).toHaveURL(/\/checkout$/);

    await expect(app.checkout.signInStep.successfulSignInMessage).toHaveText(
      `Hello ${baseConfig.USER_NAME}, you are already logged in. You can proceed to checkout.`,
    );
  });

  await test.step('Proceed to Billing Address step', async () => {
    await app.checkout.signInStep.proceedToCheckout();
  });

  await test.step('Fill in billing address', async () => {
    await app.checkout.billingAddressStep.fillInBillingAddress(BILLING_ADDRESS_DATA);
  });

  await test.step('Proceed to Payment step', async () => {
    await app.checkout.billingAddressStep.proceedToCheckout();
  });

  await test.step('Fill in credit card details', async () => {
    await app.checkout.paymentStep.selectPaymentMethod(PAYMENT_METHOD.CREDIT_CARD);
    await app.checkout.paymentStep.fillInPaymentDetails(CREDIT_CARD_DATA);
  });

  await test.step('Finish payment step', async () => {
    await app.checkout.paymentStep.proceedToCheckout();
  });

  await test.step('Verify that the payment was successful', async () => {
    await expect(page).toHaveURL(/\/checkout$/);

    await expect(app.checkout.paymentStep.paymentSuccessMessage).toBeVisible();
    await expect(app.checkout.paymentStep.paymentSuccessMessage).toHaveText('Payment was successful');
  });
});
