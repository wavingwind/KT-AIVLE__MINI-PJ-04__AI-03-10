import GenreSection from "./GenreSection"

import { useState, useEffect } from "react"

function Main({book_list}) {

    const fiction_books = book_list.filter(book => book.category === "소설")
    const science_books = book_list.filter(book => book.category === "과학")
    const humanities_books = book_list.filter(book => book.category === "인문")
    const history_books = book_list.filter(book => book.category === "역사")
    const art_books = book_list.filter(book => book.category === "예술")
    
    return (
        <main>
            <GenreSection genre="소설" books={fiction_books}/>
            <GenreSection genre="과학" books={science_books}/>
            <GenreSection genre="인문" books={humanities_books}/>
            <GenreSection genre="역사" books={history_books}/>
            <GenreSection genre="예술" books={art_books}/>
        </main>
    )
}

export default Main