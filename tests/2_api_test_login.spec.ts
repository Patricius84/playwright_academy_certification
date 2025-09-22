import { test, expect } from "@playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

test("login přes API - kontrola statusu a access token", async ({ request }) => {
  const response = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login",
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        
        username: process.env.USERNAME2!,
        password: process.env.PASSWORD2!,
      },
    }
  );
  
  // kontrola statusu 201
  expect(response.status()).toBe(201);

  // kontrola, že v body je token typu string
  const body = await response.json();
  expect(body).toHaveProperty("access_token");
  expect(typeof body.access_token).toBe("string");
});
