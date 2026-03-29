import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: "01",
    title: "MVP Development",
    description: "I partner with early-stage founders to architect and deploy fully functional, scalable platforms in 4-6 weeks using the MERN stack. Stop relying on no-code tools; get production-ready architecture from day one."
  },
  {
    id: "02",
    title: "Legacy System Modernization",
    description: "Traditional businesses lose thousands to chaotic Excel sheets and fragmented communication. I build custom internal dashboards, inventory trackers, and CRMs that automate your operations and plug the leaks."
  },
  {
    id: "03",
    title: "Technical Consulting",
    description: "Not sure what tech stack you need? I provide straight-talking, unbiased technical audits for your business and map out the exact digital infrastructure required for your next phase of growth."
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  useGSAP(() => {
    // Select all the service items
    const items = gsap.utils.toArray('.service-item');

    // Staggered slide-up animation when the section enters the viewport
    gsap.fromTo(items, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Triggers when the top of the section is 75% down the screen
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      id="services"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        padding: 'clamp(50px, 10vw, 150px) 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
          color: '#ffffff', 
          fontWeight: '900',
          marginBottom: 'clamp(30px, 5vw, 60px)',
          borderBottom: '2px solid #222',
          paddingBottom: '20px'
        }}>
          CAPABILITIES.
        </h2>

        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="service-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '30px',
                backgroundColor: '#111111',
                borderRadius: '16px',
                border: '1px solid #222',
                transition: 'border-color 0.3s ease'
              }}
              // Simple hover effect using inline events for now
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3496F7'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#222'}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px' }}>
                <span style={{ color: '#3496F7', fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 'bold' }}>
                  {service.id}
                </span>
                <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#ffffff', margin: 0 }}>
                  {service.title}
                </h3>
              </div>
              <p style={{ 
                color: '#a3a3a3', 
                fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
                lineHeight: '1.6',
                marginLeft: 'clamp(0px, 4vw, 45px)' // Indents the text slightly on desktop
              }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;