import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const textRefs = useRef([]);

  useGSAP(() => {
    // Smooth stagger fade-up for all text elements
    gsap.fromTo(textRefs.current, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
        }
      }
    );
  }, { scope: containerRef });

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      style={{
        backgroundColor: '#000000',
        padding: 'clamp(80px, 10vw, 150px) 20px',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexWrap: 'wrap', gap: '60px' }}>
        
        {/* LEFT COLUMN: The Bold Statement */}
        <div style={{ flex: '1 1 400px' }}>
          <h2 
            ref={addToRefs}
            style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: '900', 
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              marginBottom: '30px'
            }}
          >
            I am obsessed with making things. <br/>
            <span style={{ color: '#4f46e5' }}>Even more obsessed with making them perfect.</span>
          </h2>
        </div>

        {/* RIGHT COLUMN: The Details */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <p ref={addToRefs} style={{ fontSize: '1.1rem', color: '#a3a3a3', lineHeight: '1.7' }}>
            I am a Gurugram-based Full Stack Developer specializing in the MERN stack. After graduating from the University of Delhi, I dove deep into the web development community and never looked back. 
          </p>
          
          <p ref={addToRefs} style={{ fontSize: '1.1rem', color: '#a3a3a3', lineHeight: '1.7' }}>
            For three years at Techbridge India, I spearheaded the architecture and full-stack development of enterprise systems, owning everything from the MongoDB backend infrastructure to the React and Redux UIs. I don't just write code; I build scalable, high-performance products from the ground up.
          </p>

          {/* Quick Stats Grid */}
          <div ref={addToRefs} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px', paddingBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <h4 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 5px 0' }}>3+</h4>
              <p style={{ color: '#888', margin: 0, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Years Experience</p>
            </div>
            <div>
              <h4 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 5px 0' }}>80%</h4>
              <p style={{ color: '#888', margin: 0, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Core Features Delivered</p>
            </div>
          </div>

          {/* Resume Download Button */}
          <a 
            ref={addToRefs}
            href="/Resume.pdf" // Ensure your PDF is in the public folder
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 32px',
              backgroundColor: '#ffffff',
              color: '#000000',
              fontWeight: '700',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1rem',
              alignSelf: 'flex-start',
              marginTop: '10px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Download Resume
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>

        </div>
      </div>
    </section>
  );
};

export default About;