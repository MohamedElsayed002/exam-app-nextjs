import {withAuth} from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
import { LOCALES, routing } from './i18n/routing';
import { getToken } from 'next-auth/jwt';

const authPages = ["/auth/login", "/auth/register", "/auth/recover-password"]
const publicPages = [ ...authPages];
const privatePages = ['/quiz-history']

 
const handleI18nRouting = createMiddleware(routing);
 
const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({token}) => token != null
    },
    pages: {
      signIn: '/auth/login'
    }
  }
);
 
export default async function middleware(req: NextRequest) {

  const token = await getToken({req})

  const publicPathnameRegex = RegExp(
    `^(/(${LOCALES.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );

  // const privatePathnameRegex = RegExp(
  //   `^(/(${LOCALES.join('|')}))?(${privatePages
  //     .flatMap((p) => (p === '/' ? ['', '/'] : p))
  //     .join('|')})/?$`,
  //   'i'
  // );

  const authPathnameRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${authPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  // const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname);
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname);


  if (isPublicPage) {
    // If they are authenticated and trying to access an auth page, redirect to dashboard
    if (token && isAuthPage) {
      const redirectUrl = new URL("/", req.nextUrl.origin);

      return handleI18nRouting(new NextRequest(redirectUrl, req));
    }

    // Otherwise, let them navigate
    return handleI18nRouting(req);
  } else {
    // If they are navigating to a private page, authenticate them first

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  }
}
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

// export default async function middleware(req: NextRequest) {
//   const token = await getToken({ req });
//   const publicPathnameRegex = RegExp(
//     `^(/(${LOCALES.join("|")}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
//     "i"
//   );
//   const authPathnameRegex = RegExp(
//     `^(/(${LOCALES.join("|")}))?(${authPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
//     "i"
//   );
//   const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
//   const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname);

//   // If the user is navigating to a public page check if they are authenticated or not
//   if (isPublicPage) {
//     // If they are authenticated and trying to access an auth page, redirect to dashboard
//     if (token && isAuthPage) {
//       const redirectUrl = new URL("/", req.nextUrl.origin);

//       return handleI18nRouting(new NextRequest(redirectUrl, req));
//     }

//     // Otherwise, let them navigate
//     return handleI18nRouting(req);
//   } else {
//     // If they are navigating to a private page, authenticate them first

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     return (authMiddleware as any)(req);
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };












// // middleware.ts

// import { withAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';

// export default withAuth(
//     function middleware(req) {
//         const { pathname } = req.nextUrl;
//         const token = req?.nextauth?.token;


//         // Prevent logged-in users from accessing auth pages
//         if (token && (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register'))) {
//             console.log('[Middleware] Redirecting logged-in user away from auth pages');
//             return NextResponse.redirect(new URL('/', req.url)); // Redirect to the homepage or another safe route
//         }

//         // Allow logged-out users to proceed to auth pages
//         if (!token && pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) {
//             console.log('[Middleware] Allowing access to auth/login');
//             return NextResponse.next();
//         }

//         const privateRoutes = ['/quiz-history','/']; // List of private routes
//         if (!token && privateRoutes.some((route) => pathname.startsWith(route))) {
//             console.log('[Middleware] Redirecting unauthenticated user from private route');
//             return NextResponse.redirect(new URL('/auth/login', req.url)); // Redirect to login page
//         }
        
//         const publicRoutes = ['/auth/login','/auth/register']; // List of public routes
//         if (publicRoutes.some((route) => pathname.startsWith(route))) {
//             console.log('[Middleware] Allowing access to public route');
//             return NextResponse.next();
//         }
//     },
//     {
//         // Ensure middleware only runs when necessary
//         callbacks: {
//             authorized: ({ token }) => {
//                 const isAuthorized = !!token;
//                 console.log(`[Middleware] User Authorized: ${isAuthorized}`);
//                 return true; // Allow middleware to handle logged-out and logged-in states
//             },
//         },
//     }
// );

// export const config = {
//     // Apply middleware to these paths
//     matcher: ['/auth/login', '/auth/register','/','/quiz-history'],
// };
