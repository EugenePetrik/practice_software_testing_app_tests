import { Locator, Page } from '@playwright/test';

export type SortOption = 'Name (A - Z)' | 'Name (Z - A)' | 'Price (Low - High)' | 'Price (High - Low)';

export class FilterFragment {
  readonly page: Page;
  private readonly root: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByTestId('filters');
    this.sortDropdown = this.root.getByTestId('sort');
  }

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
