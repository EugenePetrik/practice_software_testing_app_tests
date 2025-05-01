import { PageHolder } from './pageHolder';

export abstract class BasePage extends PageHolder {
  /**
   * Path to the page can be relative to the baseUrl defined in playwright.config.ts
   * or absolute (on your own risk)
   */
  public abstract pagePath: string;

  /**
   * Opens the page in the browser
   */
  async open(path?: string): Promise<void> {
    await this.page.goto(path ?? this.pagePath);
  }
}
