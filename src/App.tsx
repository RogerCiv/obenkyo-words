import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import Noken5Page from './pages/Noken5'
import Noken4Page from './pages/Noken4'
import Noken3Page from './pages/Noken3'
import ProtectedRoutes from './utils/protectedRoutes'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-gray-100 min-h-screen p-4">
          <nav className="mb-4">
            <ul className="flex space-x-4">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/noken-5">Nivel N5</Link>
              </li>
              <li>
                <Link to="/noken-4">Nivel N4</Link>
              </li>
              <li>
                <Link to="/noken-3">Nivel N3</Link>
              </li>
              <li>
                <Link to="/n2">Nivel N2</Link>
              </li>
              <li>
                <Link to="/n1">Nivel N1</Link>
              </li>
            </ul>
          </nav>
          <main className=''>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/noken-5" element={<Noken5Page />} />
                <Route path="/noken-4" element={<Noken4Page />} />
                <Route path="/noken-3" element={<Noken3Page />} />
              </Route>
              {/* <Route path="/n2" element={<N2Level />} />
        <Route path="/n1" element={<N1Level />} /> */}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
