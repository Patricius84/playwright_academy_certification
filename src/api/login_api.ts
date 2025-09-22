import { APIRequestContext, expect } from "@playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

export async function login(request: APIRequestContext, username: string, password: string): Promise<string> {
  const response = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login",
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        password: password,
      },
    }
  );

  // check status
  expect(response.status()).toBe(201);

  // check token
  const body = await response.json();
  expect(body).toHaveProperty("access_token");

  return body.access_token;}
