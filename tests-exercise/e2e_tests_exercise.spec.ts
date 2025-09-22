import { test } from "@playwright/test";
import { LoginPage } from "../src/pages/login_page";
import { fakerCS_CZ as faker } from "@faker-js/faker";

test.describe("e2e test - from registration to logout", () => {
  // const username = process.env.USERNAME;
  // const password = process.env.PASSWORD;
  const username = faker.internet.username();
  const password = faker.internet.password();
  const email = faker.internet.exampleEmail();

  test("login env", async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .openTegbFrontend()
      .then((login) => login.checkLoginFormIsVisible())
      // .then((login) => login.env.USERNAME)
      // .then((login) => login.env.PASSWORD)
      .then((login) => login.clickLoginButton())
  })

  test("registration faker", async ({page}) => {
    const loginPage = new LoginPage(page);

     await loginPage
      .openTegbFrontend()
      .then((login) => login.checkLoginFormIsVisible())
      .then((login) => login.clickRegistrationButton())
      .then((registration) => registration.fillUsername(username))
      .then((registration) => registration.fillPassword(password))
      .then((registration) => registration.fillEmail(email))
      // .then((registration) => registration.clickRegistrationConfirmButton())
  })

  test("login faker", async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .openTegbFrontend()
      .then((login) => login.checkLoginFormIsVisible())
      .then((login) => login.fillUsername(username))
      .then((login) => login.fillPassword(password))
      .then((login) => login.clickLoginButton())
  });

  test("edit profile", async ({page}) => {
    const loginPage = new LoginPage(page);

    const firstname = "firstname11"
    const surname = "surname11"
    const email = "email11@test.cz"
    const phone = "777222111"
    const age = "51"

    await loginPage
      .openTegbFrontend()
      .then((login) => login.checkLoginFormIsVisible())
      .then((login) => login.fillUsername("patrik.kolen"))
      .then((login) => login.fillPassword("Playwirght_Certifikace"))
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
