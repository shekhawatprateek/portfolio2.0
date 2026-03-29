import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    title: "React - The Complete Guide (incl. Next.js, Redux)",
    issuer: "Udemy",
    image:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-42cd11b8-dbb2-48c2-9172-a67d52ac94c4.jpg",
    pdf: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-42cd11b8-dbb2-48c2-9172-a67d52ac94c4.pdf",
  },
  {
    title: "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL)",
    issuer: "Udemy",
    image:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-4301ec81-2f06-4699-8363-e565b786f070.jpg",
    pdf: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-4301ec81-2f06-4699-8363-e565b786f070.pdf",
  },
  {
    title: "The Complete JavaScript Course 2025: Zero to Expert!",
    issuer: "Udemy",
    image:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-71d6d0c3-097e-437e-a363-746f2f5b1c01.jpg",
    pdf: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-71d6d0c3-097e-437e-a363-746f2f5b1c01.pdf",
  },
];

const AnimatedStat = ({ target, suffix, label, isLast }) => {
  const numberRef = useRef(null);
  const boxRef = useRef(null);

  useGSAP(() => {
    const counter = { val: 0 };
    gsap.fromTo(
      counter,
      { val: 0 },
      {
        val: target,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = Math.floor(counter.val) + suffix;
          }
        },
      },
    );
  }, []);

  return (
    <div ref={boxRef} className={`stat-box ${isLast ? "last-stat" : ""}`}>
      <span
        ref={numberRef}
        className="stat-number"
        style={{ color: "#3496F7" }}
      >
        0{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const textRefs = useRef([]);
  const certRefs = useRef([]);

  useGSAP(
    () => {
      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 65%" },
        },
      );

      gsap.fromTo(
        textRefs.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 65%" },
        },
      );

      gsap.fromTo(
        certRefs.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          force3D: true, // Forces GPU rendering to stop flickering
          scrollTrigger: { trigger: ".cert-grid", start: "top 85%" },
        },
      );
    },
    { scope: containerRef },
  );

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
  };
  const addCertToRefs = (el) => {
    if (el && !certRefs.current.includes(el)) certRefs.current.push(el);
  };

  return (
    <section
      id="about"
      ref={containerRef}
      style={{
        backgroundColor: "#000000",
        padding: "clamp(80px, 10vw, 150px) 20px",
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          .about-image-wrapper {
            position: relative; width: 100%; height: 100%; min-height: 500px; border-radius: 24px;
            overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); background-color: #050505;
            display: flex; align-items: center; justify-content: center;
          }
          .glass-badge {
            position: absolute; background-color: rgba(10, 10, 10, 0.6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1); padding: 10px 16px; border-radius: 50px; display: flex; align-items: center;
            gap: 8px; font-size: 0.75rem; font-weight: 600; color: #e5e5e5; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 10;
          }
          .badge-top { top: 20px; left: 20px; }
          .badge-bottom { bottom: 20px; right: 20px; }
          @keyframes pulse-dot { 0% { box-shadow: 0 0 0 0 rgba(52, 150, 247, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(52, 150, 247, 0); } 100% { box-shadow: 0 0 0 0 rgba(52, 150, 247, 0); } }
          .status-dot { width: 8px; height: 8px; background-color: #3496F7; border-radius: 50%; animation: pulse-dot 2s infinite; }
          
          .micro-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 20px; margin-bottom: 40px; }
          .stat-box { 
            background-color: rgba(255, 255, 255, 0.02); 
            border: 1px solid rgba(255, 255, 255, 0.05); 
            border-radius: 16px; 
            padding: 20px 16px; 
            display: flex; 
            flex-direction: column; 
            gap: 6px; 
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
            position: relative;
            overflow: hidden;
          }
          .stat-box::before {
            content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle at top right, rgba(52, 150, 247, 0.1), transparent 60%);
            opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
          }
          .stat-box:hover { background-color: rgba(255, 255, 255, 0.04); border-color: #3496F7; transform: translateY(-4px); }
          .stat-box:hover::before { opacity: 1; }
          .stat-number { font-size: 1.8rem; font-weight: 900; line-height: 1; position: relative; z-index: 1; }
          .stat-label { font-size: 0.7rem; color: #888888; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; position: relative; z-index: 1; }

          .cert-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; width: 100%; }
          .cert-card { 
            background-color: #050505; 
            border: 1px solid rgba(255, 255, 255, 0.08); 
            border-radius: 16px; 
            overflow: hidden; 
            text-decoration: none; 
            display: flex; 
            flex-direction: column; 
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform, opacity;
          }
          .cert-card:hover { border-color: #3496F7; transform: translateY(-6px); }
          
          /* THE FIX: Placeholder background and hidden overflow */
          .cert-image-wrapper { 
            width: 100%; 
            height: 160px; 
            overflow: hidden; 
            border-bottom: 1px solid rgba(255, 255, 255, 0.05); 
            background-color: #111111; 
            position: relative;
          }
          
          /* THE FIX: Smooth opacity transition and hardware acceleration */
          .cert-img { 
            width: 100%; 
            height: 100%; 
            object-fit: cover; 
            opacity: 0; /* Hidden until loaded */
            transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); 
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            transform: translateZ(0); /* Forces GPU layer */
          }
          
          .cert-card:hover .cert-img { transform: scale(1.05) translateZ(0); }

          @media (max-width: 900px) {
            .about-top-row { flex-direction: column; gap: 40px !important; }
            .about-image-wrapper { min-height: 350px; }
            .micro-stats-grid { grid-template-columns: repeat(2, 1fr); }
            .last-stat { grid-column: span 2; align-items: center; text-align: center; }
            .cert-grid { grid-template-columns: 1fr; } 
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          top: "0%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(52,150,247,0.03) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          gap: "60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="about-top-row" style={{ display: "flex", gap: "60px" }}>
          {/* LEFT COLUMN */}
          <div ref={leftRef} style={{ flex: "1 1 45%" }}>
            <div className="about-image-wrapper">
              <lottie-player
                src="/developer.json"
                background="transparent"
                speed="1"
                style={{ width: "80%", height: "80%" }}
                loop
                autoplay
              ></lottie-player>
              <div className="glass-badge badge-top">📍 Gurugram, India</div>
              <div className="glass-badge badge-bottom">
                <div className="status-dot"></div>Available for Opportunities
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div
            style={{
              flex: "1 1 55%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2
              ref={addToRefs}
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: "900",
                lineHeight: "1.1",
                marginBottom: "20px",
                color: "#ffffff",
              }}
            >
              YOUR SEARCH IS <span style={{ color: "#3496F7" }}>OVER.</span>
            </h2>

            <div
              ref={addToRefs}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginBottom: "40px",
              }}
            >
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#e5e5e5",
                  lineHeight: "1.6",
                  fontWeight: "700",
                }}
              >
                Some engineers ship features. I ship systems that{" "}
                <span style={{ color: "#3496F7" }}>last.</span>
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#e5e5e5",
                  lineHeight: "1.7",
                  fontWeight: "500",
                }}
              >
                3+ years of full-stack experience, zero tolerance for shortcuts,
                and an obsession with getting it right.
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#e5e5e5",
                  lineHeight: "1.7",
                  fontWeight: "500",
                }}
              >
                Stop searching —{" "}
                <span style={{ color: "#3496F7" }}>you've found your guy.</span>
              </p>
            </div>

            <div ref={addToRefs} className="micro-stats-grid">
              <AnimatedStat target={3} suffix="+" label="Years MERN" />
              <AnimatedStat target={3} suffix="" label="Certifications" />
              <AnimatedStat
                target={100}
                suffix="%"
                label="Ownership"
                isLast={true}
              />
            </div>

            <a
              ref={addToRefs}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 36px",
                backgroundColor: "#ffffff",
                color: "#000000",
                fontWeight: "800",
                borderRadius: "50px",
                textDecoration: "none",
                fontSize: "1rem",
                alignSelf: "flex-start",
              }}
            >
              View Full Resume
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div style={{ width: "100%" }}>
          <h3
            ref={addCertToRefs}
            style={{
              fontSize: "1rem",
              fontWeight: "800",
              color: "#ffffff",
              marginBottom: "25px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3496F7"
              strokeWidth="2.5"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Verified Credentials
          </h3>

          <div className="cert-grid">
            {certifications.map((cert, index) => (
              <a
                key={index}
                ref={addCertToRefs}
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-card"
              >
                <div className="cert-image-wrapper">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="cert-img"
                    loading="lazy"
                    /* THE FIX: Fades the image in smoothly ONLY when fully loaded */
                    onLoad={(e) => (e.target.style.opacity = 1)}
                  />
                </div>
                <div className="cert-content" style={{ padding: "20px" }}>
                  <span
                    style={{
                      color: "#3496F7",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                    }}
                  >
                    {cert.issuer}
                  </span>
                  <h4
                    style={{
                      color: "#ffffff",
                      fontSize: "0.95rem",
                      fontWeight: "700",
                      marginTop: "5px",
                    }}
                  >
                    {cert.title}
                  </h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;