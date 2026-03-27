import { ReactLenis } from 'lenis/react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact' // Import the closer
import 'lenis/dist/lenis.css'

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Contact /> {/* The Final Section */}
      </main>
    </ReactLenis>
  )
}

export default App