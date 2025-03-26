import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import Noken5Page from './pages/Noken5'
import Noken4Page from './pages/Noken4'
import Noken3Page from './pages/Noken3'
import ProtectedRoutes from './utils/protectedRoutes'
import Login from './pages/Login'
import Register from './pages/Register'

import Layout from './components/Layout'  // New layout component
import NotFound from './pages/NotFound'
import NokensPage from './pages/NokensPage'
import { AuthProvider } from './context/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/nokens">
              <Route index element={<NokensPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="noken-5" element={<Noken5Page />} />
                <Route path="noken-4" element={<Noken4Page />} />
                <Route path="noken-3" element={<Noken3Page />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
