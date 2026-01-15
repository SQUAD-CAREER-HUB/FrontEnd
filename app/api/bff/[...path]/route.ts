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
    // 서버 사이드 API 호출 (백엔드 서버로 요청 중계)
    const response = await serverApi(targetPath, {
      method: req.method,
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

    /**
     * HTTP 204 No Content 특수 처리 (에러 방지 핵심)
     * Next.js의 NextResponse(Web Response API)는 204 상태 코드일 때
     * 아주 미세한 데이터(빈 문자열 "" 포함)라도 본문에 들어있으면 TypeError를 발생시킵니다.
     * 따라서 명시적으로 null을 전달하여 본문이 없음을 보장해야 서버 에러를 피할 수 있습니다.
     */
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 }); // 표준 준수
    }

    /**
     * 응답 본문 추출
     * .json() 대신 .text()를 사용하는 이유:
     * 백엔드가 200/201 OK를 주면서 본문을 비워뒀을 경우,
     * .json()은 즉시 파싱 에러를 내지만 .text()는 빈 문자열("")을 안전하게 반환합니다.
     */
    const rawData = await response.text();

    return new NextResponse(rawData, {
      status: response.status,
      headers: response.headers,
    });
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
