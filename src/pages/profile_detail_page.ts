import { expect, Locator, Page } from "@playwright/test";
import { ProfileDetailEditPage } from "./profile_detail_edit_page";
import { LoginPage } from "./login_page";

export class ProfileDetailPage {
  readonly page: Page;
  readonly pageHeader: Locator
  readonly pageHeaderLogo: Locator
  readonly dashboardSidebar: Locator
  readonly dashboardSidebarHome: Locator
  readonly dashboardSidebarAccounts: Locator
  readonly dashboardSidebarTransactions: Locator
  readonly dashboardSidebarSupport: Locator
  readonly profileDetailHeader: Locator;
  readonly profileUpdatedSuccessfully: Locator;
  readonly firstname: Locator;
  readonly surname: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly age: Locator;
  readonly profileDetailEditButton: Locator;
  readonly accountsDetailHeader: Locator;
  readonly accountNumberColumnHeader: Locator;
  readonly accountNumberValue: Locator;
  readonly balanceColumnHeader: Locator;
  readonly balanceValue: Locator;
  readonly accountTypeColumnHeader: Locator;
  readonly accountTypeValue: Locator;
  readonly addAccountButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator('span[class="app-title"]');
    this.pageHeaderLogo = page.locator('img[alt="Tredgate Logo"]');
    this.dashboardSidebar = page.locator('aside[class="dashboard-sidebar"]');
    this.dashboardSidebarHome = page.locator('li:nth-child(1)');
    this.dashboardSidebarAccounts = page.locator('li:nth-child(2)')
    this.dashboardSidebarTransactions = page.locator('li:nth-child(3)')
    this.dashboardSidebarSupport = page.locator('li:nth-child(4)')
    this.profileDetailHeader = page.locator('h2[data-testid="profile-details-title"]'); 
    this.profileUpdatedSuccessfully = page.locator('div[class="update-message"]'); 
    this.firstname = page.locator('div[data-testid="name"]'); 
    this.surname = page.locator('div[data-testid="surname"]'); 
    this.email = page.locator('div[data-testid="email"]'); 
    this.phone = page.locator('div[data-testid="phone"]'); 
    this.age = page.locator('div[data-testid="age"]'); 
    this.profileDetailEditButton = page.locator('button[data-testid="toggle-edit-profile-button"]');
    this.accountsDetailHeader = page.locator('h2[data-testid="accounts-title"]');
    this.accountNumberColumnHeader = page.locator('th[data-testid="account-number-heading"]');
    this.accountNumberValue = page.locator('td[data-testid="account-number"]')
    this.balanceColumnHeader = page.locator('th[data-testid="account-balance-heading"]');
    this.balanceValue = page.locator('td[data-testid="account-balance"]')
    this.accountTypeColumnHeader = page.locator('th[data-testid="account-type-heading"]');
    this.accountTypeValue = page.locator('td[data-testid="account-type"]')
    this.addAccountButton = page.locator('button[class="account-action"]');
    this.logoutButton = page.locator('button[class="logout-link"]');
  }

  async checkPageHeaderText(value: string): Promise<this> {
    await this.pageHeader.isVisible()
    await expect(this.pageHeader)
    .toHaveText(value, { timeout: 15000 })
    return this;
  }

  async checkPageHeaderLogo(): Promise<this> {
    await this.pageHeaderLogo.isVisible()
    return this;
  }

  async checkDashboardSidebar(): Promise<this> {
    await this.dashboardSidebar.isVisible({ timeout: 15000 })
    return this;
  }

  async checkDashboardSidebarHome(value: string): Promise<this> {
    await expect(this.dashboardSidebarHome)
    .toHaveText(value, { timeout: 15000 })
    return this;
  }

  async checkDashboardSidebarAccounts(value: string): Promise<this> {
    await expect(this.dashboardSidebarAccounts)
    .toHaveText(value, { timeout: 15000 })
    return this;
  }

  async checkDashboardSidebarTransactions(value: string): Promise<this> {
    await expect(this.dashboardSidebarTransactions)
    .toHaveText(value, { timeout: 15000 })
    return this;
  }

  async checkDashboardSidebarSupport(value: string): Promise<this> {
    await expect(this.dashboardSidebarSupport)
    .toHaveText(value, { timeout: 15000 })
    return this;
  }

  async checkProfileDetailHeader(value: string): Promise<this> {
    await this.profileDetailHeader.isVisible()
    await expect(this.profileDetailHeader)
    .toHaveText(value, { timeout: 15000 })
    return this;
  }

  async checkProfileDetailIsVisible(): Promise<this> {
    await this.firstname.isVisible({ timeout: 15000 });
    return this
  }

  async checkProfileUpdatedsuccessfullyText(): Promise<this> {
    await this.profileUpdatedSuccessfully.isVisible({ timeout: 15000 });
    await expect(this.profileUpdatedSuccessfully).toHaveText("Profile updated successfully!", { timeout: 15000 })
    return this
  }

  async checkFirstnameField(Value: string): Promise<this> {
    await this.firstname.isVisible({ timeout: 15000 })
    await expect(this.firstname).toContainText(Value, { timeout: 15000 })
    return this;
  }

  async checkFirstnameValue(Value: string): Promise<this> {
    await this.firstname.isVisible({ timeout: 15000 })
    await expect(this.firstname).toContainText(Value, { timeout: 15000 })
    return this;
  }

  async checkSurnameValue(Value: string): Promise<this> {
    await this.surname.isVisible()
    await expect(this.surname).toContainText(Value)
    return this;
  }

  async checkSurnameField(Value: string): Promise<this> {
    await this.surname.isVisible()
    await expect(this.surname).toContainText(Value)
    return this;
  }

  async checkEmailField(Value: string): Promise<this> {
    await this.email.isVisible()
    await expect(this.email).toContainText(Value)
    return this;
  }

  async checkEmailValue(Value: string): Promise<this> {
    await this.email.isVisible()
    await expect(this.email).toContainText(Value)
    return this;
  }

  async checkPhoneField(Value: string): Promise<this> {
    await this.phone.isVisible()
    await expect(this.phone).toContainText(Value)
    return this;
  }

  async checkPhoneValue(Value: string): Promise<this> {
    await this.phone.isVisible()
    await expect(this.phone).toContainText(Value)
    return this;
  }

  async checkAgeField(Value: string): Promise<this> {
    await this.age.isVisible()
    await expect(this.age).toContainText(Value)
    return this;
  }

  async checkAgeValue(Value: string): Promise<this> {
    await this.age.isVisible()
    await expect(this.age).toContainText(Value)
    return this;
  }

  async checkProfileDetailEditButton(value: string): Promise<this> {
    await this.profileDetailEditButton.isVisible({ timeout: 15000 });
    await expect(this.profileDetailEditButton)
    .toHaveText(value, { timeout: 15000 })
    return this
  }

  async clickProfileDetailEditButton(): Promise<ProfileDetailEditPage> {
    await this.profileDetailEditButton.click();
    return new ProfileDetailEditPage(this.page)
  }

  async checkAccountsDetailHeader(value: string): Promise<this> {
    await this.accountsDetailHeader.isVisible({ timeout: 15000 })
    await expect(this.accountsDetailHeader)
    .toHaveText(value, { timeout: 15000 })
    return this;
  }

  async checkAccountNumberColumnHeader(Value: string): Promise<this> {
    await this.accountNumberColumnHeader.isVisible({ timeout: 15000 })
    await expect(this.accountNumberColumnHeader).toHaveText(Value, { timeout: 15000 })
    return this;
  }

  async checkAccountNumberValue(): Promise<this> {
    await this.accountNumberValue.isVisible({ timeout: 15000 })
    return this;
  }

  async checkBalanceColumnHeader(Value: string): Promise<this> {
    await this.balanceColumnHeader.isVisible()
    await expect(this.balanceColumnHeader).toHaveText(Value)
    return this;
  }

  async checkBalanceValue(Value: string): Promise<this> {
    await this.balanceValue.isVisible()
    await expect(this.balanceValue).toContainText(Value)
    return this;
  }

  async checkBalanceCurrency(Value: string): Promise<this> {
    await this.balanceValue.isVisible()
    await expect(this.balanceValue).toContainText(Value)
    return this;
  }

  async checkAccountTypeColumnHeader(Value: string): Promise<this> {
    await this.accountTypeColumnHeader.isVisible()
    await expect(this.accountTypeColumnHeader).toHaveText(Value)
    return this;
  }

  async checkAccountTypeValue(Value: string): Promise<this> {
    await this.accountTypeValue.isVisible()
    await expect(this.accountTypeValue).toHaveText(Value)
    return this;
  }

  async checkAddAccountButton(Value: string): Promise<this> {
    await this.addAccountButton.isVisible({ timeout: 15000 });
    await expect(this.addAccountButton).toHaveText(Value, { timeout: 15000 })
    return this
  }

  async clickAddAccountButton(): Promise<this> {
    await this.addAccountButton.click()
    return this
  }

  async checkLogoutButton(Value: string): Promise<this> {
    await this.logoutButton.isVisible({ timeout: 15000 });
    await expect(this.logoutButton).toHaveText(Value, { timeout: 15000 })
    return this
  }

  async clickLogoutButton(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page)
  }
}
