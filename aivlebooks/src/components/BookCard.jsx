// "id": 2,
// "title": "책 제목2",
// "author": "작가2",
// "content": "책 내용2",
// "coverImageUrl": "",
// "createdAt": "2024-06-01T10:00:00Z",
// "updatedAt": "2024-06-01T10:00:00Z",
// "category": "소설"

function BookCard({ id, book }) {
    return (
        <>
            <article >
                <div className="w-[360px] h-[120px] p-4 bg-[#000] flex flex-col items-start justify-end">
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                </div>

            </article>
        </>
    )
}

export default BookCard