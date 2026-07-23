import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PetDetail from './pages/PetDetail'
import AddPet from './pages/AddPet'
import Requests from './pages/Requests'

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/add" element={<AddPet />} />
          <Route path="/requests" element={<Requests />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
