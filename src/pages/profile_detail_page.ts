import { Locator, Page } from "@playwright/test";

export class ProfileDetailPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgottenPasswordButton: Locator;
  readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username"); 
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator(".btn");
    this.forgottenPasswordButton = page.locator('#forget_password')
    this.pageHeader = page.locator("h3.form-title");
  }

  async clickRegistrationConfirmButton(): Promise<this> {
    await this.loginButton.click();
    return this;
  }
}
