import { Locator } from '@playwright/test';
import { PageHolder } from '../pageHolder';

export class HeaderComponent extends PageHolder {
  readonly navMenuDropdown: Locator = this.page.getByTestId('nav-menu');

  readonly navCart: Locator = this.page.getByTestId('nav-cart');
  readonly cartQuantity: Locator = this.page.getByTestId('cart-quantity');

  readonly navHome: Locator = this.page.getByTestId('nav-home');

  async openCart(): Promise<void> {
    await this.navCart.click();
  }

  async navigateToHomePage(): Promise<void> {
    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes('/products?between=')
        && response.status() === 200
        && response.request().method() === 'GET',
    );
    await this.navHome.click();
    await responsePromise;
  }
}
