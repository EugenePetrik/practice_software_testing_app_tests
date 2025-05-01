import { test } from '../fixtures';
import { dataCategories } from '../../testData/categoriesData';

dataCategories.forEach(({ categoriesToSelect, expectedCategories }) => {
  test(`Verify user can filter products by "${categoriesToSelect.join(' / ')}" categories`, async ({ app }) => {
    await test.step('Open home page', async () => {
      await app.home.open();
    });

    await test.step('Select category', async () => {
      for (const category of categoriesToSelect) {
        await app.home.filters.selectCategory(category);
      }
    });

    await test.step('Verify selected categories', async () => {
      await app.home.expectFilteredProductsByCategory(expectedCategories);
    });
  });
});
