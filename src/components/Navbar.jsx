import { useLenis } from 'lenis/react';

const navItems = [
  { name: 'Home', target: 0 },
  { name: 'Architect', target: '#about' },
  { name: 'Skills', target: '#skills' },
  { name: 'Work', target: '#projects' },
  { name: 'Services', target: '#services' },
  { name: 'Contact', target: '#contact' }
];

const Navbar = () => {
  // Grab the Lenis instance to power our smooth scrolling clicks
  const lenis = useLenis();

  const handleScroll = (target) => {
    if (lenis) {
      // Tells Lenis to glide to the target ID over 1.2 seconds
      lenis.scrollTo(target, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100, // Keeps it above the 3D model and all text
      display: 'flex',
      gap: '10px',
      padding: '10px 20px',
      borderRadius: '50px',
      backgroundColor: 'rgba(20, 20, 20, 0.4)', // Semi-transparent dark base
      backdropFilter: 'blur(12px)', // The premium frosted glass effect
      WebkitBackdropFilter: 'blur(12px)', // For Safari support
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
    }}>
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => handleScroll(item.target)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#a3a3a3',
            fontSize: '0.9rem',
            fontWeight: '500',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '30px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#ffffff';
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#a3a3a3';
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          {item.name}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;