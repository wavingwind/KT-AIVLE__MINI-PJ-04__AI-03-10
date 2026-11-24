# AIVLE BOOKS (도서 관리 + AI 표지 생성 플랫폼)

> **KT AIVLE School AI트랙 03반 10조 — Mini Project 04**  
> React + Vite 기반의 도서 관리(CRUD) 및 OpenAI 이미지 생성 API를 활용한 맞춤형 도서 표지 생성 웹 애플리케이션입니다.

---

## 팀원 및 역할 분담 (R&R)

| 이름 | 역할 | 주요 담당 업무 |
| :--- | :--- | :--- |
| **양준원** | 조장 / UI · 레이아웃 | 공통 레이아웃(Header, Footer), 메인 목록 화면(Main, GenreSection, BookCard), <br/> 장르별 가로 스크롤 및 호버 오버레이 |
| **서승준** | 발표 · 문서 / 통합 테스트(QA) | 도서목록페이지, 검색페이지 |
| **남도현** | CRUD 연동 | `json-server` 기반 REST API 연동(조회·등록·수정·삭제) |
| **남건우** | OpenAI 연동 / 검토 | OpenAI Image API 연동 및 표지이미지 생성 기능, 선택 버튼 UI(SelectButton), 코드 리뷰 |
| **이은수** | PM · 기획 | 도서 상세 페이지, `README.md` 작성 |

---

## 기술 스택 (Tech Stack)

- **Frontend:** React (Vite), JavaScript (ES6+), CSS3
- **Routing:** React Router (`react-router-dom`)
- **Mock Backend:** `json-server` (`db.json`)
- **AI API:** OpenAI Image Generation API (`gpt-image-2` / `b64_json` Data URL 변환)

---

## 📂 프로젝트 폴더 구조

```text
KT-AIVLE__MINI-PJ-04__AI-03-10/
├── README.md
└── aivlebooks/                     # React 메인 프로젝트 폴더
    ├── db.json                     # 도서 데이터 저장용 Mock DB
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    │   └── icons/                  # UI 아이콘 (좋아요, 수정, 삭제, 저장 등)
    └── src/
        ├── api/
        │   ├── bookApi.js          # 도서 CRUD REST API 호출 모듈
        │   └── bookcoverApi.js     # OpenAI API 기반 도서 표지 생성 모듈
        ├── components/             # 재사용 UI 컴포넌트
        │   ├── BookCard.jsx        # 도서 카드 및 호버 상세 정보 오버레이
        │   ├── BookForm.jsx        # 도서 등록/수정 공통 폼
        │   ├── Button.jsx          # 공통 버튼 컴포넌트
        │   ├── Footer.jsx          # 하단 푸터
        │   ├── GenreSection.jsx    # 장르별 도서 가로 리스트 섹션
        │   ├── Header.jsx          # 상단 고정 네비게이션 및 카테고리 필터
        │   ├── Input.jsx           # 공통 입력창 컴포넌트
        │   ├── Main.jsx            # 메인 도서 목록 컨테이너
        │   └── SelectButton.jsx    # 장르 선택 버튼 컴포넌트
        ├── pages/                  # 라우팅 페이지 컴포넌트
        │   ├── BookCreatePage.jsx  # 신규 도서 등록 페이지
        │   ├── BookDetailPage.jsx  # 도서 상세 조회, 삭제 및 AI 표지 생성 페이지
        │   ├── BookEditPage.jsx    # 도서 정보 수정 페이지
        │   ├── MyPage.jsx          # 마이페이지 (찜/관심 도서 조회)
        │   └── Search.jsx          # 도서 검색 페이지
        ├── App.jsx                 # 전역 라우팅 및 상태 관리
        ├── App.css
        ├── index.css
        └── main.jsx
```

---

## 3. 🧩 컴포넌트 명세서 (업데이트)

### ① 공통 및 UI 컴포넌트 (`src/components/`)

