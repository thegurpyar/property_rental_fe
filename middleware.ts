import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // Only run this logic for routes starting with /admin
  if (pathname.startsWith('/admin')) {
    // 1. Check if token exists
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      // Optional: add a callback URL
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // 2. Decode the JWT payload to check for the 'admin' role
      // Next.js Middleware supports atob in the Edge Runtime
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) throw new Error('Invalid token format');
      
      const decodedPayload = JSON.parse(atob(payloadBase64));
      
      // 3. Verify the role is exactly 'admin'
      if (decodedPayload.role !== 'admin') {
        console.warn(`Unauthorized access attempt to ${pathname} by role: ${decodedPayload.role}`);
        // Redirect non-admin users to the home page or a 403 page
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      console.error('Middleware Auth Error:', error);
      // If the token is malformed or decoding fails, boot to login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Optimization: Only run middleware on /admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
