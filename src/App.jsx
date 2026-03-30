import { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import gsap from 'gsap'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects' 
import Contact from './components/Contact'
import AITerminal from './components/AITerminal'
import PremiumEffects from './components/PremiumEffects';
import Preloader from './components/Preloader';
import 'lenis/dist/lenis.css'

function App() {
  const lenisRef = useRef()

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0) 

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ lerp: 0.1, duration: 1.5 }}>
      <main style={{ position: 'relative' }}>
        <Preloader />
        <PremiumEffects /> 
        <Navbar />
        
        {/* THE NEW NARRATIVE FLOW */}
        <Hero />
        <AITerminal />   {/* <--- Moved up! Immediately engages the user */}
        <About />
        <Skills /> 
        <Projects />
        <Contact />
        
      </main>
    </ReactLenis>
  )
}

export default App