import { test } from '../fixtures';
import { dataSortType } from '../../testData/sortOptionsData';

dataSortType.forEach(({ sortBy }) => {
  test(`Verify user can perform sorting products by "${sortBy}"`, async ({ loggedNewUserApp }) => {
    await test.step('Navigate to the home page', async () => {
      await loggedNewUserApp.app.home.open();

      console.log(loggedNewUserApp.newUser.email);
      console.log(loggedNewUserApp.newUser.first_name);
      console.log(loggedNewUserApp.newUser.last_name);
    });

    await test.step('Select sorting option', async () => {
      await loggedNewUserApp.app.home.filters.selectSortOption(sortBy);
    });

    await test.step('Verify products are sorted', async () => {
      await loggedNewUserApp.app.home.expectSortedProducts(sortBy);
    });
  });
});
