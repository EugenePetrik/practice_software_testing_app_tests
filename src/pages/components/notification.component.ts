import { Locator } from '@playwright/test';
import { PageHolder } from '../pageHolder';

export class NotificationComponent extends PageHolder {
  readonly alert: Locator = this.page.getByRole('alert');
}
