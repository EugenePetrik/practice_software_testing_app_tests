import { Locator } from '@playwright/test';
import { PageHolder } from '../../pageHolder';
import { CATEGORIES, HAND_TOOLS, OTHER, POWER_TOOLS } from '../../../../typings/categories';

export type SortOption = 'Name (A - Z)' | 'Name (Z - A)' | 'Price (Low - High)' | 'Price (High - Low)';

export class FilterComponent extends PageHolder {
  private readonly root: Locator = this.page.getByTestId('filters');
  readonly sortDropdown: Locator = this.root.getByTestId('sort');
  readonly categories: Locator = this.root.locator('.checkbox');

  async selectSortOption(option: SortOption): Promise<void> {
    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes('/products?sort=')
        && response.status() === 200
        && response.request().method() === 'GET',
    );
    await this.sortDropdown.selectOption({ label: option });
    await responsePromise;
  }

  async selectCategory(category: HAND_TOOLS | POWER_TOOLS | OTHER | CATEGORIES): Promise<void> {
    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes('/products?between=price')
      && response.status() === 200
      && response.request().method() === 'GET',
    );
    await this.categories.getByText(category).check();
    await responsePromise;
  }
}
