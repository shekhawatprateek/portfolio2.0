import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "SheetMetal ERP Sync",
    type: "Internal Business Tool",
    tech: "MERN • Redux • Tailwind",
    description: "A custom inventory and dispatch management system built to replace fragmented Excel sheets for an auto-parts manufacturer. Reduced inventory tracking errors by 80% and automated daily reporting.",
    color: "#1e1b4b" // Deep Indigo
  },
  {
    id: 2,
    title: "HyperLocal Logistics MVP",
    type: "Startup Architecture",
    tech: "React • Node.js • WebSockets",
    description: "Architected and deployed a minimum viable product for a local delivery startup in 5 weeks. Included real-time driver tracking and a vendor dashboard.",
    color: "#064e3b" // Deep Emerald
  },
  {
    id: 3,
    title: "DevAuth Boilerplate",
    type: "Digital Product",
    tech: "React • Express • JWT",
    description: "A secure, production-ready MERN authentication boilerplate with role-based access control. Built to accelerate MVP development timelines for freelance clients.",
    color: "#451a03" // Deep Amber
  }
];

const Projects = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Select all the individual project panels
    const panels = gsap.utils.toArray('.project-panel');

    // Create the horizontal scroll animation
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1), // Move left by 100% for each panel (except the first)
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,           // Lock the section in place vertically
        scrub: 1,            // Link animation to scrollbar smoothly
        snap: 1 / (panels.length - 1), // Optional: Snaps to the nearest project if they stop scrolling
        end: "+=3000",       // Make the scroll last for 3000px so it doesn't fly by too fast
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      id="projects"
      ref={containerRef} 
      style={{ 
        height: '100vh', 
        width: '100vw', 
        overflow: 'hidden', // Hides the panels off-screen
        backgroundColor: '#050505',
        position: 'relative'
      }}
    >
      <div 
        style={{ 
          display: 'flex', 
          height: '100%', 
          width: `${projectsData.length * 100}vw` // 300vw for 3 projects
        }}
      >
        {projectsData.map((project) => (
          <div 
            key={project.id} 
            className="project-panel" 
            style={{ 
              width: '100vw', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            {/* The Project Card */}
            <div style={{
              backgroundColor: project.color,
              width: '100%',
              maxWidth: '1000px',
              height: '70%',
              borderRadius: '24px',
              padding: 'clamp(20px, 5vw, 60px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              <div>
                <p style={{ color: '#a3a3a3', letterSpacing: '2px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                  {project.type}
                </p>
                <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#ffffff', marginTop: '10px', fontWeight: '800', lineHeight: '1.1' }}>
                  {project.title}
                </h2>
              </div>
              
              <div>
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#d4d4d4', maxWidth: '600px', marginBottom: '20px', lineHeight: '1.6' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50px', color: '#fff', fontSize: '0.9rem' }}>
                    {project.tech}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;