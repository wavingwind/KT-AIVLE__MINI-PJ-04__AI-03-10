import { useState, useEffect } from 'react'
import './App.css'

import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import Button from './components/Button'
import Input from './components/Input'


function App() {
  const [count, setCount] = useState(0)
  const [book_list, setBookList] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  useEffect(() => {
    async function loadPosts() {
        try{
          const res = await fetch("http://localhost:3000/books");
          const books = await res.json();

          setBookList(books)
        } catch(err) {
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
      const res = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(newBook)})
      const saved = await res.json()

      setBookList([...book_list, saved])
    } catch(err) {
      console.error(err)
      alert("Fail Add Book")
    }
  }

  const handleModifyBook = async(id, modify) => {
    try {
      const res = await fetch(`http://localhost:3000/books/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(modify)})
      const updated = await res.json()

      setBookList(prev => prev.map(book => (book.id === id ? updated : book)))
    } catch(err) {
      console.error(err)
      alert("Fail Modify Book")
    }
  }

  const handleViewDetails = async(id) => {
    try {
      const res = await fetch(`http://localhost:3000/books/${id}`)
      return await res.json()
    } catch (err) {
      console.error(err)
      alert("Fail Load Book")
    }
  }

  const handleDeleteBook = async(id) => {
    try {
      await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE"
      })
       setBookList( book_list.filter( (book) => book.id !== id))
    } catch(err) {
      console.error(err)
      alert("Fail Delete Book")
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <p>불러오는 중...</p>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <p>에러: {error}</p>
      </>
    )
  };

  return (
    <>
      <Header />
      <h1 className="inverse-surface">가나다라</h1>
      <Button />
      <Input />
      <Main book_list={book_list}/>
      <Footer />
    </>
  )
}

export default App
