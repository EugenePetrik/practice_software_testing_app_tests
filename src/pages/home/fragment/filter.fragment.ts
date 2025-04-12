import { Locator } from '@playwright/test';
import { PageHolder } from '../../pageHolder';
import { CATEGORIES, HAND_TOOLS, OTHER, POWER_TOOLS } from '../../../../typings/categories';
import { step } from '../../../../support/reporters/step';

export type SortOption = 'Name (A - Z)' | 'Name (Z - A)' | 'Price (Low - High)' | 'Price (High - Low)';

export class FilterFragment extends PageHolder {
  private readonly root: Locator = this.page.getByTestId('filters');
  readonly sortDropdown: Locator = this.root.getByTestId('sort');
  readonly categories: Locator = this.root.locator('.checkbox');

  @step('Select sort option')
  async selectSortOption(option: SortOption): Promise<void> {
    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes('/products?sort=')
        && response.status() === 200
        && response.request().method() === 'GET',
    );
    await this.sortDropdown.selectOption({ label: option });
    await responsePromise;
  }

  @step('Select category')
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
