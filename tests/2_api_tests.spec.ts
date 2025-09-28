import { test, expect } from "@playwright/test";
import { login } from "../src/api/login_api";
import * as dotenv from 'dotenv';
dotenv.config();

test("API tests - login via API and check access token", async ({ request }) => {
  const username = process.env.USERNAME2!;
  const password = process.env.PASSWORD2!;

  const token = await login(request, username, password);

  expect(typeof token).toBe("string");
  expect(token.length).toBeGreaterThan(0);
});

// change for PR
