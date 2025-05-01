import { test } from '../fixtures';
import { dataSortType } from '../../testData/sortOptionsData';

dataSortType.forEach(({ sortBy }) => {
  test(`Verify user can perform sorting products by "${sortBy}"`, async ({ app }) => {
    await test.step('Navigate to the home page', async () => {
      await app.home.open();
    });

    await test.step('Select sorting option', async () => {
      await app.home.filters.selectSortOption(sortBy);
    });

    await test.step('Verify products are sorted', async () => {
      await app.home.expectSortedProducts(sortBy);
    });
  });
});
