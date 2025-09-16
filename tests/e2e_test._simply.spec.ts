import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/pages/login_page";

test.describe("e2e test - from registration to logout", () => {
  test("test", async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .openTegbFrontend()
      .then((login) => login.fillUsername("patrik.kolen"))
      .then((login) => login.fillPassword("Playwright_Certifikace"))
      .then((login) => login.clickLoginButton());
  });
})
