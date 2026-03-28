import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// 1. UPDATED DATA: Every individual skill now has its own exact percentage
const skillCategories = [
  {
    title: "Frontend Engineering",
    description: "Building highly interactive, scalable user interfaces.",
    tech: [
      { name: "React.js", score: 95 },
      { name: "JavaScript (ES6+)", score: 92 },
      { name: "HTML & CSS", score: 96 },
      { name: "Tailwind / GSAP", score: 85 },
    ],
    gridClass: "col-span-1 md:col-span-2",
  },
  {
    title: "Backend Architecture",
    description: "Architecting robust server-side logic and REST APIs.",
    tech: [
      { name: "Node.js", score: 90 },
      { name: "Express.js", score: 88 },
      { name: "JWT Auth", score: 85 },
    ],
    gridClass: "col-span-1 md:col-span-1",
  },
  {
    title: "Database & Data",
    description: "Structuring and querying complex data systems.",
    tech: [
      { name: "MongoDB", score: 88 },
      { name: "Mongoose", score: 85 },
      { name: "Redis", score: 70 },
    ],
    gridClass: "col-span-1 md:col-span-1",
  },
  {
    title: "Systems & Tools",
    description: "Taking products from local code to live production.",
    tech: [
      { name: "Git & GitHub", score: 90 },
      { name: "Postman", score: 95 },
      { name: "Vercel / Heroku", score: 85 },
    ],
    gridClass: "col-span-1 md:col-span-2",
  },
];

// 2. NEW COMPONENT: Animates the individual number for each tech pill
const SkillPill = ({ tech }) => {
  const numberRef = useRef(null);

  useGSAP(() => {
    const counter = { val: 0 };
    gsap.to(counter, {
      val: tech.score,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: numberRef.current,
        start: "top 90%", // Starts animating as soon as the pill appears
      },
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.innerText = Math.floor(counter.val) + "%";
        }
      },
    });
  }, []);

  return (
    <div className="tech-pill">
      <span style={{ fontWeight: "600", color: "#e5e5e5" }}>{tech.name}</span>
      {/* High-contrast, brightly colored number so it pops instantly */}
      <span
        ref={numberRef}
        style={{
          fontWeight: "800",
          color: "#4f46e5", // A sharp, premium indigo color
          fontVariantNumeric: "tabular-nums", // Keeps the numbers from jumping around as they change
        }}
      >
        0%
      </span>
    </div>
  );
};

// 3. THE CARD COMPONENT
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
        position: "relative",
        backgroundColor: "#0a0a0a",
        borderRadius: "24px",
        // padding: '40px 30px',
        border: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        transition: "transform 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          pointerEvents: "none",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: opacity,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`,
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h3
          style={{
            color: "#ffffff",
            fontSize: "1.5rem",
            marginBottom: "10px",
            fontWeight: "700",
          }}
        >
          {category.title}
        </h3>
        <p
          style={{
            color: "#a3a3a3",
            fontSize: "0.95rem",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          {category.description}
        </p>
      </div>

      {/* Maps through the new individual SkillPills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {category.tech.map((techItem, i) => (
          <SkillPill key={i} tech={techItem} />
        ))}
      </div>
    </div>
  );
};

// 4. MAIN EXPORT
const Skills = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        gridRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        padding: "clamp(80px, 10vw, 150px) 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>
        {`

        .bento-card {
            padding: 40px 30px; /* Default Desktop Padding */
          }

          @media (max-width: 768px) {
            .bento-card {
              padding: 30px 20px !important; /* Gives the text room to breathe on mobile */
            }
            .bento-grid { 
              gap: 16px; 
            }
          }
            
          .bento-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            width: 100%;
          }

          @media (min-width: 768px) {
            .bento-grid { grid-template-columns: repeat(3, 1fr); }
            .md\\:col-span-1 { grid-column: span 1 / span 1; }
            .md\\:col-span-2 { grid-column: span 2 / span 2; }
          }

          .bento-card:hover {
            transform: translateY(-4px);
            border-color: rgba(255, 255, 255, 0.25) !important;
          }

          /* THE NEW HIGH-CONTRAST TECH PILL */
          .tech-pill {
            display: flex;
            align-items: center;
            gap: 12px;
            background-color: rgba(255, 255, 255, 0.05);
            padding: 10px 18px;
            border-radius: 12px;
            font-size: 0.9rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
          }

          .tech-pill:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-color: #4f46e5; /* The border lights up indigo to match the number */
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(79, 70, 229, 0.15);
          }
        `}
      </style>

      <div style={{ width: "100%", maxWidth: "1200px" }}>
        <h2
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: "#ffffff",
            fontWeight: "900",
            marginBottom: "clamp(40px, 6vw, 80px)",
            letterSpacing: "-0.02em",
          }}
        >
          THE ARSENAL.
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
