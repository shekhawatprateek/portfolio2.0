import { useState, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

// 1. ADDED PREMIUM COLORS TO EACH SECTION
const navItems = [
  { name: 'Home', target: 0, id: 'hero', color: '#3496F7' },       // Tech Blue
  { name: 'Cadbury', target: '#cadbury', id: 'cadbury', color: '#3b34f7' },       // Tech Blue
  { name: 'About', target: '#about', id: 'about', color: '#10b981' },    // Emerald Green
  { name: 'Skills', target: '#skills', id: 'skills', color: '#f59e0b' }, // Amber/Yellow
  { name: 'Work', target: '#projects', id: 'projects', color: '#ef4444' },// Cinematic Red
  { name: 'Contact', target: '#contact', id: 'contact', color: '#8b5cf6' } // Amethyst Purple
];

const Navbar = () => {
  const lenis = useLenis();
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef(null);
  const buttonRefs = useRef([]);

  const handleScroll = (target) => {
    if (lenis) {
      lenis.scrollTo(target, { 
        duration: 1.2, 
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
      });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', 
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.id === activeSection);
    
    if (activeIndex !== -1 && buttonRefs.current[activeIndex] && navRef.current) {
      const button = buttonRefs.current[activeIndex];
      const nav = navRef.current;
      
      const navWidth = nav.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      
      const scrollPosition = buttonLeft - (navWidth / 2) + (buttonWidth / 2);
      
      nav.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activeSection]);

  return (
    <>
      <style>
        {`
          .glass-nav-container {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100;
            border-radius: 50px;
            background-color: rgba(10, 10, 10, 0.4);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
            overflow: hidden; 
          }

          .glass-nav {
            display: flex;
            gap: 5px;
            padding: 8px 10px;
          }
          
          .nav-btn {
            background: transparent;
            /* Reserve border space so the button doesn't jump when active */
            border: 1px solid transparent; 
            color: #777777; 
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            padding: 8px 18px;
            cursor: pointer;
            border-radius: 30px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap; 
            position: relative;
          }

          .nav-btn:hover {
            color: #d4d4d4;
          }

          /* --- THE PREMIUM COLOR ACTIVE STATE --- */
          .nav-btn.active {
            /* Text matches the specific section color */
            color: var(--nav-color);
            
            /* Border matches the color, but slightly transparent */
            border-color: color-mix(in srgb, var(--nav-color) 50%, transparent);
            
            /* Background tint matches the color */
            background-color: color-mix(in srgb, var(--nav-color) 10%, transparent);
            
            /* Glowing shadow matches the color */
            box-shadow: 0 4px 20px color-mix(in srgb, var(--nav-color) 25%, transparent);
          }

          @media (max-width: 768px) {
            .glass-nav-container {
              width: 90vw; 
              max-width: 400px;
            }

            .glass-nav {
              justify-content: flex-start;
              overflow-x: auto; 
              -ms-overflow-style: none;  
              scrollbar-width: none;  
              scroll-snap-type: x mandatory; 
            }
            
            .glass-nav::-webkit-scrollbar {
              display: none;
            }

            .nav-btn {
              font-size: 0.75rem; 
              padding: 8px 16px; 
              scroll-snap-align: center; 
            }

            .glass-nav::after {
              content: '';
              min-width: 10px;
            }
          }
        `}
      </style>

      <div className="glass-nav-container">
        <nav className="glass-nav" ref={navRef}>
          {navItems.map((item, index) => (
            <button
              key={index}
              ref={(el) => (buttonRefs.current[index] = el)} 
              onClick={() => handleScroll(item.target)}
              className={`nav-btn ${activeSection === item.id ? 'active' : ''}`}
              // 2. INJECT THE COLOR AS A CSS VARIABLE
              style={{ '--nav-color': item.color }}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;