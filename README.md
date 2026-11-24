# AIVLE BOOKS (도서 관리 및 AI 표지 생성 플랫폼)

> **KT AIVLE School AI트랙 03반 10조 — Mini Project 04**  
> React + Vite 기반의 도서 관리(CRUD) 및 OpenAI 이미지 생성 API를 활용한 맞춤형 도서 표지 생성 웹 애플리케이션입니다.

---

## 팀원 및 역할 분담 (R&R)

| 이름 | 역할 | 주요 담당 업무 |
| :--- | :--- | :--- |
| **양준원** | 조장 / UI · 레이아웃 | 공통 레이아웃(Header, Footer), 메인 목록 화면(Main, GenreSection, BookCard), 장르별 가로 스크롤 및 호버 오버레이 구현 |
| **서승준** | 발표자 / 발표 · 문서 | 도서 목록 페이지 연동, 통합 테스트(QA), 최종 발표 진행 |
| **남도현** | CRUD 연동 / PPT 제작 | `json-server` 기반 REST API 연동(조회·등록·수정·삭제), 최종 발표자료(PPT) 제작 |
| **남건우** | OpenAI 연동 / 검토 | OpenAI Image API 연동 및 AI 도서 표지 생성 기능 구현, 선택 버튼 UI(SelectButton), 코드 리뷰 |
| **이은수** | PM · 기획 / 서기 | 프로젝트 기획 및 일정 조율, 도서 상세 페이지(`BookDetailPage`) 구현, `README.md` 및 회의록 작성 |

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
