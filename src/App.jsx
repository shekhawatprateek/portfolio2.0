import { ReactLenis } from 'lenis/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills' // Import the new Skills component
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import 'lenis/dist/lenis.css'

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <main style={{ position: 'relative' }}>
        <Navbar />
        <Hero />
        <About />
        
        {/* Insert Skills here */}
        <Skills /> 
        
        <Projects />
        <Services />
        <Contact />
      </main>
    </ReactLenis>
  )
}

export default App