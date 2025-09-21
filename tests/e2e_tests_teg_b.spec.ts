import { test } from "@playwright/test";
import { LoginPage } from "../src/pages/login_page";
import { fakerEN as faker } from "@faker-js/faker";

test.describe.serial("e2e test - from registration to profile update", () => {
  const firstname = faker.person.firstName()
  const surname = faker.person.lastName();
  const randomNumber = faker.number.int({ max: 99 });
  const phone = faker.number.int({ min: 777000001, max: 777999999 }).toString()
  const age = faker.number.int({ min: 18, max: 59 }).toString()
  const username = firstname + " " + surname;
  const password = faker.internet.password();
  const email = firstname + "." + surname + randomNumber + "@examle.net"

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .openTegbFrontend()
  });

  test("registration for new user and check success message", async ({ page }) => {
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
  });

  test("create new account by API request", async ({ page }) => {
    // in progress
  });

  test("check new account and logout", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .checkLoginFormIsVisible()
      .then((login) => login.fillUsername(username))
      .then((login) => login.fillPassword(password))
      .then((login) => login.clickLoginButton())
      .then((profile) => profile.checkProfileDetailIsVisible())
      // in progress
      .then((profile) => profile.clickLogoutButton())
      .then((login) => login.checkLoginFormIsVisible())
  });

  test("fill out user's profile and logout", async ({ page }) => {
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
