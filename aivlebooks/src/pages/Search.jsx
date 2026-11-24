
import { useState } from "react";
import Input from "../components/Input";
import BookCard from "../components/BookCard";

function Search({ books = [], loading = false, error = "" }) {
    const [keyword, setKeyword] = useState("");

    const search = keyword.trim().toLowerCase();

    const filteredBooks = books.filter((book) => {
        if (!search) return true;

        return (
            book.title?.toLowerCase().includes(search) ||
            book.author?.toLowerCase().includes(search) ||
            book.content?.toLowerCase().includes(search) ||
            book.category?.toLowerCase().includes(search)
        );
    });

    return (
        <main className="mx-auto min-h-[75vh] w-full max-w-[1024px] px-4 pb-24 pt-16 lg:px-0">

            <div className="mb-14">
                <h1 className="text-[32px] font-normal leading-[1.4] tracking-[-0.05em] text-[#222] md:text-[38px]">
                    도서 검색
                </h1>
            </div>
            <Input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="제목, 작가, 내용을 입력해 주세요."
            />

            <div className="mb-7 mt-14 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-[21px] font-normal tracking-[-0.04em] text-[#333]">
                        {search ? "검색 결과" : "전체 도서"}
                    </h2>

                    {!loading && !error && (
                        <span
                            aria-live="polite"
                            className="text-[15px] font-medium text-[#28b5ad]"
                        >
                            {filteredBooks.length}권
                        </span>
                    )}
                </div>
            </div>

            {loading ? (
                <div
                    role="status"
                    className="flex min-h-[320px] items-center justify-center"
                >
                    <p className="text-[14px] font-light text-[#999]">
                        도서 목록을 불러오는 중입니다.
                    </p>
                </div>
            ) : error ? (
                <div
                    role="alert"
                    className="flex min-h-[320px] items-center justify-center"
                >
                    <p className="text-[14px] text-red-500">
                        {error}
                    </p>
                </div>
            ) : filteredBooks.length > 0 ? (
                <div className="-m-1.5 flex flex-wrap">
                    {filteredBooks.map((book) => (
                        <div
                            key={book.id}
                            className="
                relative min-w-0
                w-full p-1.5
                sm:w-1/2
                md:w-1/3
                hover:z-20
            "
                        >
                            <BookCard book={book} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex min-h-[320px] flex-col items-center justify-center border-y border-[#eee] py-16 text-center">
                    <p className="text-[19px] font-normal tracking-[-0.03em] text-[#444]">
                        검색 결과가 없습니다.
                    </p>
                </div>
            )}
        </main>
    );
}

export default Search;
