import { useState, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

// Notice we added 'id' so the observer knows exactly what to look for
const navItems = [
  // THE FIX: Changed target from '#hero' to 0
  { name: 'Home', target: 0, id: 'hero' }, 
  { name: 'Architect', target: '#about', id: 'about' },
  { name: 'Skills', target: '#skills', id: 'skills' },
  { name: 'Work', target: '#projects', id: 'projects' },
  { name: 'Services', target: '#services', id: 'services' },
  { name: 'Contact', target: '#contact', id: 'contact' }
];

const Navbar = () => {
  const lenis = useLenis();
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef(null);
  const buttonRefs = useRef([]);

  // Smooth scroll to the section when clicked
  const handleScroll = (target) => {
    if (lenis) {
      lenis.scrollTo(target, { 
        duration: 1.2, 
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
      });
    }
  };

  // 1. OBSERVE THE SCROLL POSITION
  useEffect(() => {
    const observerOptions = {
      root: null,
      // This creates an invisible line in the exact dead-center of the screen.
      // Whichever section crosses this line becomes the "active" one.
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

    // Tell the observer to watch every section on the page
    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // 2. AUTO-SCROLL THE NAVBAR ON MOBILE
  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.id === activeSection);
    
    if (activeIndex !== -1 && buttonRefs.current[activeIndex] && navRef.current) {
      const button = buttonRefs.current[activeIndex];
      const nav = navRef.current;
      
      // Calculate the exact math needed to slide the active button to the center of the pill
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
            /* This wrapper keeps the pill shape perfectly intact on mobile */
            overflow: hidden; 
          }

          .glass-nav {
            display: flex;
            gap: 5px;
            padding: 8px 10px;
          }
          
          .nav-btn {
            background: transparent;
            border: none;
            color: #777777; /* Darker inactive color for higher contrast */
            font-size: 0.85rem;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            padding: 8px 18px;
            cursor: pointer;
            border-radius: 30px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap; 
          }

          .nav-btn:hover {
            color: #d4d4d4;
          }

          /* THE PREMIUM ACTIVE STATE */
          .nav-btn.active {
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0.12);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }

          /* MOBILE OPTIMIZATION */
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
              scroll-snap-type: x mandatory; /* Makes swiping feel snapping and premium */
            }
            
            .glass-nav::-webkit-scrollbar {
              display: none;
            }

            .nav-btn {
              font-size: 0.75rem; 
              padding: 8px 16px; 
              scroll-snap-align: center; /* Ensures the button centers perfectly when swiped */
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
              // Save a reference to each button so we can calculate its position
              ref={(el) => (buttonRefs.current[index] = el)} 
              onClick={() => handleScroll(item.target)}
              // Dynamically apply the 'active' class if this section is on screen
              className={`nav-btn ${activeSection === item.id ? 'active' : ''}`}
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