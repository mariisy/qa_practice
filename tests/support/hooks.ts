import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, type Browser } from 'playwright';
import type { CustomWorld } from './world';

setDefaultTimeout(60 * 1000);

let browser: Browser;

BeforeAll(async () => {
  const headless = process.env.HEADLESS !== 'false';
  const slowMo = Number(process.env.SLOWMO || 0);
  browser = await chromium.launch({ headless, slowMo });
});

AfterAll(async () => { await browser.close(); });

Before<CustomWorld>(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After<CustomWorld>(async function () {
  await this.page.close();
  await this.context.close();
});
