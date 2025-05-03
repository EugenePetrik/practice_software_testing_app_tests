import { test, expect } from '../fixtures';
import jsonMock from '../../testData/mocks/products.mock.json';

test('Verify user can purchase a product', async ({ loggedApp }) => {
  // await loggedApp.home.mockProductsResponse([{
  //   'message': 'Requested item not found',
  // }]);

  await loggedApp.home.mockProductsResponse(jsonMock);

  await loggedApp.home.open();

  await expect(loggedApp.home.productName).toHaveCount(6);

  await loggedApp.account.open();

  await expect(loggedApp.account.pageTitle).toHaveText('My account');

  await loggedApp.home.open();

  await expect(loggedApp.home.productName).toHaveCount(6);
});
