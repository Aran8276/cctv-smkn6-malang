import { NextRequest, NextResponse } from "next/server";

const AUTH_ME_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`;

export async function middleware(req: NextRequest) {
  const basicAuthUser = process.env.BASIC_AUTH_USER;
  const basicAuthPass = process.env.BASIC_AUTH_PASSWORD;

  if (basicAuthUser && basicAuthPass) {
    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      const auth = authHeader.split(" ")[1];
      const [user, pass] = Buffer.from(auth, "base64").toString().split(":");

      if (user !== basicAuthUser || pass !== basicAuthPass) {
        return new Response("Authentication required.", {
          status: 401,
          headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
        });
      }
    } else {
      return new Response("Authentication required.", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
      });
    }
  } else {
    console.warn(
      "Basic Auth credentials are not set in environment variables. Bypassing basic auth."
    );
  }

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  try {
    const response = await fetch(AUTH_ME_URL, {
      headers: {
        Cookie: req.headers.get("Cookie") || "",
      },

      cache: "no-store",
    });

    if (response.status === 401) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    console.error("Middleware auth check failed:", error);

    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * This is much more efficient than matching all paths.
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
