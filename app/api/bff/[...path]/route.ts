import { serverApi } from '@/shared/lib/api/serverApi';
import { NextRequest, NextResponse } from 'next/server';

/**
 * BFF (Backend For Frontend) 전용 프록시 핸들러
 * [주요 역할]
 * 1. 보안: 클라이언트 브라우저에 백엔드 실제 도메인을 노출하지 않습니다.
 * 2. 인증: 미들웨어 등을 통해 주입된 인증 정보(예: 쿠키, 토큰)를 안전하게 백엔드로 전달합니다.
 * 3. 호환성: 백엔드의 불완전한 응답(비어있는 Body 등)을 표준에 맞게 보정하여 클라이언트에 전달합니다.
 */
async function proxyHandler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const pathList = (await params).path;
  const targetPath = `/${pathList.join('/')}${req.nextUrl.search}`;
  try {
    // Content-Type 헤더 전달 (multipart/form-data 등 유지를 위해)
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
        req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : null,

      /**
       * duplex: 'half' 설정 (Node.js/Next.js 환경 필수)
       * fetch API에서 요청 본문을 스트림으로 보낼 때,
       * 읽기와 쓰기가 동시에 발생하는 'full duplex'가 아닌 'half duplex'임을 명시합니다.
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      duplex: 'half',
    });
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('BFF 에러 발생:', error);
    return NextResponse.json(
      { message: 'Internal BFF Server Error' },
      { status: 500 }
    );
  }
}

export const GET = proxyHandler;
export const POST = proxyHandler;
export const PUT = proxyHandler;
export const DELETE = proxyHandler;
export const PATCH = proxyHandler;
