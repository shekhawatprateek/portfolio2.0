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
    accent: "#10b981", // Emerald Green
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
    accent: "#ef4444", // Cinematic Red
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
    accent: "#3496F7", // Tech Blue
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
        scale: 0.9, 
        opacity: 0,
        scrollTrigger: {
          trigger: cards[index + 1], 
          start: "top 85%", 
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
        paddingBottom: '20vh',
        overflow: 'hidden'
      }}
    >
      <style>
        {`
          .project-card {
            position: sticky;
            top: 12%; 
            width: 92%;
            max-width: 1100px;
            height: auto;
            min-height: 550px;
            margin: 0 auto 12vh auto;
            border-radius: 32px;
            background-color: #080808;
            border: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            flex-direction: row;
            overflow: hidden;
            box-shadow: 0 -20px 60px rgba(0,0,0,0.9);
            transform-origin: top center; 
            box-sizing: border-box;
          }

          .card-content-left {
            flex: 1.2;
            padding: clamp(30px, 5vw, 60px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-sizing: border-box;
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

          /* --- UPGRADED DESCRIPTION TYPOGRAPHY --- */
          .project-desc {
            font-family: 'Satoshi', sans-serif;
            font-size: 1.15rem;
            line-height: 1.75;
            color: #c2c2c2; /* Crisp Silver */
            font-weight: 500; /* Just enough weight to look sharp */
            margin-bottom: 35px;
            letter-spacing: 0.02em; /* Editorial tracking */
          }

          /* --- UPGRADED PREMIUM TECH TAGS --- */
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

          .tech-tag:hover::before {
            opacity: 0.8; 
          }

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
          }

          .project-link-btn:hover {
            background-color: var(--accent-color);
            color: #ffffff;
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }

          /* MOBILE FIXES */
          @media (max-width: 850px) {
            .project-card {
              flex-direction: column; 
              width: 90%;
              min-height: auto;
              top: 8%;
            }

            .card-visual-right {
              height: 220px;
              flex: none;
              width: 100%;
            }

            .card-content-left {
              padding: 32px 24px;
              width: 100%;
              flex: none;
              box-sizing: border-box;
            }

            .project-card h3 { 
                font-size: 2.2rem !important; 
                margin-bottom: 12px !important;
            }
            
            .project-desc {
                font-size: 1.05rem !important;
                margin-bottom: 25px !important;
            }

            .project-link-btn {
              width: 100%; 
              margin-top: 24px;
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
          // letterSpacing: '-0.02em'
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
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                  <span style={{ color: project.accent, fontWeight: '800', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    {project.category}
                  </span>
                  <span style={{ color: '#444', fontWeight: '900', fontSize: '1rem', fontFamily: 'monospace' }}>
                    {project.year}
                  </span>
                </div>

                <h3 style={{ color: '#ffffff', fontSize: '3rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1', letterSpacing: '-0.03em', fontFamily: 'Clash Display' }}>
                    {project.title}
                </h3>
                
                {/* UPGRADED DESCRIPTION */}
                <p className="project-desc">
                    {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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