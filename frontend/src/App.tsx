import { useState } from 'react'
import LoginPage from './components/login';
import SignupPage from './components/Signup';
import './App.css'

function App() {
  // State to toggle between Login and Signup
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="bg-[#F9F6EF] w-screen min-h-screen flex items-center justify-center p-2">
      <div className="border-8 w-full max-w-lg flex items-center justify-center shadow-lg rounded-2xl border-[#6D271B] bg-[#F2ECE3] p-4 overflow-y-auto max-h-[95vh]">
        {showLogin ? (
          <LoginPage onToggle={() => setShowLogin(false)} />
        ) : (
          <SignupPage onToggle={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  )
}

export default App