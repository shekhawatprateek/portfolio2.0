import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  { label: 'Email', value: 'prateekshekhawat7@gmail.com', link: 'mailto:prateek.architect@gmail.com' },
  { label: 'Phone', value: '+91 80760 67753', link: 'tel:+919876543210' },
  { label: 'LinkedIn', value: 'linkedin.com/in/prateekshekhawat', link: 'https://linkedin.com/in/prateekshekhawat' },
  { label: 'GitHub', value: 'github.com/prateek-dev', link: 'https://github.com/prateek-dev' },
  { label: 'Resume', value: 'Download PDF', link: '/resume.pdf' } // We will add the actual PDF next!
];

const Contact = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(contentRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <footer 
      id="contact" 
      ref={sectionRef}
      style={{
        backgroundColor: '#050505',
        color: '#ffffff',
        padding: 'clamp(80px, 15vw, 150px) 20px',
        display: 'flex',
        justifyContent: 'center',
        borderTop: '1px solid #1a1a1a'
      }}
    >
      <div 
        ref={contentRef} 
        style={{ 
          width: '100%', 
          maxWidth: '1200px', 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(40px, 8vw, 80px)',
          alignItems: 'start'
        }}
      >
        
        {/* Left Column: The Big CTA */}
        <div>
          <h2 style={{ 
            fontSize: 'clamp(3rem, 8vw, 4rem)', 
            fontWeight: '900', 
            lineHeight: '0.9',
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            color: '#ffffff'
          }}>
            LET'S<br/>BUILD<br/>TOGETHER.
          </h2>
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
            color: '#a3a3a3', 
            marginBottom: '2rem',
            maxWidth: '400px',
            lineHeight: '1.6'
          }}>
            Whether you need a scalable MVP or custom internal tools to modernize your operations, I'm ready to architect your next move. Reach out directly.
          </p>
        </div>

        {/* Right Column: The Details Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {contactDetails.map((detail, index) => (
            <a 
              key={index}
              href={detail.link}
              target={detail.label === 'Email' || detail.label === 'Phone' ? '_self' : '_blank'}
              rel="noreferrer"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#111111',
                borderRadius: '16px',
                border: '1px solid #222',
                textDecoration: 'none',
                color: '#ffffff',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#4f46e5';
                e.currentTarget.style.transform = 'translateX(10px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span style={{ color: '#888888', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {detail.label}
              </span>
              <span style={{ fontSize: '1.1rem', fontWeight: '500', textAlign: 'right' }}>
                {detail.value}
              </span>
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Contact;