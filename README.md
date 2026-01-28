# Realteeth Frontend Assignment - Weather App

실시간 날씨 정보를 제공하는 Progressive Web App

## 🚀 프로젝트 실행 방법

### 설치

\`\`\`bash
npm install
\`\`\`

### 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성:
\`\`\`
VITE_OPENWEATHER_API_KEY=your_api_key_here
\`\`\`

### 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

### 프로덕션 빌드

\`\`\`bash
npm run build
npm run preview
\`\`\`

## 🎯 구현 기능

### 1. 날씨 정보 표시

- [ ] OpenWeatherMap API를 통한 실시간 날씨 데이터 조회
- [ ] 현재 기온, 최저/최고 기온 표시
- [ ] 시간대별 날씨 정보 제공

### 2. 위치 기반 서비스

- [ ] 앱 첫 진입 시 현재 위치 자동 감지
- [ ] Geolocation API 활용

### 3. 장소 검색

- [ ] 대한민국 행정구역(시/군/구/동) 검색
- [ ] 자동완성 기능
- [ ] 검색 결과 리스트 표시
- [ ] 정보 없는 경우 안내 메시지

### 4. 즐겨찾기

- [ ] 최대 6개 장소 즐겨찾기 추가/삭제
- [ ] 카드 UI 형태로 표시
- [ ] 장소 이름(별칭) 수정 기능
- [ ] 즐겨찾기 카드 클릭 시 상세 페이지 이동
- [ ] localStorage를 통한 데이터 영구 저장

## 🛠 기술 스택

### Core

- React 18
- TypeScript
- Vite

### Styling

- Emotion (CSS-in-JS)
- 반응형 디자인 (Mobile First)

### State Management

- Tanstack Query v5 (서버 상태)
- Zustand (클라이언트 상태)

### Architecture

- FSD (Feature Sliced Design)

### PWA

- vite-plugin-pwa
- Workbox

### API

- OpenWeatherMap API
- Geolocation API

### 배포

- Vercel

## 📁 프로젝트 구조 (FSD)

\`\`\`
src/
├── app/ # 앱 초기화, 프로바이더
├── pages/ # 페이지 컴포넌트
├── widgets/ # 복합 UI 블록
├── features/ # 사용자 기능
├── entities/ # 비즈니스 엔티티
├── shared/ # 공유 코드
└── data/ # 정적 데이터
\`\`\`

## 🎨 주요 기술적 의사결정

### 1. Emotion 선택 이유

- CSS-in-JS로 컴포넌트 기반 스타일링
- TypeScript와 완벽한 통합
- 동적 스타일링 용이

### 2. FSD 아키텍처 채택

- 명확한 계층 구조
- 확장성과 유지보수성
- 비즈니스 로직 분리

### 3. Tanstack Query 활용

- 서버 상태 관리 최적화
- 자동 캐싱 및 리페칭
- 로딩/에러 상태 관리

### 4. PWA 구현

- 오프라인 지원
- 앱과 같은 사용자 경험
- 홈 화면 추가 가능

## 🔗 배포 URL

- Production: [배포 후 URL 추가]

## 📝 라이선스

MIT
\`\`\`

## 환경 변수 파일 (.env.example)

```.env
# OpenWeatherMap API Key
VITE_OPENWEATHER_API_KEY=your_api_key_here

# API Base URL
VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
```

## Prettier 설정 (.prettierrc)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "avoid"
}
```
