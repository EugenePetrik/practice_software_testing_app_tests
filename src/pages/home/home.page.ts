import { expect, Locator } from '@playwright/test';
import { FilterFragment, SortOption } from './fragment/filter.fragment';
import { BasePage } from '../base.page';

export class HomePage extends BasePage {
  readonly productName: Locator = this.page.getByTestId('product-name');
  readonly productPrice: Locator = this.page.getByTestId('product-price');
  readonly filters: FilterFragment = new FilterFragment(this.page);

  async getProductNames(): Promise<string[]> {
    const productNames = await this.productName.allTextContents();
    return productNames;
  }

  async getProductPrices(): Promise<number[]> {
    const productPrices = await this.productPrice.allTextContents();
    return productPrices.map((price) => parseInt(price.replace('$', '').trim()));
  }

  async expectSortedProducts(sortBy: SortOption): Promise<void> {
    switch (sortBy) {
      case 'Name (A - Z)': {
        const productNames = await this.getProductNames();
        const sortedProductNames = productNames.toSorted((a, b) => a.localeCompare(b));
        const areProductsSorted = productNames.join() === sortedProductNames.join();
        expect(areProductsSorted, `Products are not sorted from ${sortBy}`).toBe(true);
        break;
      }
      case 'Name (Z - A)': {
        const productNames = await this.getProductNames();
        const sortedProductNames = productNames.toSorted((a, b) => b.localeCompare(a));
        const areProductsSorted = productNames.join() === sortedProductNames.join();
        expect(areProductsSorted, `Products are not sorted from ${sortBy}`).toBe(true);
        break;
      }
      case 'Price (Low - High)': {
        const productPrices = await this.getProductPrices();
        const sortedProductPrices = productPrices.toSorted((a, b) => a - b);
        const areProductsSorted = productPrices.join() === sortedProductPrices.join();
        expect(areProductsSorted, `Products are not sorted from ${sortBy}`).toBe(true);
        break;
      }
      case 'Price (High - Low)': {
        const productPrices = await this.getProductPrices();
        const sortedProductPrices = productPrices.toSorted((a, b) => b - a);
        const areProductsSorted = productPrices.join() === sortedProductPrices.join();
        expect(areProductsSorted, `Products are not sorted from ${sortBy}`).toBe(true);
        break;
      }
      default:
        throw new Error(`Unknown sort option: ${sortBy}`);
    }
  }
}
