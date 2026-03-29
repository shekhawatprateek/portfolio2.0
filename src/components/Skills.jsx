import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const techLogos = [
  { name: "React",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { name: "MongoDB",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "HTML5",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript",  url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript",  url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Tailwind",    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Material UI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg" },
  { name: "Linux",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "Git",         url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Redux",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg" },
];

const skillCategories = [
  {
    title: "Core Languages",
    description: "The foundational syntax and logic driving my applications.",
    tech: [
      { name: "JavaScript (ES6+)", score: 95 },
      { name: "TypeScript",        score: 80 },
      { name: "HTML5",             score: 95 },
      { name: "CSS3",              score: 95 }
    ],
    gridClass: "col-span-1 md:col-span-1",
    accent: "#f59e0b"
  },
  {
    title: "Frontend Engineering",
    description: "Building highly interactive, scalable user interfaces.",
    tech: [
      { name: "React.js",    score: 95 },
      { name: "Redux",       score: 90 },
      { name: "Material UI", score: 80 },
      { name: "Tailwind CSS",score: 80 }
    ],
    gridClass: "col-span-1 md:col-span-1",
    accent: "#3b82f6"
  },
  {
    title: "Backend Architecture",
    description: "Architecting robust server-side logic and secure REST APIs.",
    tech: [
      { name: "Node.js",      score: 95 },
      { name: "Express.js",   score: 95 },
      { name: "REST APIs",    score: 95 },
      { name: "JWT & OAuth 2.0", score: 90 }
    ],
    gridClass: "col-span-1 md:col-span-1",
    accent: "#10b981"
  },
  {
    title: "Databases",
    description: "Structuring, storing, and querying complex data.",
    tech: [
      { name: "MongoDB", score: 95 },
      { name: "Redis",   score: 80 }
    ],
    gridClass: "col-span-1 md:col-span-1",
    accent: "#ef4444"
  },
  {
    title: "Tools & Platforms",
    description: "Version control, deployment, and real-time infrastructure.",
    tech: [
      { name: "Git",       score: 95 },
      { name: "GitHub",    score: 95 },
      { name: "Socket.io", score: 90 }
    ],
    gridClass: "col-span-1 md:col-span-2",
    accent: "#8b5cf6"
  }
];

// ─── Marquee ─────────────────────────────────────────────────────────────────

const InfiniteMarquee = () => {
  const duplicatedLogos = [...techLogos, ...techLogos];
  return (
    <div className="marquee-container">
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

// ─── Skill Bar (replaces SkillPill) ──────────────────────────────────────────

const SkillBar = ({ tech, accentColor }) => {
  const barRef    = useRef(null);
  const numberRef = useRef(null);
  const itemRef   = useRef(null);

  useGSAP(() => {
    const counter = { val: 0 };
    const scrollConfig = {
      trigger: itemRef.current,
      start: "top 95%",
      toggleActions: "play none none reverse"
    };

    // Animate counter
    gsap.fromTo(counter, { val: 0 }, {
      val: tech.score,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: scrollConfig,
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.innerText = Math.floor(counter.val) + "%";
        }
      }
    });

    // Animate bar — GPU-friendly scaleX
    gsap.fromTo(barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "power3.out", scrollTrigger: scrollConfig }
    );
  }, []);

  return (
    <div ref={itemRef}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '8px'
      }}>
        <span style={{
          color: '#c8c8c7', fontSize: '0.875rem',
          fontWeight: '600', letterSpacing: '0.01em'
        }}>
          {tech.name}
        </span>
        <span ref={numberRef} style={{
          color: accentColor, fontSize: '0.78rem', fontWeight: '800',
          fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em'
        }}>
          0%
        </span>
      </div>

      {/* Track */}
      <div style={{
        height: '2px', background: 'rgba(255,255,255,0.07)',
        borderRadius: '999px', overflow: 'hidden'
      }}>
        {/* Fill */}
        <div ref={barRef} style={{
          height: '100%',
          width: `${tech.score}%`,
          background: `linear-gradient(90deg, ${accentColor}60, ${accentColor})`,
          borderRadius: '999px',
          transformOrigin: 'left center',
          boxShadow: `0 0 10px ${accentColor}55`
        }}/>
      </div>
    </div>
  );
};

// ─── Spotlight Card ───────────────────────────────────────────────────────────

