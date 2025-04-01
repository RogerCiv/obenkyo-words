import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import AlertMessage from './AlertMessage'

const Layout = () => (
  <div className='flex flex-col bg-base-200'>
    <AlertMessage />
    <Header />
    <main className='flex-grow'>
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default Layout