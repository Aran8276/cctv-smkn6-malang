import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const basicAuthUser = process.env.BASIC_AUTH_USER;
  const basicAuthPass = process.env.BASIC_AUTH_PASSWORD;

  if (!basicAuthUser || !basicAuthPass) {
    console.warn(
      "Basic Auth credentials are not set in environment variables. Bypassing auth."
    );
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const auth = authHeader.split(" ")[1];
    const [user, pass] = Buffer.from(auth, "base64").toString().split(":");

    if (user === basicAuthUser && pass === basicAuthPass) {
      return NextResponse.next();
    }
  }

  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/:path*"],
};
