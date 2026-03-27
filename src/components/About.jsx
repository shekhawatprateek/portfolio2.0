import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // This targets all direct children (the h2 and the p tags) inside textRef
    gsap.fromTo(textRef.current.children,
      { 
        y: 50,         // Start 50px pushed down
        opacity: 0     // Start invisible
      },
      {
        y: 0,          // Move to original position
        opacity: 1,    // Fully visible
        duration: 1,
        stagger: 0.2,  // 0.2 second delay between each paragraph appearing
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%", // Starts animation when the top of this section hits 70% down the screen
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#ffffff',
        padding: '100px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div ref={textRef} style={{ maxWidth: '800px' }}>
        <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 4rem)', 
            marginBottom: '2rem', 
            color: '#4f46e5', // A sharp indigo accent color
            fontWeight: '800'
        }}>
          THE ARCHITECT.
        </h2>
        
        <p style={{ 
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', 
            lineHeight: '1.6', 
            marginBottom: '1.5rem', 
            color: '#cccccc' 
        }}>
          I don't just write code; I build scalable systems that solve real business bottlenecks. With three years of deep MERN stack experience, I bridge the gap between complex technical architecture and practical business needs.
        </p>
        
        <p style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', 
            lineHeight: '1.6', 
            color: '#888888' 
        }}>
          Currently focused on delivering high-performance MVPs and internal tools that drive efficiency and growth. If your operations run on outdated spreadsheets or fragmented systems, we need to talk.
        </p>
      </div>
    </section>
  );
};

export default About;