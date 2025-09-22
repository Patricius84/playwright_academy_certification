import { test } from "@playwright/test";
import { LoginPage } from "../src/pages/login_page";
import { ProfileDetailPage } from "../src/pages/profile_detail_page";
import * as dotenv from 'dotenv';
dotenv.config();

test.describe("atomic tests for dashboard", () => {
  const username = process.env.USERNAME2!;
  const password = process.env.PASSWORD2!;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
    .openTegbFrontend()
      .then((login) => login.checkLoginFormIsVisible())
      .then((login) => login.fillUsername(username))
      .then((login) => login.fillPassword(password))
      .then((login) => login.clickLoginButton())
      .then((profile) => profile.checkProfileDetailIsVisible())
  });

  test("check page header", async ({ page }) => {
    const profilePage = new ProfileDetailPage(page);
    
    await profilePage
      .checkProfileDetailIsVisible()
      .then((profile) => profile.checkPageHeaderLogo())
      .then((profile) => profile.checkPageHeaderText("TEG#B Dashboard"))
      .then((profile) => profile.checkLogoutButton("Odhlásit se"))
  });

  test("check left menu", async ({ page }) => {
    const profilePage = new ProfileDetailPage(page);
    
    await profilePage
      .checkProfileDetailIsVisible()
      .then((profile) => profile.checkDashboardSidebar())
      .then((profile) => profile.checkDashboardSidebarHome("Domů"))
      .then((profile) => profile.checkDashboardSidebarAccounts("Účty"))
      .then((profile) => profile.checkDashboardSidebarTransactions("Transakce"))
      .then((profile) => profile.checkDashboardSidebarSupport("Podpora"))
  });

  test("check profile", async ({ page }) => {
    const profilePage = new ProfileDetailPage(page);
    
    await profilePage
      .checkProfileDetailIsVisible()
      .then((profile) => profile.checkProfileDetailIsVisible())
      .then((profile) => profile.checkProfileDetailHeader("Detaily Profilu"))
      .then((profile) => profile.checkFirstnameField("Jméno:"))
      .then((profile) => profile.checkSurnameField("Příjmení:"))
      .then((profile) => profile.checkEmailField("Email:"))
      .then((profile) => profile.checkPhoneField("Telefon:"))
      .then((profile) => profile.checkAgeField("Věk:"))
      .then((profile) => profile.checkProfileDetailEditButton("Upravit profil"))
  });

  test("check accounts", async ({ page }) => {
    const profilePage = new ProfileDetailPage(page);
    
    await profilePage
      .checkProfileDetailIsVisible()
      .then((profile) => profile.checkProfileDetailIsVisible())
      .then((profile) => profile.checkAccountsDetailHeader("Účty"))
      .then((profile) => profile.checkAccountNumberColumnHeader("Číslo účtu"))
      .then((profile) => profile.checkBalanceColumnHeader("Zůstatek"))
      .then((profile) => profile.checkAccountTypeColumnHeader("Typ účtu"))
      .then((profile) => profile.checkAddAccountButton("Přidat účet"))
  })

  test("check functionality of buttons)", async ({ page }) => {
    const profilePage = new ProfileDetailPage(page);
    
    await profilePage
      .checkProfileDetailIsVisible()
      .then((profile) => profile.checkProfileDetailEditButton("Upravit profil"))
      .then((profile) => profile.clickProfileDetailEditButton())
      .then((editProfile) => editProfile.checkCancelChangesButton("Zrušit úpravy"))
      .then((editProfile) => editProfile.clickCancelChangesButton())
      .then((profile) => profile.checkProfileDetailEditButton("Upravit profil"))
      .then((profile) => profile.clickProfileDetailEditButton())
      .then((editProfile) => editProfile.checkSaveChangesButton("Uložit změny"))
      .then((editProfile) => editProfile.clickSaveChangesButton())
      .then((editProfile) => editProfile.checkProfileUpdatedsuccessfullyText())      
      .then((profile) => profile.checkProfileDetailEditButton("Upravit profil"))
      .then((profile) => profile.checkAddAccountButton("Přidat účet"))
      // .then((profile) => profile.clickAddAccountButton())
      // the button is inactive and click will not trigger any action 
      .then((profile) => profile.checkLogoutButton("Odhlásit se"))
      .then((profile) => profile.clickLogoutButton())
      .then((login) => login.checkLoginButton("Přihlásit se"))
      .then((login) => login.checkForgottenPasswordButton("Ztracené heslo"))
      .then((login) => login.clickForgottenPasswordButton())
      .then((login) => login.checkUsernameIsRequiredText("Uživatelské jméno je povinné"))
      .then((login) => login.checkPasswordIsRequiredText("Heslo je povinné"))
      .then((login) => login.checkRegistrationButton("Registruj se"))
      .then((login) => login.clickRegistrationButton())
      // .then((registration) => registration.clickRegistrationConfirmButton())
      // creating a new registration is an invasive change
      .then((registration) => registration.checkBackToLoginButton("Zpět na přihlášení"))
      .then((registration) => registration.clickBackToLoginButton())
      .then((login) => login.checkLoginButton("Přihlásit se"))
  });
})
