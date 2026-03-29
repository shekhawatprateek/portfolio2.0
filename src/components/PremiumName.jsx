import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PremiumName = () => {
  const nameRef = useRef(null);

  useEffect(() => {
    const el = nameRef.current;
    
    // Add magnetic effect - name subtly follows mouse movement
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      // Calculate how close mouse is to center of text
      const x = (e.clientX - rect.left - rect.width / 2) * 0.1; // * 0.1 controls "weight"
      const y = (e.clientY - rect.top - rect.height / 2) * 0.1;

      gsap.to(el, {
        x: x, y: y,
        ease: 'power3.out', duration: 0.4
      });
    };

    const onMouseLeave = () => {
      // Snaps back to center on leave
      gsap.to(el, {
        x: 0, y: 0,
        ease: 'elastic.out(1, 0.3)', duration: 0.8
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <span 
      ref={nameRef} 
      className="premium-name"
      style={{
        display: 'inline-block',
        // Starts the shimmer animation infinitely
        animation: 'chromeShimmer 10s linear infinite', 
        fontSize: 'clamp(3rem, 10vw, 7rem)' /* Massively scaled typography */
      }}
    >
      Prateek Shekhawat.
    </span>
  );
};

export default PremiumName;