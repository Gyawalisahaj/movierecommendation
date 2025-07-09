import { useState } from 'react'
import LoginPage from './components/login';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div className="bg-[#F9F6EF] w-screen h-screen flex items-center justify-center">
    <div className="border-8 h-[950px] w-[700px] flex items-center justify-center shadow-lg rounded-2xl border-[#6D271B] bg-[#F2ECE3]">
      <LoginPage />
    </div>
  </div>

    </>
  )
}

export default App
