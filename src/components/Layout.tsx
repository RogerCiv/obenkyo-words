import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import AlertMessage from './AlertMessage'
import { Analytics } from '@vercel/analytics/react'
import { Navbar } from './Navbar'


const Layout = () => (
  <div className='flex flex-col bg-base-200'>
    <Analytics />
    <AlertMessage />
    <Navbar />
    <main className='flex-grow'>
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default Layout