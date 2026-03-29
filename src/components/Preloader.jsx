import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = () => {
  const [isRendered, setIsRendered] = useState(true);
  const containerRef = useRef(null);
  const numberRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // 1. Lock the user's scroll wheel while the preloader is active
    document.body.style.overflow = 'hidden';

    // 2. The GSAP Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock scroll and remove component from DOM when finished
        document.body.style.overflow = 'auto';
        setIsRendered(false);
      }
    });

    const counter = { val: 0 };

    // The Counting Animation
    tl.to(counter, {
      val: 100,
      duration: 2.2, // Gives the 3D Spline model exactly 2.2 seconds to load
      ease: "power3.inOut",
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.innerText = Math.floor(counter.val) + "%";
        }
        if (progressRef.current) {
          progressRef.current.style.width = `${counter.val}%`;
        }
      }
    })
    // Snap the text and numbers up and fade them out
    .to([numberRef.current, textRef.current, progressRef.current], {
      y: -40,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      stagger: 0.1
    })
    // Slide the entire black screen UP to reveal the portfolio
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    }, "-=0.1"); // Start sliding slightly before the text finishes fading

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // completely removes it from the HTML once done so it doesn't block clicks
  if (!isRendered) return null; 

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        zIndex: 99999, /* Absolute highest layer, above the navbar and cursor */
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffffff'
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <h1 
          ref={numberRef}
          style={{
            fontFamily: 'Clash Display, sans-serif',
            fontSize: 'clamp(5rem, 15vw, 12rem)',
            fontWeight: '900',
            margin: 0,
            lineHeight: '1',
            color: '#3496F7', // Your Tech Blue
            letterSpacing: '-0.02em'
          }}
        >
          0%
        </h1>
      </div>
      
      <div style={{ overflow: 'hidden', marginTop: '10px' }}>
        <p 
          ref={textRef}
          style={{
            fontFamily: 'Satoshi, sans-serif',
            fontSize: '0.9rem',
            fontWeight: '800',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#a3a3a3',
            margin: 0
          }}
        >
          Initializing Portfolio
        </p>
      </div>

      {/* The Loading Bar */}
      <div 
        style={{
          width: '200px',
          height: '2px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          marginTop: '40px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '2px'
        }}
      >
        <div 
          ref={progressRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '0%',
            backgroundColor: '#3496F7',
            boxShadow: '0 0 10px rgba(52, 150, 247, 0.5)'
          }}
        />
      </div>
    </div>
  );
};

export default Preloader;