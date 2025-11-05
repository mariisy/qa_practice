import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class qaPracticePage extends BasePage {
  constructor(page: Page) { super(page); }

  readonly firstNameField   = this.page.locator('input[id="firstName"]');
  readonly lastNameField    = this.page.locator('input[id="lastName"]');
  readonly phoneNumField    = this.page.locator('input[id="phone"]');
  readonly countrySelect    = this.page.locator('select[id="countries_dropdown_menu"]');
  readonly emailField       = this.page.locator('input[id="emailAddress"]');
  readonly passwordField    = this.page.locator('input[id="password"]'); 
  readonly agreeCheckbox    = this.page.locator('input[id="exampleCheck1"]');
  readonly alertMessage     = this.page.locator('div[id="message"]'); 
  readonly registerButton   = this.page.locator('button[id="registerBtn"]'); 

  async open(url: string) {
    await this.page.goto(url);
  }

  getFieldLocator(fieldName: string) {
  const key = fieldName.toLowerCase().trim();

    switch (key) {
            case 'first name':        return this.firstNameField;
      case 'last name':               return this.lastNameField;
      case 'phone number':
      case 'phone':                   return this.phoneNumField;
      case 'country':                 return this.countrySelect;  // site uses <input>, not <select>
      case 'email':
      case 'email address':           return this.emailField;
      case 'password':                return this.passwordField;
      case 'terms':
      case 'agree':
      case 'terms and conditions':
      case 'i agree with the terms and conditions': return this.agreeCheckbox;
      default:
        throw new Error(`Unknown field name: ${fieldName}`);
    }
  }

  /**
   * Set a single field by its human-friendly name.
   * - Terms: expects "checked" / anything else = unchecked.
   * - Country: plain input (press Enter to accept if it's an autocomplete).
   * - Others: fill text value.
   */
  async setField(fieldName: string, value: string | undefined) {
    const key = fieldName.toLowerCase().trim();
    const locator = this.getFieldLocator(fieldName);

    if (key.includes('terms') || key.includes('agree')) {
      const shouldCheck = (value ?? '').toLowerCase() === 'checked';
      // Checkbox on the page is currently disabled; be graceful in tests.
      if (await locator.isEnabled()) {
        if (shouldCheck) await locator.check();
        else await locator.uncheck();
      } else {
        // Don’t fail the test here; let assertions handle final outcome.
        console.warn(`WARNING "${fieldName}" checkbox is disabled; cannot toggle.`);
      }
      return;
    }

    if (key === 'country') {
    const v = value ?? '';
    // Prefer matching by visible label
    try {
      await locator.selectOption({ label: v });
    } catch {
      // Fallback to matching by option value
      await locator.selectOption(v);
    }
    return;
  }


    // default text input
    await locator.fill(value ?? '');
  }
  
  /**
   * Fill many fields from a Cucumber DataTable (table.hashes()).
   * Expected columns: Field | Value
   */
  async fillFromTable(rows: Array<Record<string, string>>) {
    for (const { Field, Value } of rows) {
      await this.setField(Field, Value);
    }
  }

  // --- submit + message utilities ---
  async submit() {
    await this.registerButton.click();
  }

  async readMessage(): Promise<string> {
    const text = await this.alertMessage.textContent();
    return (text ?? '').trim();
  }

  /** Success criteria used in your Then step */
  isSuccessMessage(msg: string): boolean {
    return msg.includes('Successfully registered the following information');
  }
 
}