| 컴포넌트명 | 사용 위치 | 설명 | 담당 역할 |
| :--- | :--- | :--- | :--- |
| **`Header`** | 공통 레이아웃 (전체 페이지) | 상단 네비게이션 (홈 이동 로고, 장르 카테고리 필터, 검색/마이페이지/도서 등록 이동 버튼) | UI · 레이아웃 담당 |
| **`Footer`** | 공통 레이아웃 (전체 페이지) | 하단 고정 영역 (서비스 소개 및 저작권 정적 하드코딩) | UI · 레이아웃 담당 |
| **`Main`** | 메인 목록 페이지 (`/`) | 전체 도서 데이터를 장르별로 그룹화하여 `GenreSection` 목록을 렌더링하는 컨테이너 | UI · 레이아웃 담당 |
| **`GenreSection`** | `Main` 내부 | 장르(`category`)별 상단 헤더(장르명, 권수)와 `BookCard` 가로 리스트 섹션 묶음 | UI · 레이아웃 담당 |
| **`BookCard`** | `GenreSection`, `Search`, `MyPage` | 도서 1권 요약 카드 (표지, 카테고리, 제목, 좋아요 상태 및 호버 시 줄거리 오버레이 / 클릭 시 상세 이동) | UI · 레이아웃 담당 |
| **`BookForm`** | `BookCreatePage`, `BookEditPage` | 도서 등록·수정 공용 입력 폼 (`SelectButton`, `Input`, 줄거리 입력창 및 유효성 검사 포함) | CRUD 연동 담당 |
| **`Button`** | 공통 UI (전체 페이지) | 등록, 수정, 삭제, AI 표지 생성 등 공용 액션 버튼 | UI · 레이아웃 담당 |
| **`SelectButton`** | `BookForm` | 도서 장르(`category`) 선택용 버튼/드롭다운 컴포넌트 | OpenAI 연동 / 검토 담당 |
| **`Input`** | `BookForm`, `BookDetailPage`, `Search` | 제목, 저자, 검색어, OpenAI API Key 등 공용 텍스트 입력 컴포넌트 | UI · 레이아웃 담당 |

### ② 페이지 컴포넌트 및 라우팅 (`src/pages/`)

| 페이지명 | 경로 (Route) | 설명 | 담당 역할 |
| :--- | :--- | :--- | :--- |
| **`Main` (도서 목록)** | `/` | 메인 도서 목록 페이지 (전체 도서 조회 `GET /books` 및 장르별 섹션 렌더링) | UI · 레이아웃 담당 / 발표 담당 |
| **`BookCreatePage`** | `/books/new` | 신규 도서 등록 페이지 (`BookForm` 기반 입력 및 `POST /books` 연동) | CRUD 연동 담당 |
| **`BookDetailPage`** | `/books/:id` | 도서 상세 조회 페이지 (`GET /books/:id`, AI 표지 생성/재생성 `PATCH`, 도서 삭제 `DELETE`) | PM · 기획 / 서기 & OpenAI 연동 담당 |
| **`BookEditPage`** | `/books/:id/edit` | 기존 도서 정보 수정 페이지 (기존 데이터 로드 및 `PATCH /books/:id` 반영) | CRUD 연동 담당 |
| **`Search`** | `/search` | 키워드 기반 도서 검색 및 결과 카드 조회 페이지 | UI · 레이아웃 / 통합 테스트 |
| **`MyPage`** | `/mypage` | 관심 도서(좋아요) 보관함 조회 페이지 | PM · 기획 / 서기 |

---

## 4. 🔌 API 명세서

### ① API 엔드포인트 명세서 (`json-server` & OpenAI API)
- **로컬 Mock 서버 기본 주소:** `http://localhost:3000`
- **외부 AI 이미지 생성 주소:** `https://api.openai.com/v1/images/generations`

| 기능 | 대상 서버 | Method | Endpoint | 요청 데이터 (Body) / 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **전체 도서 목록 조회** | `json-server` | `GET` | `/books` | 전체 도서 배열 반환 후 프론트에서 `category`별 그룹핑 렌더링 |
| **신규 도서 등록** | `json-server` | `POST` | `/books` | `{ title, author, category, content, coverImageUrl, isLiked, createdAt, updatedAt }` |
| **도서 상세 정보 조회** | `json-server` | `GET` | `/books/:id` | 특정 `id`의 도서 객체 1건 반환 |
| **도서 정보 수정** | `json-server` | `PATCH` | `/books/:id` | `{ title, author, category, content, updatedAt }` |
| **도서 삭제** | `json-server` | `DELETE` | `/books/:id` | 특정 `id`의 도서 데이터 삭제 |
| **AI 표지 이미지 생성** | OpenAI API | `POST` | `/v1/images/generations` | `{ model: "gpt-image-2", prompt, size: "1024x1536", output_format: "png" }` → `b64_json` 응답 |
| **AI 표지 이미지 업데이트** | `json-server` | `PATCH` | `/books/:id` | `{ coverImageUrl: "data:image/png;base64,...", updatedAt }` (Data URL 변환 후 저장) |
| **좋아요 상태 변경** | `json-server` | `PATCH` | `/books/:id` | `{ isLiked: boolean }` (관심 도서 토글 반영) |

