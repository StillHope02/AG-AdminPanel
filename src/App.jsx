import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPanel from './AdminPanel'
import AdminDashboard from './AdminDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminPanel />} />
          <Route path='/user-info' element={<AdminDashboard/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
