import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // Animate everything inside the content block upwards as they reach the bottom
    gsap.fromTo(contentRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Triggers when the footer enters the screen
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <footer 
      ref={sectionRef}
      style={{
        backgroundColor: '#050505',
        color: '#ffffff',
        padding: 'clamp(80px, 15vw, 150px) 20px 40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTop: '1px solid #1a1a1a'
      }}
    >
      <div ref={contentRef} style={{ width: '100%', maxWidth: '1000px', textAlign: 'center' }}>
        
        {/* Massive CTA Typography */}
        <h2 style={{ 
          fontSize: 'clamp(4rem, 12vw, 10rem)', 
          fontWeight: '900', 
          lineHeight: '0.9',
          letterSpacing: '-0.05em',
          marginBottom: '2rem',
          color: '#ffffff'
        }}>
          LET'S BUILD.
        </h2>

        {/* Targeted Sub-copy */}
        <p style={{ 
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', 
          color: '#a3a3a3', 
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem auto',
          lineHeight: '1.5'
        }}>
          Whether you need a scalable MVP or custom internal tools to modernize your operations, let's talk about your next move.
        </p>

        {/* The Primary Button */}
        <a 
          href="mailto:your.email@gmail.com" // Swap this with your real email later
          style={{
            display: 'inline-block',
            padding: '16px 40px',
            backgroundColor: '#4f46e5', // The indigo accent color
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            borderRadius: '50px',
            marginBottom: '6rem',
            transition: 'background-color 0.3s ease, transform 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#4338ca';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#4f46e5';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Start a Conversation
        </a>

        {/* The Minimalist Footer Links */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 'clamp(20px, 5vw, 40px)', 
          borderTop: '1px solid #222', 
          paddingTop: '2rem',
          width: '100%'
        }}>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" style={linkStyle}>LinkedIn</a>
          <a href="https://github.com/yourgithub" target="_blank" rel="noreferrer" style={linkStyle}>GitHub</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" style={linkStyle}>Resume</a>
        </div>

      </div>
    </footer>
  );
};

// Reusable inline style for the footer links
const linkStyle = {
  color: '#888888',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  transition: 'color 0.3s ease'
};

export default Contact;