import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Spline from '@splinetool/react-spline';

// Register ScrollTrigger so GSAP knows we are using it
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // References to the DOM elements we want to animate
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const backgroundRef = useRef(null);

  useGSAP(() => {
    // Create a timeline tied to the scrollbar
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',    // Start when the top of the container hits the top of the viewport
        end: '+=1500',       // Pin the screen for 1500px of scroll distance
        pin: true,           // Lock the screen in place
        scrub: 1,            // Smooth 1-second delay catch-up to the scroll wheel
        anticipatePin: 1,
      }
    });

    // Animation 1: The text scales up massively and fades out
    tl.to(textRef.current, {
      scale: 4,
      opacity: 0,
      ease: 'power2.inOut',
      duration: 1
    }, 0); // The '0' means this starts at the very beginning of the scroll

    // Animation 2: The background (future 3D model) fades in and scales to normal
    tl.fromTo(backgroundRef.current, 
      { scale: 0.5, opacity: 0 }, 
      { scale: 1, opacity: 1, ease: 'power2.out', duration: 1 }, 
      0.2 // Starts slightly after the text starts fading
    );

  }, { scope: containerRef }); // Keeps animations restricted to this component

  return (
    <section 
      ref={containerRef} 
      style={{ 
        height: '100vh', 
        width: '100vw', 
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0a0a'
      }}
    >
      {/* LAYER 1: The Background (Responsive Orb) */}
      <div 
        ref={backgroundRef}
        style={{
          position: 'absolute',
          width: '100vw', // Let the 3D scene take up the whole screen behind the text
          height: '100vh',
          zIndex: 1,
          opacity: 0, // Starts invisible for the GSAP fade-in
          transform: 'scale(0.5)', // Starts small for the GSAP scale-up
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* A sleek, interactive 3D geometric scene */}
         <Spline scene="https://prod.spline.design/TTGw4R3JmYwbme1a/scene.splinecode" />
      </div>

      {/* LAYER 2: The Headline (Fluid Typography) */}
      <div 
        ref={textRef}
        style={{
          zIndex: 2,
          textAlign: 'center',
          pointerEvents: 'none',
          padding: '0 20px' // Adds breathing room on small screens
        }}
      >
        <h1 style={{ 
          // clamp(min, preferred, max)
          // On mobile it will be 3rem, on desktop it will scale up to 7rem
          fontSize: 'clamp(3rem, 8vw, 7rem)', 
          fontWeight: '900', 
          lineHeight: '1.1',
          letterSpacing: '-0.05em',
          color: '#ffffff',
          margin: 0
        }}>
          Prateek Shekhawat.
        </h1>
        <p style={{
          // Scales smoothly from 1rem on mobile to 1.5rem on desktop
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          color: '#888888',
          marginTop: '1rem',
          fontWeight: '500',
          letterSpacing: '0.1em'
        }}>
          SOFTWARE & SYSTEMS ARCHITECT
        </p>
      </div>
    </section>
  );
};

export default Hero;