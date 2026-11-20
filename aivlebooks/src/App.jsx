import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

// import Header from "./components/Header"
import Main from "./components/Main"
// import Footer from "./components/Footer"


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

  return (
    <>
      {/* <Header /> */}
      <Main book_list={book_list}/>
      {/* <Footer /> */}
    </>
  )
}

export default App
