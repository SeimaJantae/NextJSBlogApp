"use server";

import { SignJWT, importJWK } from "jose";
import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export async function login(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "test.com" && password === "1234") {
      // Login pass
      // Create token with email
      const secretJWK = {
        kty: "oct",
        k: process.env.JOSE_SECRET, // Replace with your actual base64 encoded secret key
      };

      const secretKey = await importJWK(secretJWK, "HS256");
      const token = await new SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h") // Token expires in 1 hour
        .sign(secretKey);

      // set token in cookies browser
      cookies().set("token", token);
      //return { message: "Login success" };
      redirect("/manage/blog");
    } else {
      throw new Error("Incorrect email or password");
    }
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log("error", error);
    return { message: "Login fail" };
  }
}
