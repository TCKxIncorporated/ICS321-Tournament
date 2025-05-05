import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GuestDashboard from './Pages/GuestDashboard'
import Login from './Pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestDashboard />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App