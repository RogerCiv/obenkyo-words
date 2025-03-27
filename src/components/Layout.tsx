import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => (
  <div className='flex flex-col bg-base-200'>
    <Header />
    <main className='flex-grow'>
      <Outlet />
    </main>
    <footer>
      Footer provisional
    </footer>
  </div>
)

export default Layout