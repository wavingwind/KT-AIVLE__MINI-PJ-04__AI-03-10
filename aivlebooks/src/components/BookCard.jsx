import { Link } from "react-router";

function BookCard({ book }) {
    return (
        <Link
            to={`/books/${book.id}`}
            className="group block w-full text-left text-inherit no-underline"
        >
            <article>
                {/* 표지 영역 */}
                <div
                    className="
                        relative aspect-[2/3] w-full overflow-hidden rounded-sm
                        bg-[#f3f1ec] transition-transform duration-200
                        group-hover:-translate-y-0.5
                    "
                >
                    {book.coverImageUrl ? (
                        <img
                            src={book.coverImageUrl}
                            alt={`${book.title} 표지`}
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <span
                                aria-hidden="true"
                                className="absolute inset-y-0 left-2 w-px bg-[#d8d3c9]"
                            />
                            <span className="text-xs text-[#746e64]">
                                표지 없음
                            </span>
                        </div>
                    )}

                    {/* 마우스를 올리거나 키보드로 선택하면 보이는 책 소개 */}
                    {book.content && (
                        <div
                            className="
                                absolute inset-0 flex flex-col justify-end
                                bg-black/75 p-4 text-white opacity-0
                                transition-opacity duration-200
                                group-hover:opacity-100 group-focus-visible:opacity-100
                            "
                        >
                            {book.category && (
                                <p className="mb-2 text-xs text-white/80">
                                    {book.category}
                                </p>
                            )}
                            <p className="line-clamp-4 text-sm leading-relaxed">
                                {book.content}
                            </p>
                        </div>
                    )}
                </div>

                {/* 표지 아래에 항상 보이는 책 정보 */}
                <div className="pt-3">
                    <h4 className="line-clamp-2 text-base font-medium leading-snug text-[#292929]">
                        {book.title}
                    </h4>
                    {book.author && (
                        <p className="mt-1 text-[13px] text-[#707070]">
                            {book.author}
                        </p>
                    )}
                </div>
            </article>
        </Link>
    );
}

export default BookCard;