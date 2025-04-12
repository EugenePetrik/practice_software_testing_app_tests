import { test } from '@playwright/test';
import { HomePage } from '../pages/home/home.page';
import { dataSortType } from '../../testData/dataSortOptions';

dataSortType.forEach(({ sortBy }) => {
  test(`Verify user can perform sorting products by "${sortBy}"`, async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step('Navigate to the home page', async () => {
      await homePage.goto();
    });

    await test.step('Select sorting option', async () => {
      await homePage.filters.selectSortOption(sortBy);
    });

    await test.step('Verify products are sorted', async () => {
      await homePage.expectSortedProducts(sortBy);
    });
  });
});
