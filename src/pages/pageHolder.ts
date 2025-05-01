import { Page } from '@playwright/test';

export abstract class PageHolder {
  constructor(readonly page: Page) {
    this.page = page;
  }
}
