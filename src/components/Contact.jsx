import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const textRefs = useRef([]);
  
  // State for the floating labels and form submission
  const [, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useGSAP(() => {
    // 1. Stagger the text on the left
    gsap.fromTo(textRefs.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    // 2. Slide the form in from the right
    gsap.fromTo(formRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: containerRef });

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  // Simulated Submit Handler for that premium UX feel
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after a few seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      style={{
        backgroundColor: '#000000',
        padding: 'clamp(80px, 10vw, 150px) 20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <style>
        {`
          /* THE PREMIUM INPUT FIELDS */
          .input-group {
            position: relative;
            margin-bottom: 30px;
          }

          .premium-input {
            width: 100%;
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 24px 20px 10px 20px;
            color: #ffffff;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-sizing: border-box;
            outline: none;
          }

          .premium-input:focus {
            background-color: rgba(255, 255, 255, 0.05);
            border-color: #4f46e5;
            box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
          }

          /* FLOATING LABELS UX */
          .floating-label {
            position: absolute;
            left: 20px;
            top: 18px;
            color: #888888;
            font-size: 1rem;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: left top;
          }

          .premium-input:focus ~ .floating-label,
          .premium-input:not(:placeholder-shown) ~ .floating-label {
            transform: translateY(-12px) scale(0.75);
            color: #4f46e5;
            font-weight: 600;
          }

          /* CUSTOM SCROLLBAR FOR TEXTAREA */
          textarea.premium-input {
            min-height: 150px;
            resize: vertical;
          }

          /* SOCIAL LINK HOVERS */
          .social-link {
            color: #a3a3a3;
            text-decoration: none;
            font-size: 1.1rem;
            transition: color 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }
          
          .social-link:hover {
            color: #ffffff;
          }

          @media (max-width: 900px) {
            .contact-grid {
              flex-direction: column;
              gap: 60px;
            }
          }
        `}
      </style>

      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vh',
        background: 'radial-gradient(circle, rgba(79,70,229,0.03) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }}/>

      <div className="contact-grid" style={{ 
        width: '100%', 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        gap: '100px',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* LEFT SIDE: Typography & Details */}
        <div style={{ flex: '1 1 40%' }}>
          <h2 ref={addToRefs} style={{ 
            fontSize: 'clamp(3rem, 6vw, 5rem)', 
            fontWeight: '900', 
            lineHeight: '1',
            letterSpacing: '-0.04em',
            color: '#ffffff',
            margin: '0 0 30px 0'
          }}>
            Let's build <br/> 
            <span style={{ color: '#4f46e5' }}>the next big thing.</span>
          </h2>
          
          <p ref={addToRefs} style={{ color: '#a3a3a3', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '50px', maxWidth: '400px' }}>
            Whether you need a full-stack architect to scale your infrastructure or a developer to execute your MVP, I'm ready to talk code.
          </p>

          <div ref={addToRefs} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div>
              <p style={{ color: '#555', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: '700' }}>Direct Email</p>
              <a href="mailto:prateekshekhawat7@gmail.com" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem', fontWeight: '500' }}>prateekshekhawat7@gmail.com</a>
            </div>
            
            <div>
              <p style={{ color: '#555', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: '700' }}>Phone</p>
              <a href="tel:+918076067753" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem', fontWeight: '500' }}>+91-8076067753</a>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
              <a href="https://www.linkedin.com/in/prateekshekhawat/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn ↗</a>
              <a href="https://github.com/shekhawatprateek" target="_blank" rel="noopener noreferrer" className="social-link">GitHub ↗</a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: The Glass Form */}
        <div ref={formRef} style={{ flex: '1 1 60%' }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            padding: 'clamp(30px, 5vw, 50px)',
            backdropFilter: 'blur(10px)'
          }}>
            <form onSubmit={handleSubmit} data-netlify="true" name="contact">
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div className="input-group" style={{ flex: '1 1 200px', marginBottom: '20px' }}>
                  <input 
                    type="text" 
                    name="name" 
                    id="name"
                    className="premium-input" 
                    placeholder=" " 
                    required 
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <label htmlFor="name" className="floating-label">Your Name</label>
                </div>

                <div className="input-group" style={{ flex: '1 1 200px', marginBottom: '20px' }}>
                  <input 
                    type="email" 
                    name="email" 
                    id="email"
                    className="premium-input" 
                    placeholder=" " 
                    required 
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <label htmlFor="email" className="floating-label">Email Address</label>
                </div>
              </div>

              <div className="input-group">
                <input 
                  type="text" 
                  name="subject" 
                  id="subject"
                  className="premium-input" 
                  placeholder=" " 
                  required 
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                />
                <label htmlFor="subject" className="floating-label">Subject</label>
              </div>

              <div className="input-group">
                <textarea 
                  name="message" 
                  id="message"
                  className="premium-input" 
                  placeholder=" " 
                  required
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                ></textarea>
                <label htmlFor="message" className="floating-label">Your Message</label>
              </div>

              {/* THE BUTTON */}
              <button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                style={{
                  width: '100%',
                  padding: '18px',
                  backgroundColor: isSuccess ? '#10b981' : '#ffffff', // Turns green on success
                  color: isSuccess ? '#ffffff' : '#000000',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: (isSubmitting || isSuccess) ? 'default' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  if(!isSubmitting && !isSuccess) e.currentTarget.style.backgroundColor = '#e5e5e5';
                }}
                onMouseLeave={(e) => {
                  if(!isSubmitting && !isSuccess) e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                {isSubmitting ? 'Sending...' : isSuccess ? 'Message Received ✓' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;