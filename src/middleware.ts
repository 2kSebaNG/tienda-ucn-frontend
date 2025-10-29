import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { getPublicRouteFromAdmin, isTokenExpired } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Define public routes (add more as needed)
  const publicRoutes = [
    "/",
    "/products",
    "/auth/login",
    "/auth/register",
    "/auth/verify-email",
    "/cart",
  ];

  const isPublicRoute =
    publicRoutes.includes(path) || path.startsWith("/products/product/");

  const isAuthRoute = path.startsWith("/auth/");
  const isAdminRoute = path.startsWith("/admin/");

  // User is authenticated
  if (token && !isTokenExpired(token)) {
    // Get user role from token
    const userRole = token.role as string | undefined;

    // Redirect authenticated users away from auth routes
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Redirect non-admin users away from admin routes
    if (isAdminRoute && userRole?.toLowerCase() !== "admin") {
      const publicRoute = getPublicRouteFromAdmin(path);
      return NextResponse.redirect(new URL(publicRoute, request.url));
    }

    // Allow access to other routes
    return NextResponse.next();
  }

  // User is not authenticated
  if (!isPublicRoute) {
    // Redirect unauthenticated users trying to access admin routes to public equivalent if possible
    if (isAdminRoute) {
      // Get the public route equivalent
      const publicRoute = getPublicRouteFromAdmin(path);

      // Check if the public route is a valid redirect
      const publicRoutesForRedirect = ["/", "/products"];
      const canRedirectToPublic =
        publicRoutesForRedirect.includes(publicRoute) ||
        publicRoute.startsWith("/products/product/");

      // If the public route is a valid redirect, perform the redirect
      if (canRedirectToPublic) {
        return NextResponse.redirect(new URL(publicRoute, request.url));
      }
    }

    // Redirect unauthenticated users to the home page if they try to access protected routes
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access to public routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
