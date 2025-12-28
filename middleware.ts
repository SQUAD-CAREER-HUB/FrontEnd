import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (pathname === '/login') {
    if (refreshToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  }

  // 대시보드 보호
  if (pathname.startsWith('/dashboard')) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // matcher에서 /api/bff를 확실히 포함하거나,
  // 혹은 미들웨어가 불필요하게 API 요청을 건드리지 않도록 설정해야 합니다.
  matcher: ['/dashboard/:path*', '/login'],
};
