import { serverApi } from '@/shared/lib/api/serverApi';
import { NextRequest, NextResponse } from 'next/server';

/**
 * BFF (Backend For Frontend) 전용 프록시 핸들러
 * [핵심 역할]
 * 1. 클라이언트의 요청을 백엔드 API 서버로 중계합니다.
 * 2. 미들웨어에서 주입된 인증 헤더(Authorization)를 백엔드로 전달합니다.
 * 3. 클라이언트 코드에 백엔드 주소를 노출하지 않고 보안(CORS, Token)을 강화합니다.
 */
async function proxyHandler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  // 1. 동적 경로(Catch-all segments)를 추출하여 백엔드 엔드포인트 구성
  const pathList = (await params).path;
  const targetPath = `/${pathList.join('/')}${req.nextUrl.search}`;
  try {
    // Content-Type 헤더 전달 (multipart/form-data의 boundary 정보 포함)
    const contentType = req.headers.get('Content-Type');
    const headers: HeadersInit = {};
    if (contentType) {
      headers['Content-Type'] = contentType;
    }

    const data = await serverApi(targetPath, {
      method: req.method,
      headers,
      // GET이 아닐 때만 body 전달
      body:
        req.method !== 'GET' && req.method !== 'HEAD' ? await req.blob() : null,
    });
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('BFF 에러 발생:', error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: (error as Error).message.includes('Unauthorized') ? 401 : 500 }
    );
  }
}

export const GET = proxyHandler;
export const POST = proxyHandler;
export const PUT = proxyHandler;
export const DELETE = proxyHandler;
export const PATCH = proxyHandler;
