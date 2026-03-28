import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend Engineering",
    description: "Building highly interactive, scalable user interfaces.",
    tech: ["React.js", "Redux", "Tailwind CSS", "GSAP", "Three.js / WebGL"],
    gridArea: "span 1 / span 2" // Takes up wider space on desktop
  },
  {
    title: "Backend & Data",
    description: "Architecting robust server-side logic and databases.",
    tech: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth"],
    gridArea: "span 1 / span 1"
  },
  {
    title: "Systems & Deployment",
    description: "Taking products from local code to live production.",
    tech: ["System Design", "Git / GitHub", "Vercel / Netlify", "CI/CD", "Agile Flow"],
    gridArea: "span 1 / span 1"
  },
  {
    title: "Industry Focus",
    description: "Applying tech to solve real business bottlenecks.",
    tech: ["SaaS Architecture", "Manufacturing ERPs", "Logistics Tech", "Startup MVPs"],
    gridArea: "span 1 / span 2"
  }
];

const Skills = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    // Staggered pop-in animation for the bento boxes
    gsap.fromTo(gridRef.current.children,
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)", // Gives it a slight, premium "bounce" into place
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      id="skills" // The ID your Navbar is looking for
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        backgroundColor: '#050505',
        padding: 'clamp(80px, 10vw, 150px) 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTop: '1px solid #111'
      }}
    >
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
          color: '#ffffff', 
          fontWeight: '900',
          marginBottom: 'clamp(40px, 6vw, 80px)',
        }}>
          THE ARSENAL.
        </h2>

        {/* The Bento Box Grid */}
        <div 
          ref={gridRef}
          style={{
            display: 'grid',
            // Responsive grid: 1 column on mobile, 3 columns on desktop
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            width: '100%'
          }}
        >
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: '#111111',
                borderRadius: '24px',
                padding: '40px 30px',
                border: '1px solid #222',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#4f46e5';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '10px' }}>
                  {category.title}
                </h3>
                <p style={{ color: '#888888', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '30px' }}>
                  {category.description}
                </p>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {category.tech.map((item, i) => (
                  <span 
                    key={i} 
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#d4d4d4',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;