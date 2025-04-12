import { test, expect, Locator } from '@playwright/test';
import { FilterFragment, SortOption } from './fragment/filter.fragment';
import { BasePage } from '../base.page';
import { HAND_TOOLS, OTHER, POWER_TOOLS } from '../../../typings/categories';
import { step } from '../../../support/reporters/step';

export class HomePage extends BasePage {
  public readonly pagePath: string = '/';

  readonly productName: Locator = this.page.getByTestId('product-name');
  readonly productPrice: Locator = this.page.getByTestId('product-price');
  readonly filters: FilterFragment = new FilterFragment(this.page);

  @step('Open Home page')
  async goto(): Promise<void> {
    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes('/products?between=price,1,100&page=1')
      && response.status() === 200
      && response.request().method() === 'GET',
    );
    await this.page.goto(this.pagePath);
    await responsePromise;
  }

  @step('Get products names')
  async getProductNames(): Promise<string[]> {
    const productNames = await this.productName.allTextContents();
    return productNames;
  }

  @step('Get products prices')
  async getProductPrices(): Promise<number[]> {
    const productPrices = await this.productPrice.allTextContents();
    return productPrices.map((price) => parseInt(price.replace('$', '').trim()));
  }

  @step('Assert products sorted')
  async expectSortedProducts(sortBy: SortOption): Promise<void> {
    switch (sortBy) {
      case 'Name (A - Z)': {
        const productNames = await this.getProductNames();
        const sortedProductsNamesAZ = productNames.toSorted((a, b) => a.localeCompare(b));
        const areProductsNamesSorted = productNames.join() === sortedProductsNamesAZ.join();

        await test.info().attach('Sorted products names A - Z on UI', {
          body: JSON.stringify(productNames, null, 2),
          contentType: 'application/json',
        });
        await test.info().attach('Sorted products names A - Z after calculation', {
          body: JSON.stringify(sortedProductsNamesAZ, null, 2),
          contentType: 'application/json',
        });

        expect(
            areProductsNamesSorted,
            `Products are sorted incorrectly from A to Z.
              Actual products names - ${productNames}, expected products names - ${sortedProductsNamesAZ}`,
        ).toBe(true);
        break;
      }
      case 'Name (Z - A)': {
        const productNames = await this.getProductNames();
        const sortedProductsNamesZA = productNames.toSorted((a, b) => b.localeCompare(a));
        const areProductsNamesSorted = productNames.join() === sortedProductsNamesZA.join();

        await test.info().attach('Sorted products names A - Z on UI', {
          body: JSON.stringify(productNames, null, 2),
          contentType: 'application/json',
        });
        await test.info().attach('Sorted products names A - Z after calculation', {
          body: JSON.stringify(sortedProductsNamesZA, null, 2),
          contentType: 'application/json',
        });

        expect(
            areProductsNamesSorted,
            `Products are sorted incorrectly from Z to A.
              Actual products names - ${productNames}, expected products names - ${sortedProductsNamesZA}`,
        ).toBe(true);
        break;
      }
      case 'Price (Low - High)': {
        const productPrices = await this.getProductPrices();
        const sortedProductsPricesLowHigh = productPrices.toSorted((a, b) => a - b);
        const areProductsPricesSorted = productPrices.join() === sortedProductsPricesLowHigh.join();

        await test.info().attach('Sorted products prices Low - High on UI', {
          body: JSON.stringify(productPrices, null, 2),
          contentType: 'application/json',
        });
        await test.info().attach('Sorted products prices Low - High after calculation', {
          body: JSON.stringify(sortedProductsPricesLowHigh, null, 2),
          contentType: 'application/json',
        });

        expect(
            areProductsPricesSorted,
            `Products are sorted incorrectly from Low to High.
              Actual products prices - ${productPrices}, expected products prices - ${sortedProductsPricesLowHigh}`,
        ).toBe(true);
        break;
      }
      case 'Price (High - Low)': {
        const productPrices = await this.getProductPrices();
        const sortedProductsPricesHighLow = productPrices.toSorted((a, b) => b - a);
        const areProductsPricesSorted = productPrices.join() === sortedProductsPricesHighLow.join();

        await test.info().attach('Sorted products prices Low - High on UI', {
          body: JSON.stringify(productPrices, null, 2),
          contentType: 'application/json',
        });
        await test.info().attach('Sorted products prices Low - High after calculation', {
          body: JSON.stringify(sortedProductsPricesHighLow, null, 2),
          contentType: 'application/json',
        });

        expect(
            areProductsPricesSorted,
            `Products are sorted incorrectly from High to Low.
              Actual products prices - ${productPrices}, expected products prices - ${sortedProductsPricesHighLow}`,
        ).toBe(true);
        break;
      }
      default:
        throw new Error(`Unknown sort option: ${sortBy}`);
    }
  }

  @step('Assert products filtered by categories')
  async expectFilteredProductsByCategory(categories: (HAND_TOOLS | POWER_TOOLS | OTHER)[]): Promise<void> {
    const productNames = await this.getProductNames();

    await test.info().attach(`Filtered products by categories - ${categories.join(', ')}`, {
      body: JSON.stringify(productNames, null, 2),
      contentType: 'application/json',
    });

    const unexpectedProducts = productNames.filter((productName) => {
      return !categories.some((category) => productName.includes(category));
    });

    expect(
        unexpectedProducts.length,
        `Unexpected products found for categories: ${categories.join(', ')}.
            Unexpected: ${unexpectedProducts.join(', ')}.\nAll: ${productNames.join(', ')}`,
    ).toBe(0);
  }
}
