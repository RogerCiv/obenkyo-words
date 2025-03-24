
import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './(routes)/Home'
import Noken5Page from './(routes)/Noken5'
import Noken4Page from './(routes)/Noken4'

function App() {


  return (
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
            <Link to="/n3">Nivel N3</Link>
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
          <Route path="/" element={<HomePage />} /> {/* Define el componente para la ruta principal */}
          <Route path="/noken-5" element={<Noken5Page />} /> {/* Define el componente para el nivel N5 */}
          <Route path="/noken-4" element={<Noken4Page />} />
        {/* <Route path="/n3" element={<N3Level />} />
        <Route path="/n2" element={<N2Level />} />
        <Route path="/n1" element={<N1Level />} /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App
