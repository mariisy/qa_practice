import { setWorldConstructor, IWorldOptions, World } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from 'playwright';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  params: any;

  constructor(options: IWorldOptions) {
    super(options);
    this.params = options.parameters;
  }
}

setWorldConstructor(CustomWorld);
