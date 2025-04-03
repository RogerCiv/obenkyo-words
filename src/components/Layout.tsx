import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import Footer from './Footer'
import AlertMessage from './AlertMessage'
import { Analytics } from '@vercel/analytics/react'
import { Navbar } from './Navbar'


const Layout = () => (
  <div className='flex flex-col bg-base-200'>
    <Analytics />
    <AlertMessage />
    <Navbar />
    <main className='flex-grow min-h-screen'>
      <Outlet />
    </main>
    <Toaster />
    <Footer />
  </div>
)

export default Layout