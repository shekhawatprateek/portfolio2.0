import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Spline from "@splinetool/react-spline";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null); // Used to explode the text on scroll
  const backgroundRef = useRef(null);
  
  // Refs for the initial load animation
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useGSAP(() => {
    // 1. THE ENTRANCE ANIMATION (Runs when page loads)
    const loadTl = gsap.timeline();
    
    loadTl.fromTo(
      [badgeRef.current, titleRef.current, subtitleRef.current, scrollIndicatorRef.current],
      { y: 40, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2 // Gives the 3D canvas a split second to initialize
      }
    );

    // 2. THE SCROLL ANIMATION (Runs when user scrolls down)
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500",
        pin: true,
        scrub: 1,
      },
    });

    scrollTl.to(
      textContainerRef.current,
      {
        scale: 8,
        opacity: 0,
        filter: "blur(20px)",
        ease: "power2.in",
        duration: 1,
      },
      0
    ); 

    scrollTl.to(
      backgroundRef.current,
      {
        scale: 0.3,
        opacity: 0,
        transformOrigin: "center center",
        ease: "power2.inOut",
        duration: 1,
      },
      0
    );
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: "relative",
        height: "100vh", 
        width: "100%", 
        overflow: "hidden",
        backgroundColor: "#000000",
      }}
    >
      <style>
        {`
          .spline-wrapper {
            width: 100%;
            height: 100%;
            filter: contrast(1.5) brightness(0.8);
          }
          
          .mobile-break {
            display: none;
          }

          /* Animates the little dot inside the scroll indicator */
          @keyframes scrollBounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(6px); }
            60% { transform: translateY(3px); }
          }

          .scroll-dot {
            animation: scrollBounce 2s infinite;
          }

          @media (max-width: 768px) {
            .spline-wrapper {
              transform: scale(0.4); 
              transform-origin: center center;
              /* THE FIX: Prevents the 3D model from trapping user's thumb on mobile */
              pointer-events: none !important; 
            }
            .mobile-break { display: block; }
            .hero-title { line-height: 1 !important; }
          }
        `}
      </style>

      {/* LAYER 1: Cinematic Noise Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        opacity: 0.06,
        pointerEvents: 'none',
        zIndex: 2
      }}/>

      {/* LAYER 2: The Spline Background */}
      <div
        ref={backgroundRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "auto", 
        }}
        onWheelCapture={(e) => e.stopPropagation()}
      >
        <div className="spline-wrapper">
          <Spline 
            scene="https://prod.spline.design/TTGw4R3JmYwbme1a/scene.splinecode" 
            style={{ width: "100%", height: "100%" }} 
          />
        </div>
      </div>
      
      {/* LAYER 3: The Text Container */}
      <div
        ref={textContainerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10, 
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none", 
          width: "100%",
          boxSizing: "border-box",
          padding: "0 24px", 
        }}
      >
        {/* The Premium Status Pill */}
        <div 
          ref={badgeRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
            marginBottom: '20px',
            transform: 'translateY(0)' // Reset for GSAP
          }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px #10b981' }} />
          <span style={{ color: '#d4d4d4', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Available for Opportunities
          </span>
        </div>

        <h1
          ref={titleRef}
          className="hero-title"
          style={{
            fontSize: "clamp(2.5rem, 12vw, 7.5rem)", 
            fontWeight: "900",
            lineHeight: "1.05",
            letterSpacing: "-0.04em",
            color: "#ffffff",
            margin: 0,
            textAlign: "center",
            width: "100%", 
            textShadow: "0 20px 40px rgba(0,0,0,0.5)" // Separates text from the 3D sphere
          }}
        >
          Prateek <br className="mobile-break" /> Shekhawat.
        </h1>
        
        <p
          ref={subtitleRef}
          style={{
            fontSize: "clamp(0.85rem, 2vw, 1.2rem)",
            color: "#a3a3a3",
            marginTop: "1.5rem",
            fontWeight: "600",
            letterSpacing: "0.15em",
            textAlign: "center",
          }}
        >
          FULL STACK MERN DEVELOPER
        </p>
      </div>

      {/* LAYER 4: The Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          opacity: 0 // Hidden until GSAP loads it
        }}
      >
        <span style={{ color: '#555', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: '24px', height: '40px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '20px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
          <div className="scroll-dot" style={{ width: '4px', height: '8px', backgroundColor: '#ffffff', borderRadius: '4px' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;