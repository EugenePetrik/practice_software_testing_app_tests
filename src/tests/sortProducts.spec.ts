import { test } from '../fixtures';
import { dataSortType } from '../../testData/sortOptionsData';
import path from 'path';

const users = [
  {
    name: 'Regular',
    storageState: path.join(process.cwd(), '.auth', 'user.json'),
  },
  {
    name: 'Admin',
    storageState: path.join(process.cwd(), '.auth', 'admin.json'),
  },
  {
    name: 'Guest',
    storageState: { cookies: [], origins: [] },
  }
];

users.forEach(({ name, storageState }) => {
  test.describe(`${name} user`, () => {
    test.use({ storageState });

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
  });
});
