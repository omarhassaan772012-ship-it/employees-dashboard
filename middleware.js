import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('dashboard_session')?.value;

  if (session !== 'authenticated') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/staff-dashboard/:path*',
};