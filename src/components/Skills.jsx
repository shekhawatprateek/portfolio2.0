import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const techLogos = [
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Material UI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg" },
  { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Redux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg" },
];

const skillCategories = [
  {
    title: "Core Languages",
    description: "The foundational syntax and logic driving my applications.",
    tech: [
      { name: "JavaScript (ES6+)", score: 95 },
      { name: "TypeScript", score: 85 },
      { name: "HTML5", score: 95 },
      { name: "CSS3", score: 90 }
    ],
    // THE FIX: Changed to 1 column to balance the grid
    gridClass: "col-span-1 md:col-span-1",
    accent: "#f59e0b" 
  },
  {
    title: "Frontend Engineering",
    description: "Building highly interactive, scalable user interfaces.",
    tech: [
      { name: "React.js", score: 95 },
      { name: "Redux", score: 90 },
      { name: "Material UI", score: 88 },
      { name: "Tailwind CSS", score: 92 }
    ],
    // THE FIX: Dropped from col-span-2 to col-span-1 to eliminate the empty gap
    gridClass: "col-span-1 md:col-span-1",
    accent: "#3b82f6" 
  },
  {
    title: "Backend Architecture",
    description: "Architecting robust server-side logic and secure REST APIs.",
    tech: [
      { name: "Node.js", score: 92 },
      { name: "Express.js", score: 90 },
      { name: "REST APIs", score: 95 },
      { name: "JWT & OAuth 2.0", score: 88 }
    ],
    // THE FIX: Dropped to col-span-1
    gridClass: "col-span-1 md:col-span-1",
    accent: "#10b981" 
  },
  {
    title: "Databases",
    description: "Structuring, storing, and querying complex data.",
    tech: [
      { name: "MongoDB", score: 90 },
      { name: "Redis", score: 80 }
    ],
    gridClass: "col-span-1 md:col-span-1",
    accent: "#ef4444" 
  },
  {
    title: "Tools & Platforms",
    description: "Version control, deployment, and real-time infrastructure.",
    tech: [
      { name: "Git", score: 95 },
      { name: "GitHub", score: 95 },
      { name: "Socket.io", score: 88 }
    ],
    // Takes up the remaining 2 columns on the bottom row
    gridClass: "col-span-1 md:col-span-2", 
    accent: "#8b5cf6" 
  }
];

const InfiniteMarquee = () => {
  const duplicatedLogos = [...techLogos, ...techLogos];

  return (
    <div className="marquee-container" style={{ marginBottom: '80px' }}>
      <div className="marquee-track">
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="marquee-item" title={logo.name}>
            <img src={logo.url} alt={logo.name} className="tech-logo-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillPill = ({ tech, accentColor }) => {
  const numberRef = useRef(null);
  // We added a pillRef to give GSAP a larger, more stable trigger area
  const pillRef = useRef(null);

  useGSAP(() => {
    const counter = { val: 0 };
    
    gsap.fromTo(counter, 
      { val: 0 }, 
      {
        val: tech.score,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pillRef.current,
          start: "top 95%", 
          // THE FIX: play on scroll down, reverse on scroll up
          toggleActions: "play none none reverse" 
        },
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = Math.floor(counter.val) + "%";
          }
        }
      }
    );
  }, []);

  return (
    <div ref={pillRef} className="tech-pill" style={{ '--pill-accent': accentColor }}>
      <span style={{ fontWeight: '600', color: '#e5e5e5' }}>{tech.name}</span>
      <span ref={numberRef} style={{ fontWeight: '900', color: accentColor, fontVariantNumeric: 'tabular-nums' }}>
        0%
      </span>
    </div>
  );
};
const SpotlightCard = ({ category }) => {
  const divRef = useRef(null);
  const [isFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`bento-card ${category.gridClass}`}
      style={{
        position: 'relative',
        backgroundColor: '#0a0a0a',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s ease',
        '--card-accent': category.accent
      }}
    >
      <div style={{
        position: 'absolute', pointerEvents: 'none', top: 0, left: 0, right: 0, bottom: 0,
        opacity: opacity, transition: 'opacity 0.4s ease',
        background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${category.accent}15, transparent 40%)`,
        zIndex: 1,
      }}/>
      
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px', opacity: opacity * 0.5, pointerEvents: 'none', zIndex: 1, transition: 'opacity 0.4s ease'
      }}/>

      <div style={{ position: 'relative', zIndex: 2, marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: category.accent, boxShadow: `0 0 15px ${category.accent}` }} />
          <h3 style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: '800', margin: 0 }}>{category.title}</h3>
        </div>
        <p style={{ color: '#a3a3a3', fontSize: '1rem', lineHeight: '1.6' }}>{category.description}</p>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', position: 'relative', zIndex: 2 }}>
        {category.tech.map((techItem, i) => (
          <SkillPill key={i} tech={techItem} accentColor={category.accent} />
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(gridRef.current.children,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", 
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} style={{ minHeight: '100vh', backgroundColor: '#000000', padding: 'clamp(80px, 10vw, 150px) 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
      <style>
        {`
          .marquee-container { width: 100vw; max-width: 100%; overflow: hidden; display: flex; position: relative; mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); }
          .marquee-track { display: flex; width: fit-content; animation: scroll 35s linear infinite; }
          .marquee-track:hover { animation-play-state: paused; }
          @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee-item { width: clamp(100px, 12vw, 160px); display: flex; justify-content: center; align-items: center; padding: 0 50px; }
          .tech-logo-img { width: 80px; height: 80px; object-fit: contain; filter: grayscale(100%) opacity(40%); transition: all 0.3s ease; cursor: pointer; filter: drop-shadow(0 0 0 rgba(0,0,0,0)) grayscale(100%) opacity(40%); }
          .tech-logo-img:hover { filter: drop-shadow(0 10px 20px rgba(255,255,255,0.15)) grayscale(0%) opacity(100%); transform: scale(1.15); }

          .bento-grid { display: grid; grid-template-columns: 1fr; gap: 24px; width: 100%; }
          .bento-card { padding: 40px; }

          @media (min-width: 900px) {
            .bento-grid { grid-template-columns: repeat(3, 1fr); }
            .md\\:col-span-1 { grid-column: span 1 / span 1; }
            .md\\:col-span-2 { grid-column: span 2 / span 2; }
          }

          @media (max-width: 900px) {
            .bento-card { padding: 30px !important; }
            .bento-grid { gap: 16px; }
            .tech-logo-img { width: 55px; height: 55px; }
            .marquee-item { padding: 0 30px; }
          }

          .bento-card:hover { transform: translateY(-6px); border-color: var(--card-accent) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }

          .tech-pill { display: flex; align-items: center; gap: 12px; background-color: rgba(255, 255, 255, 0.03); padding: 12px 20px; border-radius: 12px; font-size: 0.95rem; border: 1px solid rgba(255, 255, 255, 0.08); transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; }
          .tech-pill:hover { background-color: rgba(255, 255, 255, 0.08); border-color: var(--pill-accent); transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
        `}
      </style>

      <InfiniteMarquee />

      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#ffffff', fontWeight: '900', marginBottom: 'clamp(40px, 6vw, 80px)', letterSpacing: '-0.02em' }}>
          MY ARSENAL.
        </h2>

        <div ref={gridRef} className="bento-grid">
          {skillCategories.map((category, index) => (
            <SpotlightCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;