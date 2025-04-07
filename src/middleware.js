// middleware.js
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();

  // Check if the request has a session cookie or token
  const token = req.cookies.get('auth_token'); // Replace 'auth_token' with your actual cookie name

  // If there's no token, redirect to login
  if (!token) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // If a token exists, verify it with your backend API
  try {
    const response = await fetch('http://localhost:4000/api/user/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const result = await response.json();

    // If token is invalid, redirect to login
    if (!result.success || !result.session) {
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/login';
        redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
      }
    }

    // If the user is signed in and trying to access login or signup, redirect to dashboard
    if (result.session && (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup'))) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/dashboard';
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.next();
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