---

## 로컬 실행 방법

프로젝트 실행을 위해 **Mock API 서버(`json-server`)**와 **프론트엔드 개발 서버(`Vite`)**를 각각 실행해야 합니다.

### 1. 저장소 클론 및 프로젝트 폴더 이동
```bash
git clone [https://github.com/wavingwind/KT-AIVLE__MINI-PJ-04__AI-03-10.git](https://github.com/wavingwind/KT-AIVLE__MINI-PJ-04__AI-03-10.git)
cd KT-AIVLE__MINI-PJ-04__AI-03-10/aivlebooks
```

### 2. 패키지 설치
```bash
npm install
```

### 3. Mock API 서버 실행 (터미널 1)
`aivlebooks` 폴더 경로에서 `db.json`을 기반으로 `3000`번 포트에서 서버를 실행합니다.
```bash
npx json-server@0.17.4 --watch db.json --port 3000
```

### 4. 프론트엔드 개발 서버 실행 (터미널 2)
새 터미널을 열어 `aivlebooks` 폴더로 이동한 뒤 개발 서버를 실행합니다.
```bash
npm run dev
```
- 브라우저에서 터미널에 출력된 로컬 주소(기본값: `http://localhost:5173`)로 접속합니다.

---

## 주요 기능

1. **도서 목록 조회 및 장르별 탐색 (`Main`, `GenreSection`)**
   - 장르별로 도서를 그룹화하여 가로 스크롤 리스트 및 넘김 버튼 제공
   - 도서 표지 마우스 호버(Hover) 시 저자, 출판사, 줄거리 요약 오버레이 표시
   - 상단 카테고리 필터 및 검색(`Search`)을 통한 도서 탐색
2. **도서 등록 · 상세 조회 · 수정 · 삭제 (`CRUD`)**
   - `json-server` REST API(`GET`, `POST`, `PATCH`, `DELETE`)를 활용한 실시간 데이터 연동
3. **AI 도서 표지 생성 및 즉시 반영 (`BookDetailPage`, `bookcoverApi`)**
   - 상세 페이지에서 OpenAI API Key 입력 후 도서 제목·내용을 바탕으로 AI 표지 생성
   - 생성된 `b64_json` 이미지를 Data URL로 변환하여 `PATCH /books/:id`로 DB 반영
4. **관심 도서(좋아요) 관리 (`MyPage`)**
   - 도서별 좋아요 토글 및 마이페이지에서 찜한 도서 모아보기 지원
  
# 6. AIVLE 문고 부가기능

## **6-1. 선호작 기능**

마음에 드는 도서에 버튼을 눌러 선호작 표시 하면 DB에 저장.
선호작으로 저장된 작품들을 모아볼 수 있는 페이지 추가.

## 6-2. **유효성 검사.**

도서 정보 추가 및 수정할 때 입력 형식 맞는지 검사.

저장 시 유효성 검사(장르 선택 여부, 필수 텍스트 입력, API Key 및 품질 선택 여부)를 통과하면 수정 페이지(/books/:id/update)로 이동.

특수문자 아예 타이핑이 안되게.
만약 입력 칸에 특수문자 있을때 에러메시지 출력.

<br/>

# 7. 앞으로 추가할 기능

## **7-1. 도서 표지에 호버기능으로 상세 정보 오버레이**

마우스를 올리기 전에는 표지랑 제목만 보이게.

마우스 올리면 표지 이미지 위로 도서의 세부 내용(저자, 출판사, 줄거리 요약 등)도 작은 글씨로 보이게.

## **7-2. 메인화면에 베스트셀러 띄우기**

메인페이지에서 베스트셀러를 장르처럼 넣어서 젤 위에 노출되게.

지금은 사용자가 한명이지만, 사용자 여러명이 수정 가능한 상태가 될 때 대비해서 내가 올린 도서 목록 볼 수 있게.
다른 사용자들 데이터랑 병합하여 집계할 수 있도록 확장대비.

## **7-3. 표지이미지 후보를 여러개 생성**

ai표지 생성할때, 여러 개 중에서 고를 수 있는 기능.

표지 세개를 보여줘야 되니까 한다면 정렬 같은 것도 바꿔야 함.

## **7-4. 북카드 호버 기능**

북카드의 표지이미지에 마우스를 올리면 저자, 출판사, 줄거리 요약 등을 오버레이로 표시

## **7-5. 표지이미지 수동 추가 기능**

표지이미지를 AI로 생성하지 않을 시에, 사용자가 가지고 있는 이미지 파일을 업로드 할 수 있게.
