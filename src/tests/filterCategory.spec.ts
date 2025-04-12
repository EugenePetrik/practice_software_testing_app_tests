import { test } from '@playwright/test';
import { dataCategories } from '../../testData/dataCategories';
import { HomePage } from '../pages/home/home.page';

dataCategories.forEach(({ categoriesToSelect, expectedCategories }) => {
  test(`Verify user can filter products by "${categoriesToSelect.join(' / ')}" categories`, async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step('Open home page', async () => {
      await homePage.goto();
    });

    await test.step('Select category', async () => {
      for (const category of categoriesToSelect) {
        await homePage.filters.selectCategory(category);
      }
    });

    await test.step('Verify selected categories', async () => {
      await homePage.expectFilteredProductsByCategory(expectedCategories);
    });
  });
});
