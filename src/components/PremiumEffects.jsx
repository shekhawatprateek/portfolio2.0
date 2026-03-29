import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PremiumEffects = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Disable custom cursor on mobile touch devices immediately
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    document.body.style.cursor = 'none';

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });
      
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    // --- THE UPGRADED PREMIUM HOVER EFFECT ---
    const handleHover = () => {
      gsap.to(follower, { 
        scale: 1.5, // Expanding just enough to frame the cursor
        backgroundColor: 'rgba(52, 150, 247, 0.1)', // A very subtle Tech Blue wash
        borderColor: 'rgba(52, 150, 247, 0.8)', // Solidifies the blue ring
        backdropFilter: 'blur(4px)', // Slight magnifying glass blur
        duration: 0.3
      });
      // Shrink the inner dot slightly instead of making it vanish
      gsap.to(cursor, { scale: 0.5, backgroundColor: '#ffffff', duration: 0.2 }); 
    };

    const handleLeave = () => {
      gsap.to(follower, { 
        scale: 1, 
        backgroundColor: 'transparent', 
        borderColor: 'rgba(52, 150, 247, 0.4)', // Back to the translucent blue ring
        backdropFilter: 'blur(0px)',
        duration: 0.3
      });
      gsap.to(cursor, { scale: 1, backgroundColor: '#3496F7', duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    const interactables = document.querySelectorAll('a, button, input, textarea, .tech-pill, .bento-card, .nav-btn');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
      el.style.cursor = 'none'; 
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
      document.body.style.cursor = 'auto';
    };
  }, []);

  // If on mobile, don't render the custom cursor DOM elements at all
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* 1. THE CINEMATIC FILM GRAIN */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          pointerEvents: 'none',
          zIndex: 9997,
          opacity: 0.05, 
          backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
          animation: 'grain 8s steps(10) infinite'
        }}
      />
      <style>
        {`
          @keyframes grain {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5%, -10%); }
            30% { transform: translate(3%, -15%); }
            50% { transform: translate(12%, 9%); }
            70% { transform: translate(9%, 4%); }
            90% { transform: translate(-1%, 7%); }
          }
        `}
      </style>

      {/* 2. THE CUSTOM CURSOR DOT */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: '6px', height: '6px',
          backgroundColor: '#3496F7', // Synced to Tech Blue
          borderRadius: '50%', pointerEvents: 'none', zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 0.2s ease'
        }}
      />

      {/* 3. THE SMOOTH MAGNETIC FOLLOWER */}
      <div
        ref={followerRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: '36px', height: '36px',
          border: '1px solid rgba(52, 150, 247, 0.4)', // Synced to Tech Blue
          borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          boxSizing: 'border-box'
        }}
      />
    </>
  );
};

export default PremiumEffects;