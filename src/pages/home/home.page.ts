import { test, expect, Locator } from '@playwright/test';
import { FilterComponent, SortOption } from './components/filter.component';
import { BasePage } from '../base.page';
import { HAND_TOOLS, OTHER, POWER_TOOLS } from '../../../typings/categories';
import { NotificationComponent } from '../components/notification.component';
import { HeaderComponent } from '../components/header.component';

export class HomePage extends BasePage {
  public readonly pagePath: string = '/';

  readonly notification: NotificationComponent = new NotificationComponent(this.page);
  readonly header: HeaderComponent = new HeaderComponent(this.page);
  readonly filters: FilterComponent = new FilterComponent(this.page);

  readonly productName: Locator = this.page.getByTestId('product-name');
  readonly productPrice: Locator = this.page.getByTestId('product-price');

  async open(): Promise<void> {
    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes('/products?between=')
      && response.status() === 200
      && response.request().method() === 'GET',
    );
    await super.open(this.pagePath);
    await responsePromise;
  }

  async getProductNames(): Promise<string[]> {
    const productNames = await this.productName.allTextContents();
    return productNames;
  }

  async getProductPrices(): Promise<number[]> {
    const productPrices = await this.productPrice.allTextContents();
    return productPrices.map((price) => parseInt(price.replace('$', '').trim()));
  }

  async getProductDetailsByIndex(index = 0): Promise<{ title: string; price: number }> {
    await expect(this.productName, 'Products not loaded').not.toHaveCount(0);

    const productNameText = await this.productName.nth(index).textContent();
    const productPriceText = await this.productPrice.nth(index).textContent();

    return {
      title: productNameText?.trim() ?? '',
      price: parseFloat(productPriceText?.replace('$', '').trim() ?? '0'),
    };
  }

  async openProductDetails(title: string): Promise<void> {
    await this.productName.filter({ hasText: title }).click();
  }

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
              Actual products names - ${productNames.join(', ')}, expected products names - ${sortedProductsNamesAZ.join(', ')}`,
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
              Actual products names - ${productNames.join(', ')}, expected products names - ${sortedProductsNamesZA.join(', ')}`,
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
              Actual products prices - ${productPrices.join(', ')}, expected products prices - ${sortedProductsPricesLowHigh.join(', ')}`,
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
              Actual products prices - ${productPrices.join(', ')}, expected products prices - ${sortedProductsPricesHighLow.join(', ')}`,
        ).toBe(true);
        break;
      }
      default:
        throw new Error(`Unknown sort option: ${sortBy as string}`);
    }
  }

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

  async mockProductsResponse(json: unknown): Promise<void> {
    await this.page.route('**/products*', async (route) => {
      await route.fulfill({
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(json),
      });
    });
  }
}
