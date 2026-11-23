// "id": 2,
// "title": "책 제목2",
// "author": "작가2",
// "content": "책 내용2",
// "coverImageUrl": "",
// "createdAt": "2024-06-01T10:00:00Z",
// "updatedAt": "2024-06-01T10:00:00Z",
// "category": "소설"

import { Link } from 'react-router-dom';

function BookCard({ id, book }) {
  const bookId = book.id ?? id;

  return (
    <article className="book-card">
      <Link className="book-card-link" to={`/books/${bookId}`}>
        {book.coverImageUrl ? (
          <img
            className="book-card-cover"
            src={book.coverImageUrl}
            alt={`${book.title} 표지`}
          />
        ) : (
          <p>표지 준비 중</p>
        )}

        <h4>{book.title}</h4>
        <p>{book.content}</p>
      </Link>
    </article>
  );
}

export default BookCard;