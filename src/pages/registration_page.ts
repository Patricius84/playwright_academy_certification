import { Locator, Page } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly emailInput: Locator;
  readonly registrationConfirmButton: Locator;
  readonly backToLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[data-testid="username-input"]');
    this.passwordInput = page.locator('input[data-testid="password-input"]');
    this.emailInput = page.locator('input[data-testid="email-input"]');
    this.registrationConfirmButton = page.locator('button[data-testid="submit-button"]');
    this.backToLoginButton = page.locator('button[class="link-button"]')
  }

  async fillUsername(username: string): Promise<this> {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(username: string): Promise<this> {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillEmail(username: string): Promise<this> {
    await this.usernameInput.fill(username);
    return this;
  }

  async clickRegistrationConfirmButton(): Promise<this> {
    await this.registrationConfirmButton.click();
    return this;
  }

  async clickBackToLoginButton(): Promise<this> {
    await this.backToLoginButton.click();
    return this;
  }
}
