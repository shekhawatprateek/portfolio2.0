import { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import gsap from 'gsap'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects' // Make sure the filename matches!
import Contact from './components/Contact'
import 'lenis/dist/lenis.css'

function App() {
  const lenisRef = useRef()

  useEffect(() => {
    // THE FIX: This perfectly synchronizes GSAP animations with Lenis Smooth Scrolling.
    // This eliminates all visual jitter when cards are pinning or scaling.
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0) // Prevents GSAP from "catching up" if the tab is inactive

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ lerp: 0.1, duration: 1.5 }}>
      <main style={{ position: 'relative' }}>
        <Navbar />
        <Hero />
        <About />
        <Skills /> 
        <Projects />
        <Contact />
      </main>
    </ReactLenis>
  )
}

export default App