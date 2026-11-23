import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Button from './components/Button'
import Input from './components/Input'

function App() {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    console.log('입력된 책 제목:', title);
    alert(`책 제목: ${title}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Input
        label="책 제목: "
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
      />

      <Button onClick={handleSubmit}>등록하기</Button>
    </div>
  );
}

export default App;