import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';
import { qaPracticePage } from '../../src/pages/qaPracticePage';
import { expect } from '@playwright/test';


Given<CustomWorld>('user navigates to registration page', async function () {
  const form = new qaPracticePage(this.page);
  await form.open(this.params.baseURL);
});

When<CustomWorld>('user fills out the registration form:', async function (dataTable) {
  const page = new qaPracticePage(this.page);
  const rows = dataTable.hashes(); // [{ Field: 'First Name', Value: '...' }, ...]
  await page.fillFromTable(rows);
});

When<CustomWorld>('user submits the registration form', async function () {
  const form = new qaPracticePage(this.page);
  await form.submit();
});

Then<CustomWorld>(
  /^user should(?: (not))? be able to register$/,
  async function (negation?: string) {
    const form = new qaPracticePage(this.page);
    await expect(form.alertMessage).toBeVisible({ timeout: 5000 });
    const msg = await form.readMessage();
    const success = form.isSuccessMessage(msg);

    if (negation) {
      expect(success, `Expected NOT to register, but message was: "${msg}"`).toBeFalsy();
    } else {
      expect(success, `Expected successful registration, but message was: "${msg}"`).toBeTruthy();
    }
  }
);

Then<CustomWorld>('the message should contain {string}', async function (text: string) {
  const form = new qaPracticePage(this.page);
  await expect(form.alertMessage).toBeVisible({ timeout: 5000 });
  await expect(form.alertMessage).toContainText(text);
});

Then<CustomWorld>('the password field should be masked', async function () {
  const form = new qaPracticePage(this.page);
  await expect(form.passwordField).toHaveAttribute('type', 'password');
});


Then<CustomWorld>('the terms checkbox should be enabled', async function () {
  const form = new qaPracticePage(this.page);
  await expect(form.agreeCheckbox).toBeEnabled();
});

Then<CustomWorld>('the message should not contain {string}', async function (text: string) {
  const form = new qaPracticePage(this.page);
  await expect(form.alertMessage).toBeVisible({ timeout: 5000 });
  const actual = await form.readMessage();
  expect(actual).not.toContain(text);
});




