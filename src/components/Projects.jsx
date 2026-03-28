import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// YOUR ACTUAL PROJECTS, ELEVATED.
const projects = [
  {
    title: "RideFlow",
    category: "Ride Booking Platform",
    description: "A full-stack application featuring real-time location tracking via Google Maps API and live driver-user communication using Socket.io. State managed with React Context API and backed by a robust Node/Express RESTful infrastructure.",
    tech: ["React.js", "Node.js", "Socket.io", "MongoDB"],
    year: "2024",
    theme: "#050505", 
    link: "https://github.com/shekhawatprateek", // Update with your actual live link
    linkType: "View Live Demo"
  },
  {
    title: "ChatCord",
    category: "Real-Time Infrastructure",
    description: "A bidirectional websocket architecture supporting concurrent connections for live chat environments. Engineered for low-latency communication and instant data delivery.",
    tech: ["Node.js", "Socket.io", "Express", "WebSockets"],
    year: "2023",
    theme: "#0a0a0a",
    link: "https://github.com/shekhawatprateek/ChatCord",
    linkType: "View Repository"
  },
  {
    title: "Netflix Architecture",
    category: "Streaming UI / UX",
    description: "High-fidelity frontend clone of Netflix's interface. Features dynamic asynchronous data fetching from TMDB, responsive media carousels, and complex state management.",
    tech: ["React.js", "REST APIs", "Dynamic Routing"],
    year: "2023",
    theme: "#111111", 
    link: "https://shekhawatprateek.github.io/NetflixClone/",
    linkType: "View Live Demo"
  },
  {
    title: "NodeKB CMS",
    category: "Content Management",
    description: "A full-stack knowledge base application featuring secure user registration, session authentication, and persistent CRUD operations for article management.",
    tech: ["Node.js", "Express", "MongoDB"],
    year: "2022",
    theme: "#161616", 
    link: "https://github.com/shekhawatprateek/nodekb",
    linkType: "View Repository"
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
        opacity: 0.3,
        filter: "blur(5px)",
        scrollTrigger: {
          trigger: card,
          start: "top 15%", 
          endTrigger: cards[index + 1], 
          end: "top 15%",
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
        padding: 'clamp(80px, 10vw, 150px) 20px',
        paddingBottom: '30vh' 
      }}
    >
      <style>
        {`
          .project-card {
            position: sticky;
            top: 15%; 
            width: 100%;
            max-width: 1100px;
            height: 70vh;
            min-height: 520px;
            margin: 0 auto 5vh auto;
            border-radius: 32px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 -20px 40px rgba(0,0,0,0.8);
            transform-origin: top center; 
          }

          .card-content {
            padding: clamp(30px, 5vw, 60px);
            display: flex;
            flex-direction: column;
            height: 100%;
            z-index: 2;
          }

          .tech-tag {
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 0.85rem;
            color: #a3a3a3;
            letter-spacing: 0.5px;
            background-color: rgba(255, 255, 255, 0.02);
          }

          /* THE PREMIUM LINK BUTTON */
          .project-link-btn {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            margin-top: auto;
            align-self: flex-start;
            padding: 14px 28px;
            background-color: #ffffff;
            color: #000000;
            font-weight: 700;
            border-radius: 50px;
            text-decoration: none;
            font-size: 0.95rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .project-link-btn:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 10px 30px rgba(255, 255, 255, 0.15);
            background-color: #f0f0f0;
          }

          .arrow-icon {
            transition: transform 0.3s ease;
          }

          .project-link-btn:hover .arrow-icon {
            transform: translateX(4px) rotate(-45deg);
          }

          @media (max-width: 768px) {
            .project-card {
              height: 65vh;
              top: 12%; 
            }
            .project-link-btn {
              padding: 12px 24px;
              width: 100%;
              justify-content: center;
            }
          }
        `}
      </style>

      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
          color: '#ffffff', 
          fontWeight: '900',
          marginBottom: 'clamp(60px, 8vw, 100px)',
          letterSpacing: '-0.02em',
          textAlign: 'center'
        }}>
          SELECTED WORKS.
        </h2>

        <div className="cards-container" style={{ position: 'relative' }}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card"
              style={{ backgroundColor: project.theme }}
            >
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
                opacity: 0.04,
                pointerEvents: 'none',
                zIndex: 1
              }}/>

              <div className="card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                  <span style={{ color: '#888', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                    {project.category}
                  </span>
                  <span style={{ color: '#4f46e5', fontWeight: '700', fontFamily: 'monospace', fontSize: '1.2rem' }}>
                    {project.year}
                  </span>
                </div>

                <h3 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '20px', lineHeight: '1' }}>
                  {project.title}
                </h3>
                
                <p style={{ color: '#a3a3a3', fontSize: 'clamp(1rem, 2vw, 1.1rem)', lineHeight: '1.6', maxWidth: '650px', marginBottom: '40px' }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
                  {project.tech.map((techItem, i) => (
                    <span key={i} className="tech-tag">
                      {techItem}
                    </span>
                  ))}
                </div>

                {/* THE INTERACTIVE LINK BUTTON */}
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                  {project.linkType}
                  <svg 
                    className="arrow-icon"
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
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