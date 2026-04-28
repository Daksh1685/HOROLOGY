import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('horology_auth');
  const { pathname } = request.nextUrl;

  // Define protected paths (require login)
  const protectedPaths = ['/profile', '/collection'];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  // If path is protected and no auth cookie, redirect to login with callbackUrl
  if (isProtectedPath && !authCookie) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // If path is login/signup and auth cookie exists, redirect to collection
  if ((pathname === '/login' || pathname === '/signup') && authCookie) {
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl') || '/collection';
    return NextResponse.redirect(new URL(callbackUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/collection/:path*',
    '/login',
    '/signup',
  ],
};
