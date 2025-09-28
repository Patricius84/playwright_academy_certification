import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/login_page";
import * as dotenv from 'dotenv';
dotenv.config();

const formAriaSnapshot = `
- heading "Detaily Profilu" [level=2]
- button "Upravit profil"
- strong: "Jméno:"
- text: Patrik
- strong: "Příjmení:"
- text: Tester
- strong: "Email:"
- text: patricius99@test.cz
`

test.describe("visual tests - check filled in profile", () => {

  const username = process.env.USERNAME2!;
  const password = process.env.PASSWORD2!;

  test(`check filled in profile for user ${username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .openTegbFrontend()
      .then((login) => login.checkLoginFormIsVisible())
      .then((login) => login.fillUsername(username))
      .then((login) => login.fillPassword(password))
      .then((login) => login.clickLoginButton())
      .then((profile) => profile.checkProfileDetailIsVisible())

      // secondary check
      .then((profile) => profile.checkFormAriaSnapshot(formAriaSnapshot))

      // secondary check
      .then((profile) => profile.checkFullPageSnapshot())

      // primary check
      .then((profile) => profile.checkProfileFormSnapshot())
  })
});
