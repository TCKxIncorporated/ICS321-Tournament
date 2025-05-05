import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GuestDashboard from './Pages/GuestDashboard'
import Login from './Pages/Login'
import AdminDashboard from './Pages/Admin/AdminDashboard.tsx'
import AddTournament from './Pages/Admin/AddTournament.tsx'
import AddTeam from './Pages/Admin/AddTeam.tsx'
import ApprovePlayer from './Pages/Admin/ApprovePlayer.tsx'
import DeleteTournament from './Pages/Admin/DeleteTournament.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestDashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-tournament" element={<AddTournament />} />
        <Route path="/admin/add-team" element={<AddTeam />} />
        <Route path="/admin/approve-player" element={<ApprovePlayer />} />
        <Route path="/admin/delete-tournament" element={<DeleteTournament />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App