import { APIRequestContext, expect } from "@playwright/test";
import { login } from "../api/login_api";

export async function createAccountViaAPI(request: APIRequestContext, username: string, password: string, accountType: string, balanceValue: number) {
  // login
  const token = await login(request, username, password);
  console.log("logged in, access_token:", token.substring(0, 20) + "...");

  // create account
  const createResponse = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/accounts/create",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        startBalance: balanceValue,
        type: accountType,
      },
    }
  );
  /*
  console.log("Status:", createResponse.status());
  const accountBody = await createResponse.json();
  console.log("Response:", accountBody);

  // check properrties and values
  expect(createResponse.status()).toBe(201);
  expect(accountBody).toHaveProperty("accountNumber");
  expect(accountBody).toHaveProperty("accountType", accountType);
  expect(accountBody).toHaveProperty("balance", balanceValue);
  expect(accountBody).toHaveProperty("status", "Active");

  return accountBody;
  */

  console.log("Status:", createResponse.status());

  if (balanceValue > 99_999_999.99 || balanceValue < -99_999_999.99) {
    // invalid balance - unsuccess expected
    expect(createResponse.status()).toBeGreaterThanOrEqual(400);

    const errorBody = await createResponse.json();
    console.log("Account creation failed as expected:", errorBody);

    return errorBody;
  } else {
    // valid balance - success expected 
    const accountBody = await createResponse.json();
    console.log("Account created:", accountBody);

    expect(createResponse.status()).toBe(201);
    expect(accountBody).toHaveProperty("accountNumber");
    expect(accountBody).toHaveProperty("accountType", accountType);
    expect(accountBody).toHaveProperty("balance", balanceValue);
    expect(accountBody).toHaveProperty("status", "Active");

    return accountBody;
   }
}