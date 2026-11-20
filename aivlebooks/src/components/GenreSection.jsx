import BookCard from "./BookCard"

function GenreSection({genre, books}) {
    return (
        <>
            <h3>{genre}</h3>
            {books.map( book => {
                return <BookCard key={book.id} book={book}/>
        })} 
        </>
    )
}

export default GenreSection