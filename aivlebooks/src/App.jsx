import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Button from './components/Button'
import Input from './components/Input'


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div className="">1</div>
//     </>
//   )
// }


function App() {
  const [title, setTitle] = useState('');

  // 제목 핸들러
  const handleTitle = (e) => {
    setTitle(e.target.value);
    console.log('책 제목:', e.target.value);
  };


  return (
    <div style={{ padding: '20px' }}>
      <Input
        label="책 제목: "
        id="title"
        value={title}
        onChange={handleTitle}
        placeholder="제목"
      />
    </div>
  );
}

export default App;