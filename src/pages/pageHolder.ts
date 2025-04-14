import { Page } from '@playwright/test';

export abstract class PageHolder {
  page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }
}
