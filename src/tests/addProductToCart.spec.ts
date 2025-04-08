import { test, expect } from '@playwright/test';

test('Verify user can add product to cart', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('product-name').filter({ hasText: 'Slip Joint Pliers' }).click();

  await expect(page).toHaveURL(/\/product\//);

  await expect(page.getByTestId('product-name')).toHaveText('Slip Joint Pliers');
  await expect(page.getByTestId('unit-price')).toHaveText('9.17');

  await page.getByTestId('add-to-cart').click();

  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('alert')).toHaveText('Product added to shopping cart.');
  await expect(page.getByRole('alert')).toBeHidden({ timeout: 8_000 });

  await expect(page.getByTestId('cart-quantity')).toHaveText('1');

  await page.getByTestId('nav-cart').click();

  await expect(page).toHaveURL(/\/checkout$/);
  await expect(page.locator('table tbody tr')).toHaveCount(1);
  await expect(page.getByTestId('product-title')).toHaveText('Slip Joint Pliers');
  await expect(page.getByTestId('proceed-1')).toBeVisible();
});
