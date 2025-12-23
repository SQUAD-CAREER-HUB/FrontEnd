## Project Structure Guide

본 프로젝트는 Next.js App Router를 기반으로 하며, 확장성과 유지보수성을 위해 기능 단위(Feature-based) 설계를 따릅니다. 모든 코드는 "역할에 맞는 위치"에 작성하는 것을 원칙으로 합니다.

## 핵심 원칙

`app/`은 조립만 수행: 페이지 레이아웃과 데이터 흐름의 큰 틀만 잡고, 실제 로직은 `features/`에서 가져옵니다.

`features/` 중심 개발: 하나의 도메인(기능)에 필요한 컴포넌트, 훅, 서비스는 해당 기능 폴더 안에서 관리합니다.

`shared/`는 순수 공용 리소스: 특정 도메인에 종속되지 않고 프로젝트 전반에서 재사용되는 것만 위치합니다.

## 폴더 구조 상세 설명

1. `app/` (Routing & Assembly)

- 역할: URL 구조 정의 및 페이지 조립.
- 규칙:
  - 비즈니스 로직이나 복잡한 API 호출을 직접 작성하지 않습니다.
  - features/의 컴포넌트들을 가져와 배치하는 "컨테이너" 역할을 합니다.

2. `features/` (Core Logic)

- 역할: 실제 서비스 기능 구현의 핵심 단위.
- 구조: 기능별로 독립적인 생태계를 가집니다.

```Plaintext
features/calendar/
├── components/ # 해당 기능에서만 쓰이는 UI (예: CalendarHeader, EventItem)
├── hooks/ # 해당 기능 전용 상태 로직
├── services/ # 해당 기능 전용 API 호출 함수
└── types.ts # 해당 기능 전용 인터페이스/타입
```

3.  `shared/` (Common Resources)

- 역할: 프로젝트 전역에서 쓰이는 공용 자산.
- 세부 항목:
  - `components/`: 디자인 시스템 (Button, Input, Modal 등)
  - `styles/`: 전역 CSS, Tailwind 테마 설정 (theme.css)
  - `hooks/`: useBoolean, useInterval 등 범용 훅
  - `utils/`: 날짜 포맷팅, 숫자 계산 등 순수 함수
  - `types/`: 전역 공용 타입 및 API 응답 공통 규격
  - `constants/`: 에러 메시지, 환경 변수 키 등

4. 기타 폴더

- `lib/`: 외부 라이브러리 설정

- `services/`: (선택) 여러 feature에서 공통으로 쓰이는 범용 API 호출

- `store/`: 전역 상태 관리 (Zustand, Jotai 등)

## 코드 작성 가이드 (예시)

컴포넌트 생성 시

- 특정 페이지에서만 쓰이는가? → `features/{domain}/components/`

- 여러 페이지/기능에서 범용적으로 쓰이는가? → `shared/components/`

## 워크플로우 요약

- `shared/types` 또는 `features/domain/types`에 타입 정의

- `features/domain/services`에 API 함수 작성

- `features/domain/components`에 UI 및 로직 구현

- `app/domain/page.tsx`에서 최종 조립
