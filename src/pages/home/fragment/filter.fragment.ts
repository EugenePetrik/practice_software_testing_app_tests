import { Locator } from '@playwright/test';
import { PageHolder } from '../../pageHolder';

export type SortOption = 'Name (A - Z)' | 'Name (Z - A)' | 'Price (Low - High)' | 'Price (High - Low)';

export class FilterFragment extends PageHolder {
  private readonly root: Locator = this.page.getByTestId('filters');
  readonly sortDropdown: Locator = this.root.getByTestId('sort');

  async selectSortOption(option: SortOption): Promise<void> {
    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes('/products?sort=')
        && response.status() === 200
        && response.request().method() === 'GET',
    );
    await this.sortDropdown.selectOption({ label: option });
    await responsePromise;
  }
}
