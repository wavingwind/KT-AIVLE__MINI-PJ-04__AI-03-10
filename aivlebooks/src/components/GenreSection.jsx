import BookCard from "./BookCard"

function GenreSection({ genre, books }) {
    return (
        <div className="flex flex-col gap-4 item-start px-4">
            <h2 className="font-headline-md text-headline-md text-primary tracking-tight">{genre}</h2>
            <div className="flex">
                {books.map(book => {
                    return <BookCard key={book.id} book={book} />
                })}
            </div>
        </div>
    )
}

export default GenreSection