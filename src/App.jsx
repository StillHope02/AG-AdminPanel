import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPanel from './AdminPanel'
import AdminDashboard from './AdminDashboard'
import Navbar from './Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        {/* <Route path='/user-info' element={<AdminDashboard />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
