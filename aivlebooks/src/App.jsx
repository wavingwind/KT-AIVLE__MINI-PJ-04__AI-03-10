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

  
  useEffect(() => {
    async function loadPosts() {
        try{
          const res = await fetch("http://localhost:3000/books");
          const books = await res.json();

          setBookList(books)
        } catch(err) {
          console.error(err)
          setError("useEffect loadPosts")
        }
      }

    loadPosts()
    }
    , []
  )

  const handleAddBook = async (newBook) => {

  }

  const handleModifyBook = async(id) => {

  }

  const handleViewDatails = async(id) => {

  }

  const handleDeleteBook = async(id) => {
    
  }

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
