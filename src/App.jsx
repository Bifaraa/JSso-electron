import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Carga from './components/Carga.jsx'
import Login from './components/Login'
import Escritorio from './components/Escritorio.jsx'

function App() {
  return (
    <Router>
      <Routes>
        {/* Automaticamente va primero al componente carga */}
        <Route path='/' element={<Carga />} />
        <Route path='/login' element={<Login />} />
        <Route path='/escritorio' element={<Escritorio />} />
      </Routes>
    </Router>
  )
}

export default App
