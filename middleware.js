// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Protect all routes except login, register and api/auth routes
export async function middleware(req) {
  // Paths that don't require authentication
  if (req.nextUrl.pathname.startsWith('/login') || 
      req.nextUrl.pathname.startsWith('/register') ||
      req.nextUrl.pathname.startsWith('/api/auth') ||
      req.nextUrl.pathname.startsWith('/_next') ||
      req.nextUrl.pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  // Get token from request
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET || "default_secret_for_dev" 
  });

  // If no token and not on login/register pages, redirect to login
  if (!token && !req.nextUrl.pathname.startsWith('/login') && !req.nextUrl.pathname.startsWith('/register')) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If there is a token and on login/register pages, redirect to home
  if (token && (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register'))) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};