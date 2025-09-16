import { Locator, Page } from "@playwright/test";
import { RegistrationPage } from "./registration_page";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgottenPasswordButton: Locator;
  readonly registrationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[data-testid="username-input"]');
    this.passwordInput = page.locator('input[data-testid="password-input"]');
    this.loginButton = page.locator('button[data-testid="submit-button"]');
    this.registrationButton = page.locator('button[data-testid="register-button"]');
    this.forgottenPasswordButton = page.locator('button[data-testid="registration-link"]')
  }

  async openTegbFrontend(): Promise<this> {
    await this.page.goto(this.url);
    return this;
  }

  async fillUsername(username: string): Promise<this> {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string): Promise<this> {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickLoginButton(): Promise<this> {
    await this.loginButton.click();
    return this;
  }

  async clickRegistrationButton(): Promise<RegistrationPage> {
    await this.registrationButton.click();
    return new RegistrationPage(this.page);
  }

  async clickForgottenPasswordButton(): Promise<this> {
    await this.forgottenPasswordButton.click();
    return this;
  }
}
