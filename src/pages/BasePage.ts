// src/pages/BasePage.ts
import type { Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // small, generic helpers (optional)
  protected async type(selectorOrLocator: any, value: string) {
    const loc = typeof selectorOrLocator === 'string'
      ? this.page.locator(selectorOrLocator)
      : selectorOrLocator;
    await loc.fill(value);
  }

  protected async click(selectorOrLocator: any) {
    const loc = typeof selectorOrLocator === 'string'
      ? this.page.locator(selectorOrLocator)
      : selectorOrLocator;
    await loc.click();
  }
}
