import { test, expect } from "@playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

// helper pro login
async function login(request: any): Promise<string> {
  const response = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login",
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: process.env.USERNAME!,
        password: process.env.PASSWORD!,
      },
    }
  );

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body).toHaveProperty("access_token");

  return body.access_token;
}

test.skip("vytvoření účtu přes API", async ({ request }) => {
  // 1️⃣ login
  const token = await login(request);
  console.log("✅ Přihlášeno, access_token:", token.substring(0, 20) + "...");

  // 2️⃣ vytvoření účtu
  const createResponse = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/accounts/create",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        startBalance: -5500.30,
        type: "Current",
      },
    }
  );

  console.log("Status:", createResponse.status());
  const accountBody = await createResponse.json();
  console.log("Response:", accountBody);

  // 3️⃣ ověření
  expect(createResponse.status()).toBe(201);
  expect(accountBody).toHaveProperty("accountNumber");
  expect(accountBody).toHaveProperty("accountType", "Current");
  expect(accountBody).toHaveProperty("balance", -5500.30);
  expect(accountBody).toHaveProperty("status", "Active");
});