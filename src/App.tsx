import { Outlet } from 'react-router'
import './App.css'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 mx-auto w-full max-w-7xl px-10 mt-5">
        <Outlet />
      </div>
      <Footer />
      <Toaster position="top-center" />
    </div>

  )
}

export default App