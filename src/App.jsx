import { useState, useEffect } from 'react'
import Header from './components/Header'
import PhotoGallery from './components/PhotoGallery'
import Footer from './components/Footer'

export default function App() {
  const [query, setQuery] = useState('')
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* ignore storage errors */
    }
  }, [dark])

  return (
    <div className="flex min-h-screen flex-col bg-white text-black dark:bg-black dark:text-white">
      <Header query={query} setQuery={setQuery} dark={dark} setDark={setDark} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <PhotoGallery query={query} />
      </main>
      <Footer />
    </div>
  )
}
