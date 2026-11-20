// "id": 2,
// "title": "책 제목2",
// "author": "작가2",
// "content": "책 내용2",
// "coverImageUrl": "",
// "createdAt": "2024-06-01T10:00:00Z",
// "updatedAt": "2024-06-01T10:00:00Z",
// "category": "소설"

function BookCard({id, book}) {
    return (
        <>
            <article>
                <h4>{book.title}</h4>
                <p>{book.content}</p>
            </article>
        </>
    )
}

export default BookCard