import { test } from "@playwright/test";
import { fakerEN as faker } from "@faker-js/faker";
import { LoginPage } from "../src/pages/login_page";
import accountAmountData from "../src/assets/ddt/account_amounts.json";
import { createAccountViaAPI } from "../src/api/add_account_api";

test.describe("data driven tests - check account amounts", () => {
  accountAmountData.forEach((item, index) => {
    const { firstname, surname, accountType, balance } = item;

    test(`${index + 1}. DDT: for user ${firstname} ${surname} create account ${accountType} with balance ${balance}`, async ({ page, request }) => {
        const randomNumber1 = faker.number.int({ min: 11, max: 99 });
        const randomNumber2 = faker.number.int({ min: 11, max: 99 });
        const username = firstname + "." + surname + randomNumber1;
        const password = faker.internet.password();
        const email = firstname + "." + surname + randomNumber2 + "@examle.net";

        console.log("login:", username,",", password);

      const loginPage = new LoginPage(page);

      await loginPage
        .openTegbFrontend()
        .then((login) => login.checkLoginFormIsVisible())
        .then((login) => login.clickRegistrationButton())
        .then((registration) => registration.fillUsername(username))
        .then((registration) => registration.fillPassword(password))
        .then((registration) => registration.fillEmail(email))
        .then((registration) => registration.clickRegistrationConfirmButton())
        .then((login) => login.checkLoginFormIsVisible())
        .then((login) => login.checkRegistrationSuccessMessageIsVisible())
        .then((login) => login.checkRegistrationSuccessMessageText())
        .then((login) => login.fillUsername(username))
        .then((login) => login.fillPassword(password))
        .then((login) => login.clickLoginButton())
        .then((login) => login.checkProfileDetailIsVisible());

        const account = await createAccountViaAPI(request, username, password, accountType, balance);

        if (balance > 99_999_999.99 || balance < -99_999_999.99) {
        // invalid balance - unsuccess expected
            console.log("Account creation failed due to invalid balance");
        } else {
        // valid balance 
            console.log("account created:", username,",", account.accountNumber,",", account.balance,",", account.accountType);
        }
    });
  });
});
