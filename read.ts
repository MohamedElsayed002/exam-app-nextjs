import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { LOCALES, routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

// Define the public and auth pages
const authPages = ["/auth/login", "/auth/register", "/auth/recover-password"];
const publicPages = ["/dashboard", ...authPages];
const privatePages = ["/", "/quiz-history"];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null, // Allow only authenticated users
    },
    pages: {
      signIn: "/auth/login", // Redirect to login page
      error: "/auth/login", // Redirect on error
    },
  }
);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const isPublicPage = publicPages.some((path) => req.nextUrl.pathname.startsWith(path));
  const isAuthPage = authPages.some((path) => req.nextUrl.pathname.startsWith(path));
  const isPrivatePage = privatePages.some((path) => req.nextUrl.pathname.startsWith(path));

  if (isPublicPage) {
    // Redirect authenticated users from auth pages to the dashboard
    if (token && isAuthPage) {
      const redirectUrl = new URL("/", req.nextUrl.origin); // Redirect to `/` for logged-in users
      return NextResponse.redirect(redirectUrl);
    }

    // Allow access to public pages
    return handleI18nRouting(req);
  }

  if (isPrivatePage) {
    // Redirect unauthenticated users trying to access private pages
    if (!token) {
      const signInUrl = new URL("/auth/login", req.nextUrl.origin); // Redirect to `/auth/login`
      return NextResponse.redirect(signInUrl);
    }

    // Allow access to private pages if authenticated
    return (authMiddleware as any)(req);
  }

  // Default behavior: Handle internationalization or pass the request along
  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Match all routes except for static files and API
};
