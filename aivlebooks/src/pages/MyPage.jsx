import GenreSection from '../components/GenreSection';

function MyPage({ my_likes = [] }) {
    return (
        <>
            <nav className="mx-auto w-full max-w-[1024px] px-4 pt-16 lg:px-0">
                <h1 className="mb-10 text-left text-[32px] font-normal leading-[1.4] tracking-[-0.05em] text-[#222] md:text-[38px]">
                    마이페이지
                </h1>
                <ul className="flex gap-8 border-b border-[#eee] text-[15px]">
                    <li>
                        <button
                            type="button"
                            className="border-b-2 border-[#222] pb-3 font-medium text-[#222]"
                        >
                            좋아요 표시한 도서
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="border-b-2 border-transparent pb-3 text-[#999] transition-colors hover:text-[#222]"
                        >
                            구매한 도서
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="border-b-2 border-transparent pb-3 text-[#999] transition-colors hover:text-[#222]"
                        >
                            읽은 도서
                        </button>
                    </li>
                </ul>
            </nav>

            <div className="min-h-[60vh] w-full pb-24 pt-10">
                {my_likes.length > 0 ? (
                    <GenreSection
                        genre={`좋아요한 도서 (${my_likes.length}권)`}
                        books={my_likes}
                    />
                ) : (
                    <p className="mx-auto max-w-[1024px] border-y border-[#eee] py-24 text-center text-[19px] tracking-[-0.03em] text-[#444]">
                        아직 좋아요한 도서가 없습니다.
                    </p>
                )}
            </div>
        </>
    )
}

export default MyPage;