const SpotlightCard = ({ category, index }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity]   = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const indexLabel = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`bento-card ${category.gridClass}`}
      style={{
        position: 'relative',
        backgroundColor: '#080808',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1), border-color 0.4s ease, box-shadow 0.4s ease',
        '--card-accent': category.accent
      }}
    >
      {/* ① Top accent hairline */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: `linear-gradient(90deg, transparent 0%, ${category.accent}70 30%, ${category.accent} 50%, ${category.accent}70 70%, transparent 100%)`,
        zIndex: 4
      }}/>

      {/* ② Radial spotlight on hover */}
      <div style={{
        position: 'absolute', pointerEvents: 'none', inset: 0,
        opacity, transition: 'opacity 0.4s ease',
        background: `radial-gradient(700px circle at ${position.x}px ${position.y}px, ${category.accent}11, transparent 40%)`,
        zIndex: 1
      }}/>

      {/* ③ Dot grid on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
        opacity: opacity * 0.55,
        pointerEvents: 'none', zIndex: 1, transition: 'opacity 0.4s ease'
      }}/>

      {/* ④ Card content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '32px 36px 36px' }}>

        {/* Header row */}
        <div style={{
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between', marginBottom: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
              backgroundColor: category.accent,
              boxShadow: `0 0 8px ${category.accent}, 0 0 18px ${category.accent}40`
            }}/>
            <h3 style={{
              color: '#efefef', fontSize: '1.05rem',
              fontWeight: '700', margin: 0, letterSpacing: '0.01em'
            }}>
              {category.title}
            </h3>
          </div>

          {/* Index number */}
          <span style={{
            color: category.accent, fontSize: '0.68rem', fontWeight: '900',
            opacity: 0.45, letterSpacing: '0.12em', paddingTop: '3px'
          }}>
            {indexLabel}
          </span>
        </div>

        {/* Description */}
        <p style={{
          color: '#aeaeae', fontSize: '0.82rem',
          lineHeight: '1.65', marginBottom: '28px', marginLeft: '17px'
        }}>
          {category.description}
        </p>

        {/* Skill bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {category.tech.map((techItem, i) => (
            <SkillBar key={i} tech={techItem} accentColor={category.accent} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────

const Skills = () => {
  const sectionRef = useRef(null);
  const gridRef    = useRef(null);

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
    <section
      id="skills"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        padding: 'clamp(80px, 10vw, 150px) 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <style>{`
        /* Subtle grain texture */
        #skills::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.022;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Marquee ─────────────────────── */
        .marquee-container {
          width: 100vw; max-width: 100%; overflow: hidden;
          display: flex; position: relative; margin-bottom: 100px;
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }
        .marquee-track {
          display: flex; width: fit-content;
          animation: skills-scroll 35s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes skills-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-item {
          display: flex; justify-content: center; align-items: center;
          width: clamp(90px, 11vw, 150px); padding: 0 40px;
        }
        .tech-logo-img {
          width: 42px; height: 42px; object-fit: contain;
          filter: grayscale(100%) opacity(28%);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .tech-logo-img:hover {
          filter: grayscale(0%) opacity(100%);
          transform: scale(1.2) translateY(-3px);
        }

        /* ── Bento grid ──────────────────── */
        .bento-grid { display: grid; grid-template-columns: 1fr; gap: 14px; width: 100%; }

        @media (min-width: 900px) {
          .bento-grid { grid-template-columns: repeat(3, 1fr); }
          .md\\:col-span-1 { grid-column: span 1 / span 1; }
          .md\\:col-span-2 { grid-column: span 2 / span 2; }
        }

        @media (max-width: 900px) {
          .bento-grid  { gap: 10px; }
          .tech-logo-img { width: 34px; height: 34px; }
          .marquee-item  { padding: 0 24px; }
        }

        /* ── Card hover ──────────────────── */
        .bento-card:hover {
          transform: translateY(-5px);
          border-color: color-mix(in srgb, var(--card-accent) 35%, transparent) !important;
          box-shadow:
            0 24px 60px rgba(0, 0, 0, 0.55),
            0 0 0 1px color-mix(in srgb, var(--card-accent) 12%, transparent);
        }
      `}</style>

      <InfiniteMarquee />

      <div style={{ width: '100%', maxWidth: '1200px', position: 'relative', zIndex: 1 }}>

        {/* ── Section heading ────────────── */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 80px)' }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
            <span style={{
              fontSize: '0.68rem', color: '#333', fontWeight: '700',
              letterSpacing: '0.2em', textTransform: 'uppercase'
            }}>
              Skills &amp; Tools
            </span>
            <div style={{
              flex: 1, height: '1px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)'
            }}/>
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: '#ffffff', fontWeight: '900',
            letterSpacing: '-0.03em', margin: 0, lineHeight: 1
          }}>
            MY ARSENAL<span style={{ color: '#3496F7' }}>.</span>
          </h2>
        </div>

        {/* ── Grid ───────────────────────── */}
        <div ref={gridRef} className="bento-grid">
          {skillCategories.map((category, index) => (
            <SpotlightCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;