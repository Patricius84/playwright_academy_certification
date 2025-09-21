import { expect, Locator, Page } from "@playwright/test";
import { ProfileDetailPage } from "./profile_detail_page";

export class ProfileDetailEditPage {
  readonly page: Page;
  readonly profileDetailHeader: Locator;
  readonly firstnameInput: Locator;
  readonly surnameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly ageInput: Locator;
  readonly cancelChangesButton: Locator;
  readonly saveChangesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileDetailHeader = page.locator('h2[data-testid="profile-details-title"]'); 
    this.firstnameInput = page.locator('input[data-testid="chage-name-input"]')
    this.surnameInput = page.locator('input[data-testid="chage-surname-input"]')
    this.emailInput = page.locator('input[data-testid="chage-email-input"]')
    this.phoneInput = page.locator('input[data-testid="chage-phone-input"]')
    this.ageInput = page.locator('input[data-testid="chage-age-input"]')
    this.cancelChangesButton = page.locator('button[data-testid="toggle-edit-profile-button"]'); 
    this.saveChangesButton = page.locator('button[data-testid="save-changes-button"]'); 
  }

  async checkProfileDetailHeader(): Promise<this> {
    await expect(this.profileDetailHeader).toHaveText("Detaily Profilu")
    return this;
  }

  async checkProfileDetailEditIsVisible(): Promise<this> {
    await this.saveChangesButton.isVisible();
    return this;
  }

  async fillFirstname(firstname: string): Promise<this> {
    await this.firstnameInput.fill(firstname);
    return this;
  }

  async fillSurname(surname: string): Promise<this> {
    await this.surnameInput.fill(surname);
    return this;
  }

  async fillPhone(phone: string): Promise<this> {
    await this.phoneInput.fill(phone);
    return this;
  }

  async fillEmail(email: string): Promise<this> {
    await this.emailInput.fill(email);
    return this;
  }

  async fillAge(age: string): Promise<this> {
    await this.ageInput.fill(age);
    return this;
  }

  async checkCancelChangesButton(text: string): Promise<this> {
    await this.cancelChangesButton.isVisible({ timeout: 15000 })
    await expect(this.cancelChangesButton)
    .toHaveText(text, { timeout: 15000 })
    return this
  }

  async clickCancelChangesButton(): Promise<ProfileDetailPage> {
    await this.cancelChangesButton.click()
    return new ProfileDetailPage(this.page)
  }

  async checkSaveChangesButton(text: string): Promise<this> {
    await this.saveChangesButton.isVisible({ timeout: 15000 })
    await expect(this.saveChangesButton)
    .toHaveText(text, { timeout: 15000 })
    return this
  }

  async clickSaveChangesButton(): Promise<ProfileDetailPage> {
    await this.saveChangesButton.click()
    return new ProfileDetailPage(this.page)
  }
}
