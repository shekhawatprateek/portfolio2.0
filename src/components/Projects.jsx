import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "RideFlow",
    category: "Ride Booking Platform",
    description: "Engineering a high-concurrency ride-hailing system. Integrated real-time geospatial tracking via Google Maps API and low-latency driver-rider synchronization with Socket.io.",
    tech: ["React.js", "Node.js", "Socket.io", "MongoDB"],
    year: "2024",
    accent: "#10b981", 
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop", 
    link: "https://rideflow-frontend.vercel.app/", 
    linkType: "View Live Demo"
  },
  {
    title: "Netflix Architecture",
    category: "Streaming UI / UX",
    description: "Architecting a high-fidelity streaming interface. Optimized for asynchronous data fetching and complex state management across thousands of dynamic media assets.",
    tech: ["React.js", "REST APIs", "Redux"],
    year: "2023",
    accent: "#ef4444", 
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop", 
    link: "https://shekhawatprateek.github.io/NetflixClone/",
    linkType: "View Live Demo"
  },
  {
    title: "ClickServe",
    category: "Frontend Application",
    description: "A foundational build demonstrating early mastery of responsive design and CI/CD pipelines. Deployed with focus on load-time performance and cross-browser stability.",
    tech: ["JavaScript", "HTML5", "CSS3", "Netlify"],
    year: "2021",
    accent: "#3496F7", 
    image: "./clickserve.png", 
    link: "https://clickserve.netlify.app/", 
    linkType: "View Live Demo"
  }
];

const Work = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.project-card');

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return;

      gsap.to(card, {
        scale: 0.92, 
        opacity: 0.4, 
        filter: "blur(4px)", 
        transformOrigin: "top center", 
        scrollTrigger: {
          trigger: cards[index + 1], 
          start: "top 80%", 
          end: "top 20%", 
          scrub: true, 
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section 
      id="projects" 
      ref={containerRef}
      style={{
        backgroundColor: '#000000',
        padding: 'clamp(60px, 10vw, 120px) 0',
        paddingBottom: '30vh', 
      }}
    >
      <style>
        {`
          .cards-container {
            position: relative;
          }

          .project-card {
            position: sticky;
            top: 15%; 
            width: 92%;
            max-width: 1100px;
            height: auto;
            min-height: 550px;
            margin: 0 auto 10vh auto; 
            border-radius: 32px;
            background-color: #080808;
            border: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            flex-direction: row;
            overflow: hidden;
            box-shadow: 0 -20px 40px rgba(0,0,0,0.8); 
            box-sizing: border-box;
            will-change: transform, opacity, filter; 
          }

          .card-content-left {
            flex: 1.2;
            padding: clamp(30px, 5vw, 60px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-sizing: border-box;
            z-index: 2; 
          }

          .card-visual-right {
            flex: 1;
            position: relative;
            background: #000;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mockup-image { 
            width: 100%; 
            height: 100%; 
            object-fit: cover; 
            transition: transform 0.8s ease;
          }

          .project-card:hover .mockup-image {
            transform: scale(1.05);
          }

          .project-desc {
            font-family: 'Satoshi', sans-serif;
            font-size: 1.15rem;
            line-height: 1.75;
            color: #c2c2c2; 
            font-weight: 500; 
            margin-bottom: 35px;
            letter-spacing: 0.02em; 
          }

          .tech-tag {
            position: relative;
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--accent-color);
            background-color: rgba(10, 10, 10, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.08);
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1;
            backdrop-filter: blur(10px);
            cursor: default;
          }

          .tech-tag::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: var(--accent-color);
            opacity: 0.08;
            z-index: -1;
            transition: opacity 0.3s ease;
          }

          .tech-tag:hover {
            border-color: var(--accent-color);
            transform: translateY(-3px);
            color: #ffffff;
          }

          .tech-tag:hover::before { opacity: 0.8; }

          .project-link-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-top: 32px;
            padding: 18px 32px;
            background-color: #ffffff;
            color: #000000;
            font-weight: 900;
            border-radius: 50px;
            text-decoration: none;
            font-size: 1rem;
            width: fit-content;
            transition: all 0.3s ease;
            box-sizing: border-box;
            font-family: 'Satoshi', sans-serif;
            pointer-events: auto !important; 
            flex-shrink: 0; /* Prevents the button from squishing */
          }

          .project-link-btn:hover {
            background-color: var(--accent-color);
            color: #ffffff;
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }

          /* --- MOBILE ARCHITECTURE FIXES --- */
          @media (max-width: 850px) {
            .project-card {
              flex-direction: column; 
              width: 90%;
              min-height: auto;
              
              /* THE FIX: dvh (dynamic viewport height) respects the browser's URL bar */
              top: 8dvh; 
              margin: 0 auto 5dvh auto; 
              
              /* Failsafe: Never let the card be taller than the actual visible screen */
              max-height: 84dvh; 
            }

            .card-visual-right {
              /* Shrink the image so the text and button have more room */
              height: 200px; 
              flex: none;
              width: 100%;
            }

            .card-content-left {
              /* Reduce padding to give the button breathing room */
              padding: 24px 20px 24px 20px; 
              width: 100%;
              flex: 1; /* Allows this container to take up remaining space */
              box-sizing: border-box;
              
              /* Failsafe 2: If the phone screen is TINY, allow internal scrolling instead of cutting off */
              overflow-y: auto; 
            }

            .project-card h3 { 
                font-size: 2rem !important; 
                margin-bottom: 10px !important;
            }
            
            .project-desc {
                font-size: 1rem !important;
                margin-bottom: 20px !important;
                line-height: 1.5 !important;
            }

            .project-link-btn {
              width: 100%; 
              margin-top: 20px;
            }

            .tech-tag {
                font-size: 0.75rem !important;
                padding: 6px 12px !important;
            }
          }
        `}
      </style>

      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
          color: '#ffffff', 
          fontWeight: '900',
          marginBottom: '80px',
          textAlign: 'center',
          fontFamily: 'Clash Display',
        }}>
          THINGS I <span style={{ color: '#3496F7' }}>SHIPPED</span>
        </h2>

        <div className="cards-container">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card"
              style={{ '--accent-color': project.accent }}
            >
              {/* IMAGE SECTION */}
              <div className="card-visual-right">
                <img src={project.image} alt={project.title} className="mockup-image" />
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                    background: `linear-gradient(to top, #080808, transparent)`,
                    zIndex: 1
                }}/>
              </div>

              {/* CONTENT SECTION */}
              <div className="card-content-left">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' }}>
                  <span style={{ color: project.accent, fontWeight: '800', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    {project.category}
                  </span>
                  <span style={{ color: '#444', fontWeight: '900', fontSize: '1rem', fontFamily: 'monospace' }}>
                    {project.year}
                  </span>
                </div>

                <h3 style={{ color: '#ffffff', fontSize: '3rem', fontWeight: '900', marginBottom: '15px', lineHeight: '1', letterSpacing: '-0.03em', fontFamily: 'Clash Display' }}>
                    {project.title}
                </h3>
                
                <p className="project-desc">
                    {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.tech.map((t, i) => (
                    <span key={i} className="tech-tag">
                        {t}
                    </span>
                  ))}
                </div>

                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                  <span>{project.linkType}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ flexShrink: 0 }}>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;