
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'


const App = () =>{
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/signup" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
