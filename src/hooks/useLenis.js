import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    let raf;
    function onRaf(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(onRaf);
    }
    raf = requestAnimationFrame(onRaf);

    // Expose lenis globally for framer-motion scroll tracking
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return lenisRef;
}
