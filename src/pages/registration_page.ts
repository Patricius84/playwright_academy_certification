import { expect, Locator, Page } from "@playwright/test";
import { ProfileDetailPage } from "./profile_detail_page";
import { LoginPage } from "./login_page";

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
    await this.passwordInput.fill(username);
    return this;
  }

  async fillEmail(username: string): Promise<this> {
    await this.emailInput.fill(username);
    return this;
  }

  async checkRegistrationConfirmButton(text: string): Promise<this> {
    await this.registrationConfirmButton.isVisible()
    await expect(this.registrationConfirmButton).toHaveText(text, { timeout: 15000 })
    return this
  }

  async clickRegistrationConfirmButton(): Promise<LoginPage> {
    await this.registrationConfirmButton.click()
    return new LoginPage(this.page)
  }

  async checkBackToLoginButton(text: string): Promise<this> {
    await this.backToLoginButton.isVisible()
    await expect(this.backToLoginButton).toHaveText(text, { timeout: 15000 })
    return this
  }

  async clickBackToLoginButton(): Promise<LoginPage> {
    await this.backToLoginButton.click();
    return new LoginPage(this.page)
  }
}
