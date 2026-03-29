import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Spline from "@splinetool/react-spline";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null); 
  const backgroundRef = useRef(null);
  
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useGSAP(() => {
    const loadTl = gsap.timeline();
    
    loadTl.fromTo(
      [titleRef.current, subtitleRef.current, scrollIndicatorRef.current],
      { y: 40, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2 
      }
    );

    const titleEl = titleRef.current;
    const onMouseMove = (e) => {
      const rect = titleEl.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.08; 
      const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
      gsap.to(titleEl, { x, y, duration: 0.4, ease: "power3.out" });
    };
    const onMouseLeave = () => {
      gsap.to(titleEl, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
    };

    if (window.innerWidth > 768) {
        titleEl.addEventListener("mousemove", onMouseMove);
        titleEl.addEventListener("mouseleave", onMouseLeave);
    }

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500",
        pin: true,
        scrub: 1,
      },
    });

    scrollTl.to(textContainerRef.current, {
      scale: 8,
      opacity: 0,
      filter: "blur(10px)",
      force3D: true,
      rotationZ: 0.01,
      ease: "power2.in",
      duration: 1,
    }, 0);

    scrollTl.to(backgroundRef.current, {
      scale: 0.3,
      opacity: 0,
      transformOrigin: "center center",
      ease: "power2.inOut",
      duration: 1,
    }, 0);

    return () => {
      titleEl.removeEventListener("mousemove", onMouseMove);
      titleEl.removeEventListener("mouseleave", onMouseLeave);
    };
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
          @keyframes chromeShimmer {
            to { background-position: 200% center; }
          }

          .kinetic-chrome-name {
            background-image: linear-gradient(135deg, #ffffff 0%, #b0b0b0 25%, #050505 50%, #3496F7 75%, #ffffff 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: chromeShimmer 8s linear infinite;
            display: inline-block;
            filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
            pointer-events: auto !important;
            margin: 0 auto;
          }

          /* PREMIUM SUBTITLE ANIMATION */
          .live-subtitle {
            background-image: linear-gradient(90deg, #a3a3a3 0%, #ffffff 50%, #a3a3a3 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: chromeShimmer 4s linear infinite; /* Faster than the title */
            display: inline-block;
          }

          .spline-wrapper {
            width: 100%;
            height: 100%;
            filter: contrast(1.2) brightness(0.9);
            transform: translateZ(0);
          }
          
          .mobile-break { display: none; }

          @keyframes scrollBounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(6px); }
            60% { transform: translateY(3px); }
          }

          .scroll-dot { animation: scrollBounce 2s infinite; }

          @media (max-width: 768px) {
            .spline-wrapper {
              /* THE FIX: Scale up and pull UP to prevent cutting and centering */
              transform: scale(1.0) translateX(3%) translateY(4%); 
              width: 100vw;
              height: 100vh;
              pointer-events: none !important; 
            }
            .mobile-break { display: block; }
            .hero-title { 
                line-height: 1.1 !important; 
                width: 100% !important;
            }
          }
        `}
      </style>

      {/* Cinematic Noise Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        opacity: 0.06, pointerEvents: 'none', zIndex: 2
      }}/>

      {/* Spline Background */}
      <div
        ref={backgroundRef}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 1, display: "flex", justifyContent: "center", alignItems: "center",
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
      
      {/* Text Container */}
      <div
        ref={textContainerRef}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 10, display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          textAlign: "center",
          pointerEvents: "none", width: "100%", padding: "0 20px",
          boxSizing: "border-box",
          willChange: "transform, opacity, filter" 
        }}
      >
        <h1
          ref={titleRef}
          className="hero-title kinetic-chrome-name"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 7.5rem)", 
            fontWeight: "900",
            lineHeight: "1.05",
            letterSpacing: "-0.04em",
            margin: "0 auto",
            width: "fit-content",
            padding: "10px",
          }}
        >
          Prateek <br className="mobile-break" /> Shekhawat
        </h1>
        
        <p
          ref={subtitleRef}
          className="live-subtitle"
          style={{
            fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
            marginTop: "2.5rem", // Pushed lower as requested
            fontWeight: "700",
            letterSpacing: "0.25em", // Increased for premium feel
            textAlign: "center",
            textTransform: "uppercase",
            color: "#ffffff"
          }}
        >
          FULL STACK ENGINEER
        </p>
      </div>

      <div 
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
        }}
      >
        <span style={{ color: '#555', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: '24px', height: '40px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '20px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
          <div className="scroll-dot" style={{ width: '4px', height: '8px', backgroundColor: '#3496F7', borderRadius: '4px' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;