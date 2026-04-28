import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('horology_auth');
  const { pathname } = request.nextUrl;

  // Public paths that don't require login
  const publicPaths = ['/', '/login', '/signup'];
  const isPublicPath = publicPaths.includes(pathname);

  // If not a public path and no auth cookie → redirect to login
  if (!isPublicPath && !authCookie) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // If already logged in and trying to access login/signup → redirect to collection
  if ((pathname === '/login' || pathname === '/signup') && authCookie) {
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl') || '/collection';
    return NextResponse.redirect(new URL(callbackUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files with extensions (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf)).*)',
  ],
};
