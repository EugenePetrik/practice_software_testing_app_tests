import { Locator } from '@playwright/test';
import { HeaderComponent } from './components/header.component';
import { BasePage } from './base.page';

export class AccountPage extends BasePage {
  pagePath = '/account';

  readonly header: HeaderComponent = new HeaderComponent(this.page);

  readonly pageTitle: Locator = this.page.getByTestId('page-title');
}
