import { jwtVerify, importJWK } from "jose";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  try {
    // Get token from cookies browser
    let token = request.cookies.get("token");

    // Decode token
    const secretJWK = {
      kty: "oct",
      k: process.env.JOSE_SECRET, // Replace with your actual base64 encoded secret key
    };

    const secretKey = await importJWK(secretJWK, "HS256");
    const { payload } = await jwtVerify(token.value, secretKey);

    if (payload.email !== "test.com") {
      throw new Error("Incorrect token");
    }

    // Attech data with middleware
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user", JSON.stringify({ email: payload.email }));

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error) {
    console.log("error", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/manage/blog/:path*",
};
