import { Link } from "react-router";

function Header(){
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#eee] bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex h-[76px] w-full max-w-[1024px] items-center justify-between px-4 lg:px-0">

                <Link
                    to="/"
                    aria-label="AIVLE Books 홈"
                    className="flex items-center gap-5"
                >
                    <span className="text-[27px] font-semibold tracking-[-0.07em] text-[#222]">
                        aivle<span className="font-light">books</span>
                        <span className="text-[#28b5ad]">.</span>
                    </span>
                </Link>

                <nav
                    aria-label="주요 메뉴"
                    className="flex items-center gap-3"
                >
                    <Link
                        to="/books/search"
                        aria-label="도서 검색"
                        title="도서 검색"
                        className="
                            flex h-[40px] w-[40px] items-center justify-center
                            text-[#555] transition-colors duration-200
                            hover:bg-[#f5f5f5] hover:text-[#28b5ad]
                        "
                    >
                        <svg
                            width="21"
                            height="21"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-4-4" />
                        </svg>
                    </Link>

                    {/* 도서 등록 */}
                    <Link
                        to="/books/new"
                        className="
                            group flex h-[40px] items-center gap-2
                            border border-[#ddd] px-4
                            text-[13px] font-medium text-[#555]
                            transition-all duration-200
                            hover:border-[#333] hover:bg-[#333]
                            hover:text-white
                        "
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z" />
                        </svg>

                        <span>도서 등록</span>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
export default Header