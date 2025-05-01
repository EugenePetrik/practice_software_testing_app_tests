import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
  public readonly pagePath: string = '/product/';

  readonly productName: Locator = this.page.getByTestId('product-name');
  readonly productPrice: Locator = this.page.getByTestId('unit-price');
  readonly addToCartButton: Locator = this.page.getByTestId('add-to-cart');
  readonly addToFavoritesButton: Locator = this.page.getByTestId('add-to-favorites');

  async open(path: string): Promise<void> {
    await super.open(`${this.pagePath}${path}`);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
