import { expect, Locator, Page } from "@playwright/test";
import { RegistrationPage } from "./registration_page";
import { ProfileDetailPage } from "./profile_detail_page";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registrationButton: Locator;
  readonly registrationSuccessMessage: Locator;
  readonly forgottenPasswordButton: Locator;
  readonly usernameIsRequiredText: Locator;
  readonly passwordIsRequiredText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[data-testid="username-input"]');
    this.passwordInput = page.locator('input[data-testid="password-input"]');
    this.loginButton = page.locator('button[data-testid="submit-button"]');
    this.registrationButton = page.locator('button[data-testid="register-button"]');
    this.registrationSuccessMessage = page.locator('div[data-testid="success-message"]');
    this.forgottenPasswordButton = page.locator('button[data-testid="registration-link"]')
    this.usernameIsRequiredText = page.locator('//form//div[text()="Uživatelské jméno je povinné"]')
    this.passwordIsRequiredText = page.locator('//form//div[text()="Heslo je povinné"]')
  }

  async openTegbFrontend(): Promise<this> {
    await this.page.goto(this.url);
    return this;
  }

  async checkLoginFormIsVisible(): Promise<this> {
    await this.usernameInput.isVisible({ timeout: 15000 });
    return this;
  }

  async checkRegistrationSuccessMessageIsVisible(): Promise<this> {
    await expect(this.registrationSuccessMessage).toBeVisible({ timeout: 15000 });
    return this;
  }

  async checkRegistrationSuccessMessageText(): Promise<this> {
    await expect(this.registrationSuccessMessage)
    .toContainText('Registrace úspěšná! Vítejte v TEG#B!', { timeout: 15000 })
    return this;
  }

  async fillUsername(username: string): Promise<this> {
    await this.usernameInput.fill(username, { timeout: 1_000 });
    return this;
  }

  async fillPassword(password: string): Promise<this> {
    await this.passwordInput.fill(password);
    return this;
  }

  async checkLoginButton(text: string): Promise<this> {
    await this.loginButton.isVisible({ timeout: 15000 })
    await expect(this.loginButton).toHaveText(text, { timeout: 15000 })
    return this
  }

  async clickLoginButton(): Promise<ProfileDetailPage> {
    await this.loginButton.click()
    return new ProfileDetailPage(this.page)
  }

  async checkRegistrationButton(text: string): Promise<this> {
    await this.registrationButton.isVisible({ timeout: 15000 })
    await expect(this.registrationButton).toHaveText(text, { timeout: 15000 })
    return this
  }

  async clickRegistrationButton(): Promise<RegistrationPage> {
    await this.registrationButton.click();
    return new RegistrationPage(this.page);
  }

  async checkForgottenPasswordButton(text: string): Promise<this> {
    await this.forgottenPasswordButton.isVisible({ timeout: 15000 })
    await expect(this.forgottenPasswordButton).toHaveText(text, { timeout: 15000 })
    return this
  }

  async clickForgottenPasswordButton(): Promise<this> {
    await this.forgottenPasswordButton.click();
    return this;
  }

  async checkUsernameIsRequiredText(text: string): Promise<this> {
    await this.usernameIsRequiredText.isVisible({ timeout: 15000 })
    await expect(this.usernameIsRequiredText).toHaveText(text, { timeout: 15000 })
    return this
  }

  async checkPasswordIsRequiredText(text: string): Promise<this> {
    await this.passwordIsRequiredText.isVisible()
    await expect(this.passwordIsRequiredText).toHaveText(text)
    return this
  }
}
