# 1. 프로젝트명 : AIVLE 문고 (AIVLE Books)

# 2. R&R
| **이름** | **역할** |
| --- | --- |
| **양준원** | UI, 레이아웃 / 조장 |
| **서승준** | 발표, 문서 / 발표자 |
| **남도현** | CRUD 연동 / PPT 제작자 |
| **남건우** | OpenAI 연동 / 검토 담당자 |
| **이은수** | PM, 기획 / 서기 |

# 3. 참조 목록
(생략)

# 4. 컴포넌트

| **컴포넌트 명** | **사용위치** | **설명** | **담당자** |
| --- | --- | --- | --- |
| **Header** | 공통 레이아웃 | 상단 내비게이션 (홈 버튼, 도서등록 버튼) | 양준원 |
| **Footer** | 공통 레이아웃 | 하단 영역 (약관 같은 거 정적텍스트 하드코딩) | 양준원 |
| **Main** |  | 여러개의 GenreSection를 따로따로 있게하지 말고 하나의 프레임에 담아놓음. |  |
| **Button** | 공통 UI | 공용 액션 버튼 | 남건우 |
| **SelectButton** | `BookForm` | 선택용 드롭다운 / 선택버튼 컴포넌트 | 남건우 |
| **Input** | `BookForm`, `BookDetailPage` | 제목, 저자, 도서내용 등 입력 컴포넌트 | 남건우 |
| **BookCard** | `GenreSection` | 표지, 카테고리, 제목 | 남도현 |
| **GenreSection** | `BookListPage` (`/`) | `CategoryHeader` + `BookCard` 리스트 | 남도현 |
| **BookForm** | `BookCreatePage`,
`BookEditPage` | 도서 등록/수정 입력 폼. 유효성 검사용 형식. | CRUD |

# 5. API 명세서 & db.json

## 5-1. 페이지 컴포넌트

| **페이지명** | **경로 (Route)** | **설명** | **담당자** |
| --- | --- | --- | --- |
| **BookListPage** | `/` | 메인 도서 목록 페이지 (전체 도서 조회 및 장르별 섹션 렌더링) | UI / 레이아웃 |
| **BookCreatePage** | `/books/new`  | 신규 도서 등록 페이지 (`POST /books` 연동) | CRUD |
| **BookDetailPage** | `/books/:id` | 도서 상세 조회 페이지 (AI 표지 생성/재생성 `PATCH`, 도서 삭제 `DELETE`) | CRUD, 
OpenAI 연동 |
| **BookEditPage** | `/books/:id/edit` | 기존 도서 정보 수정 페이지 (기존 데이터 로드 및 `PATCH /books/:id`) | CRUD |

| **기능** | **Method** | **Endpoint** | **요청 데이터 (Body) / 비고** |
| --- | --- | --- | --- |
| **메인 페이지 (기존 도서 목록 조회)** | `GET` | `/books` | 전체 도서 배열 반환 (`db.json`) 후 프론트에서 `category`별 그룹핑 렌더링 |
| **신규 도서 등록** | `POST` | `/books` | `{ title, author, category, content, coverImageUrl: "", createdAt, updatedAt }` |
| **도서 상세 정보 조회** | `GET` | `/books/{id}` | 특정 `id`의 도서 객체 1건 반환 |
| **도서 수정** | `PATCH` | `/books/{id}` | `{ title, author, category, content, updatedAt }` |
| **도서 삭제** | `DELETE` | `/books/{id}` | 없음 |
| **AI 표지 이미지 생성** | `POST` | `/cover-gen` | `{ model: “gpt-image-…, prompt, … }` |
| **좋아요 상태 변경** | `PATCH` | `/books/{id}` | `{ isLiked: boolean }` |
