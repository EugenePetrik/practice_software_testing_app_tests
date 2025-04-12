import { PageHolder } from './pageHolder';

export abstract class BasePage extends PageHolder {
  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
