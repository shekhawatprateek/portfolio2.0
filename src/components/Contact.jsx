import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const textRefs = useRef([]);
  
  const [, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useGSAP(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    // 🔥 Paste your Web3Forms Access Key here 🔥
    formData.append("access_key", "90ae42a5-c357-418d-bf4b-2e13d98c2be1"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setIsSuccess(true);
        e.target.reset(); 
        setTimeout(() => setIsSuccess(false), 6000);
      } else {
        setIsSubmitting(false);
        alert("Something went wrong. Please email me directly.");
      }
    } catch (error) {
      setIsSubmitting(false);
      alert("Network error. Please check your connection.");
    }
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
          .input-group { position: relative; margin-bottom: 30px; }

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
            border-color: #3496F7;
            box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
          }

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
            color: #3496F7;
            font-weight: 600;
          }

          textarea.premium-input { min-height: 150px; resize: vertical; }

          /* THE ELITE SOCIAL NODES */
          .social-nodes {
            display: flex;
            gap: 16px;
            margin-top: 20px;
          }

          .social-icon-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #a3a3a3;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
          }

          .social-icon-btn svg {
            width: 22px;
            height: 22px;
            fill: currentColor;
            transition: transform 0.4s ease;
          }

          .social-icon-btn:hover {
            background-color: #ffffff;
            color: #000000;
            transform: translateY(-4px);
            box-shadow: 0 10px 25px rgba(255, 255, 255, 0.15);
          }

          .social-icon-btn:hover svg {
            transform: scale(1.1);
          }

          /* EDITORIAL STICKY LAYOUT */
          .contact-left {
            flex: 1 1 40%;
            position: sticky;
            top: 15%; 
            height: fit-content;
          }

          .contact-right {
            flex: 1 1 60%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          /* SUCCESS STATE ANIMATION */
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .success-screen {
            animation: slideUpFade 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: 100%;
            min-height: 350px;
          }

          @media (max-width: 900px) {
            .contact-grid { flex-direction: column; gap: 60px; }
            .contact-left { position: relative; top: 0; } 
          }
        `}
      </style>

      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '80vw', height: '80vh',
        background: 'radial-gradient(circle, rgba(79,70,229,0.03) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none', zIndex: 0
      }}/>

      <div className="contact-grid" style={{ 
        width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '80px', position: 'relative', zIndex: 1
      }}>
        
        {/* LEFT SIDE: Sticky Typography & Details */}
        <div className="contact-left">
          <h2 ref={addToRefs} style={{ 
            fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '900', lineHeight: '1',
            letterSpacing: '-0.04em', color: '#ffffff', margin: '0 0 20px 0'
          }}>
            Let's build <br/> 
            <span style={{ color: '#3496F7' }}>the next big thing together.</span>
          </h2>
          
          <p ref={addToRefs} style={{ color: '#ffffff', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '40px', maxWidth: '400px' }}>
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

            {/* THE SVG SOCIAL NODES REPLACING TEXT LINKS */}
            <div className="social-nodes">
              <a href="https://www.linkedin.com/in/prateekshekhawat/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com/shekhawatprateek" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: The Glass Form */}
        <div ref={formRef} className="contact-right">
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            padding: 'clamp(30px, 5vw, 50px)',
            backdropFilter: 'blur(10px)',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            
            {isSuccess ? (
              <div className="success-screen">
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px' }}>Transmission Secured.</h3>
                <p style={{ color: '#a3a3a3', fontSize: '1rem', lineHeight: '1.5' }}>Your message has been routed directly to my inbox. <br/> I will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-netlify="true" name="contact">
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div className="input-group" style={{ flex: '1 1 200px', marginBottom: '20px' }}>
                    <input type="text" name="name" id="name" className="premium-input" placeholder=" " required onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} />
                    <label htmlFor="name" className="floating-label">Your Name</label>
                  </div>
                  <div className="input-group" style={{ flex: '1 1 200px', marginBottom: '20px' }}>
                    <input type="email" name="email" id="email" className="premium-input" placeholder=" " required onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
                    <label htmlFor="email" className="floating-label">Email Address</label>
                  </div>
                </div>

                <div className="input-group">
                  <input type="text" name="subject" id="subject" className="premium-input" placeholder=" " required onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField(null)} />
                  <label htmlFor="subject" className="floating-label">Subject</label>
                </div>

                <div className="input-group">
                  <textarea name="message" id="message" className="premium-input" placeholder=" " required onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}></textarea>
                  <label htmlFor="message" className="floating-label">Your Message</label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    width: '100%', padding: '18px', backgroundColor: '#ffffff', color: '#000000',
                    border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '700',
                    cursor: isSubmitting ? 'default' : 'pointer', transition: 'all 0.3s ease',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'
                  }}
                  onMouseEnter={(e) => { if(!isSubmitting) e.currentTarget.style.backgroundColor = '#e5e5e5'; }}
                  onMouseLeave={(e) => { if(!isSubmitting) e.currentTarget.style.backgroundColor = '#ffffff'; }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                      </svg>
                      Routing...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;