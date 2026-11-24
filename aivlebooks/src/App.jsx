import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router";
import './App.css'

import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import Button from './components/Button'
import Input from './components/Input'
import Search from "./pages/Search";

import BookDetailPage from "./pages/BookDetailPage"
import BookCreatePage from "./pages/BookCreatePage";


function App() {
  const [count, setCount] = useState(0)
  const [book_list, setBookList] = useState([])
  
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("http://localhost:3000/books");
        const books = await res.json();

        setBookList(books)
      } catch (err) {
        console.error(err)
        setError("useEffect loadPosts")
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }
    , []
  )

  const handleAddBook = async (newBook) => {
    try {
      const now = new Date().toISOString();
      const res = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newBook, createdAt: now, updatedAt: now })
      })
      const saved = await res.json()

      setBookList([...book_list, saved])
      return saved; // 생성된 책의 id 반환
    } catch (err) {
      console.error(err)
      alert("Fail Add Book")
    }
  }

  const handleModifyBook = async (id, modify) => {
    try {
      const res = await fetch(`http://localhost:3000/books/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...modify, updatedAt: new Date().toISOString() })
      })
      const updated = await res.json()

      setBookList(prev => prev.map(book => (String(book.id) === String(id) ? updated : book)))
    } catch (err) {
      console.error(err)
      alert("Fail Modify Book")
    }
  }

  const handleViewDetails = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/books/${id}`)
      if (!res.ok) {
        throw new Error("도서 정보를 불러오지 못했습니다.");
      }
      return await res.json()
    } catch (err) {
      console.error(err)
      alert("Fail Load Book")
    }
  }

  const handleDeleteBook = async (id) => {
    const isConfirmed = window.confirm("정말로 이 도서를 삭제하시겠습니까?");
    if (!isConfirmed) return;
    try {
      await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE"
      })
      setBookList(book_list.filter((book) => String(book.id) !== String(id)))
      navigate("/");
    } catch (err) {
      console.error(err)
      alert("Fail Delete Book")
    }
  }


  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {loading ? (
                <p>불러오는 중...</p>
              ) : error ? (
                <p>에러: {error}</p>
              ) : (
                <>
                  <Main book_list={book_list} />
                </>
              )}
            </>
          }
        />

        <Route
          path="/books/create"
          element={
            <main>
              <h1>도서 등록 페이지</h1>
            </main>
          }
        />

        <Route
          path="/books/:id"
          element={<BookDetailPage onViewDetails={handleViewDetails}  onDeleteBook={handleDeleteBook} />}
        />

        {book_list.map(book => (
          <Route
            key={book.id}
            path={`/books/${book.id}/update`}
            element={<BookCreatePage key={book.id} editBook={book} onModifyBook={handleModifyBook} />}
          />
        ))}

        <Route
          path="/books/new"
          element={<BookCreatePage onCreateBook={handleAddBook} />}
        />

        <Route
          path="/books/search"
          element={
            <Search
              books={book_list}
              loading={loading}
              error={error}
            />
          }
        />
      </Routes>

      <Footer />
    </>
  );

}

export default App
