import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/pages/login_page";

test.describe("e2e test - from registration to logout", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .openTegbFrontend()
      .then((login) => login.fillUsername("patrik.kolen"))
      .then((login) => login.fillPassword("Playwright_Certifikace"))
      .then((login) => login.clickLoginButton());
  });

  test("registration and logout", async ({ page }) => {
    // in progress
  });

  test("create account by API", async ({ page }) => {
    // in progress
  });

  test("check new account", async ({ page }) => {
    // in progress
  });

  test("fill out user's profile", async ({ page }) => {
    // in progress
    // assert after save
  });
})
