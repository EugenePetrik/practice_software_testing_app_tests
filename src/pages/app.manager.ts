import { AccountPage } from './account.page';
import { CheckoutPage } from './checkout/checkout.page';
import { DashboardPage } from './dashboard.page';
import { HomePage } from './home/home.page';
import { LoginPage } from './login.page';
import { PageHolder } from './pageHolder';
import { ProductDetailsPage } from './productDetails.page';

export class AppManager extends PageHolder {
  readonly login: LoginPage = new LoginPage(this.page);
  readonly account: AccountPage = new AccountPage(this.page);
  readonly dashboard: DashboardPage = new DashboardPage(this.page);
  readonly home: HomePage = new HomePage(this.page);
  readonly productDetails: ProductDetailsPage = new ProductDetailsPage(this.page);
  readonly checkout: CheckoutPage = new CheckoutPage(this.page);
}
