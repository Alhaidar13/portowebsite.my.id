import { useEffect } from 'react'
import { SITE } from './data/site'
import { useSpotlight } from './hooks/useSpotlight'
import ScrollProgress from './components/ScrollProgress'
import { useTheme } from './hooks/useTheme'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Process from './components/Process'
import Projects from './components/Projects'
import Services from './components/Services'
import WhatsAppFab from './components/WhatsAppFab'

export default function App() {
  const { theme, toggle } = useTheme()
  useSpotlight()

  useEffect(() => {
    document.title = `${SITE.name} — Web Developer & UI/UX Designer`
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:text-onaccent"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
