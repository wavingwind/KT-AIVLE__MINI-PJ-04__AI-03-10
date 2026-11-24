import { useState, useEffect } from 'react';
import GenreSection from '../components/GenreSection';

const userId = "first" //임시 id

function MyPage({ book_list = [] }) {

    const [likes_list, setLikesList] = useState([]) //my_page에서 추가
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    //my_page에서 추가
    useEffect(() => {
        async function loadLikes() {
            try {
                const res = await fetch(`http://localhost:3000/likes_list?userId=${userId}`);
                const likes = await res.json();

                setLikesList(likes)
            } catch (err) {
                console.error(err)
                setError("Fail Load Likes")
            } finally {
                setLoading(false)
            }
        }

        loadLikes()
    }
        , []
    )

    const likedIds = likes_list.map((like) => String(like.bookId))   // ["5", "3"]
    const my_likes_book = book_list.filter((book) => likedIds.includes(String(book.id)))

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
                {loading ? (
                    <p className="py-24 text-center text-[14px] font-light text-[#999]">
                        불러오는 중입니다.
                    </p>
                ) : error ? (
                    <p className="py-24 text-center text-[14px] text-red-500">
                        {error}
                    </p>
                ) : my_likes_book.length > 0 ? (
                    <GenreSection
                        genre={`${userId}님이 좋아요한 도서 (${my_likes_book.length}권)`}
                        books={my_likes_book}
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