import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/react'
import { Footer, Navbar } from './Shared'
import { AlertMessage } from './Home'



const Layout = () => (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className='flex flex-col bg-background'>
      <Analytics />
      <AlertMessage />
      <Navbar />
      <main className='flex-grow min-h-screen'>
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </div>
  </ThemeProvider >

)

export default Layout