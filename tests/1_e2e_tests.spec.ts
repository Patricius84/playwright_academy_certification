import { test } from "@playwright/test";
import { fakerEN as faker } from "@faker-js/faker";
import { LoginPage } from "../src/pages/login_page";
import { createAccountViaAPI } from "../src/api/add_account_api";

test.describe.serial("e2e tests - register, login, create account and fill in profile", () => {
  const firstname = faker.person.firstName()
  const surname = faker.person.lastName();
  const randomNumber = faker.number.int({ max: 99 });
  const phone = faker.number.int({ min: 777000001, max: 777999999 }).toString()
  const age = faker.number.int({ min: 18, max: 59 }).toString()
  const username = firstname + "." + surname;
  const password = faker.internet.password();
  const email = firstname + "." + surname + randomNumber + "@examle.net";
  const balanceValue = faker.number.int({ min: 1001, max: 199999 })
  const balanceValueText = balanceValue.toString()
  const accountTypeOptions = ["Current", "Savings", "Term", "Loan", "Student", "Business"];
  const accountType = accountTypeOptions[Math.floor(Math.random() * accountTypeOptions.length)];

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .openTegbFrontend()
  });

  test("register new user and check success message", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .checkLoginFormIsVisible()
      .then((login) => login.clickRegistrationButton())
      .then((registration) => registration.fillUsername(username))
      .then((registration) => registration.fillPassword(password))
      .then((registration) => registration.fillEmail(email))
      .then((registration) => registration.clickRegistrationConfirmButton())
      .then((login) => login.checkLoginFormIsVisible())
      .then((login) => login.checkRegistrationSuccessMessageIsVisible())
      .then((login) => login.checkRegistrationSuccessMessageText())

      console.log("username:", username);
      console.log("password:", password);
  });

  test("create new account via API", async ({ request }) => {
    const account = await createAccountViaAPI(request, username, password, accountType, balanceValue);
    console.log("account created:", account.accountNumber);
  });

  test("check new account", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .checkLoginFormIsVisible()
      .then((login) => login.fillUsername(username))
      .then((login) => login.fillPassword(password))
      .then((login) => login.clickLoginButton())
      .then((profile) => profile.checkProfileDetailIsVisible())
      .then((profile) => profile.checkAccountNumberValue())
      .then((profile) => profile.checkBalanceValue(balanceValueText))
      .then((profile) => profile.checkBalanceCurrency("Kč"))
      .then((profile) => profile.checkAccountTypeValue(accountType))
      .then((profile) => profile.clickLogoutButton())
      .then((login) => login.checkLoginFormIsVisible())
  });

  test("fill in user's profile", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .checkLoginFormIsVisible()
      .then((login) => login.checkLoginFormIsVisible())
      .then((login) => login.fillUsername(username))
      .then((login) => login.fillPassword(password))
      .then((login) => login.clickLoginButton())
      .then((profile) => profile.checkProfileDetailIsVisible())
      .then((profile) => profile.clickProfileDetailEditButton())
      .then((profileEdit) => profileEdit.checkProfileDetailEditIsVisible())
      .then((profileEdit) => profileEdit.fillFirstname(firstname))
      .then((profileEdit) => profileEdit.fillSurname(surname))
      .then((profileEdit) => profileEdit.fillEmail(email))
      .then((profileEdit) => profileEdit.fillPhone(phone))
      .then((profileEdit) => profileEdit.fillAge(age))
      .then((profileEdit) => profileEdit.clickSaveChangesButton())
      .then((profile) => profile.checkProfileDetailIsVisible())
      .then((profile) => profile.checkProfileUpdatedsuccessfullyText())
      .then((profile) => profile.clickProfileDetailEditButton())
      .then((profileEdit) => profileEdit.checkProfileDetailEditIsVisible())
      .then((profileEdit) => profileEdit.fillFirstname(firstname))
      .then((profileEdit) => profileEdit.fillSurname(surname))
      .then((profileEdit) => profileEdit.fillEmail(email))
      .then((profileEdit) => profileEdit.fillPhone(phone))
      .then((profileEdit) => profileEdit.fillAge(age))
      .then((profileEdit) => profileEdit.clickSaveChangesButton())
      .then((profile) => profile.checkProfileUpdatedsuccessfullyText())
      .then((profile) => profile.checkProfileDetailIsVisible())
      .then((profile) => profile.checkFirstnameValue(firstname))
      .then((profile) => profile.checkSurnameValue(surname))
      .then((profile) => profile.checkEmailValue(email))
      .then((profile) => profile.checkPhoneValue(phone))
      .then((profile) => profile.checkAgeValue(age))
  });
})

// change for PR

