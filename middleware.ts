import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const supportedLocales = ["en", "fr"];
const defaultLocale = "en";

// Define public routes
const publicRoutes = [
  "/authentication/restpassword",
  "/authentication/forgetpassword",
  "/viaproxy/components/auth/forget-password",
  "/components/auth/forget-password",
  "/en/authentication/signin",
  "/en/authentication/forgotpassword",
  "/authentication/signin",
  "/authentication/signup",
  "/",
  "/authentication/login",
  "/authentication/register",
  "/authentication/forgotpassword",
  "/authentication/resetpassword",
  "/authentication/verify",
];

// Define role-based dashboard paths
const roleRedirects: Record<string, string> = {
  admin: "/dashboard/admin",
  student: "/dashboard/student",
  merchant: "/dashboard/merchant",
  trader: "/dashboard/trader",
  citizen: "/dashboard/citizen",
};

// Helper function to check if a route is public
const isPublicRoute = (path: string, locale: string) => {
  const currentPath = path.replace(`/${locale}`, "") || "/";
  return publicRoutes.includes(currentPath);
};

// Helper function to check if the route is within a user's dashboard
const isDashboardRoute = (path: string, role: string) => {
  console.log("Checking dashboard route for path:", path, "and role:", role);
  return path.startsWith(`/dashboard/${role}`);
};

export async function middleware(req: NextRequest) {
  console.log("Middleware triggered. Processing request:", req.nextUrl.href);

  const pathname = req.nextUrl.pathname;
  console.log("Request pathname:", pathname);

  // Skip static assets and API routes
  if (
    /\.(jpg|jpeg|png|gif|webp|svg|css|js|ico|woff|woff2|ttf|eot)$/.test(
      pathname
    ) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/")
  ) {
    console.log("Skipping static asset or API route:", pathname);
    return NextResponse.next();
  }

  const token = req.cookies.get("authToken")?.value;
  console.log("Auth token retrieved:", token ? "Token found" : "No token");

  const localeFromPath = pathname.split("/")[1];
  console.log("Locale extracted from path:", localeFromPath || "None");

  const localeFromCookie = req.cookies.get("NEXT_LOCALE")?.value;
  console.log("Locale extracted from cookie:", localeFromCookie || "None");

  const localeFromHeader = req.headers
    .get("accept-language")
    ?.split(",")[0]
    ?.split("-")[0];
  console.log("Locale extracted from header:", localeFromHeader || "None");

  // Determine the locale to use
  const local = supportedLocales.includes(localeFromPath)
    ? localeFromPath
    : supportedLocales.includes(localeFromCookie ? localeFromCookie : "")
    ? localeFromCookie
    : supportedLocales.includes(localeFromHeader ? localeFromHeader : "")
    ? localeFromHeader
    : defaultLocale;
  const locale = local ? local : "";
  console.log("Final locale determined:", locale);

  const nextUrl = req.nextUrl.clone();

  // Redirect root "/" to "/{locale}"
  if (pathname === "/") {
    console.log("Root path detected. Redirecting to:", `/${locale}`);
    nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(nextUrl);
  }

  // Redirect if locale is missing
  if (!supportedLocales.includes(localeFromPath)) {
    console.log(
      "Locale missing in path. Redirecting to:",
      `/${locale}${pathname}`
    );
    nextUrl.pathname = `/${locale}${pathname}`;
    const response = NextResponse.redirect(nextUrl);

    // Ensure the locale value is always a string
    response.cookies.set("NEXT_LOCALE", locale || defaultLocale, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    console.log("Locale cookie set to:", locale || defaultLocale);
    return response;
  }

  // if (!supportedLocales.includes(localeFromPath)) {
  //   console.log(
  //     "Locale missing in path. Redirecting to:",
  //     `/${locale}${pathname}`
  //   );
  //   nextUrl.pathname = `/${locale}${pathname}`;
  //   const response = NextResponse.redirect(nextUrl);
  //   response.cookies.set("NEXT_LOCALE", locale, {
  //     httpOnly: false,
  //     secure: process.env.NODE_ENV === "production",
  //     path: "/",
  //   });
  //   console.log("Locale cookie set to:", locale);
  //   return response;
  // }

  // Add locale to headers for `next-intl`
  const response = NextResponse.next();
  response.headers.set("X-NEXT-INTL-LOCALE", locale ? locale : "");
  console.log("Locale header added:", locale);

  // Check if the route is public
  if (isPublicRoute(pathname, locale)) {
    console.log("Public route detected. Allowing access:", pathname);
    return response;
  }

  // Redirect to login if no token
  if (!token) {
    console.log(
      "No token found. Redirecting to login:",
      `/${locale}/authentication/login`
    );
    nextUrl.pathname = `/${locale}/authentication/login`;
    return NextResponse.redirect(nextUrl);
  }

  // Verify token and handle role-based redirection
  try {
    console.log("Verifying auth token...");
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log("Token verified successfully. Payload:", payload);

    const userRole = payload.role;
    console.log("User role extracted from token:", userRole);

    // Skip middleware for valid dashboard routes
    if (isDashboardRoute(pathname, userRole as string)) {
      console.log(
        "User navigating within their dashboard. Allowing access:",
        pathname
      );
      return response;
    }

    // Restrict access to other dashboards based on role
    if (roleRedirects[userRole as string]) {
      const allowedPath = `${roleRedirects[userRole as string]}`;
      const rolePath = `/${locale}${allowedPath}`;
      if (!pathname.startsWith(rolePath)) {
        console.log(
          `Unauthorized access attempt by ${userRole}. Redirecting to their dashboard:`,
          rolePath
        );
        nextUrl.pathname = rolePath;
        return NextResponse.redirect(nextUrl);
      }
    }

    return response;
  } catch (error) {
    console.error(
      "Token verification failed. Redirecting to login. Error:",
      error
    );
    nextUrl.pathname = `/${locale}/authentication/login`;
    return NextResponse.redirect(nextUrl);
  }
}

export const config = {
  matcher: [
    // Match all routes except those explicitly excluded
    "/((?!_next/static|_next/image|favicon.ico|api/|/en/authetication/login|/en/dashboard/student/message|/en/dashboard/student/exchanges/productforproduct|/en/dashboard/student/exchanges/productforservice|/en/dashboard/student/exchanges/productforservice|/en/dashboard/student/howitworks|/en/dashboard/student/exchanges/serviceforproduct|/en/dashboard/student/blog|/en/authentication/signup|/en/authentication/signin|/en/authentication/signin|/en/authentication/forgetpassword|/en/authentication/signup|/en/dashboard/student/exchanges/myexchanges|dashboard/:path*).*)",
    // Explicitly include the dashboard base routes for authentication handling
    "/dashboard",
  ],
};
