import { useState, useEffect, useRef } from 'react';

/**
 * Returns a 0–1 scroll progress value for a given element ref.
 * Used by the horizontal project strip progress bar.
 */
export function useScrollProgress(containerRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    function handleScroll() {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      setProgress(el.scrollLeft / max);
    }

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  return progress;
}

/**
 * Returns a 0–1 value tracking the window's vertical scroll
 * relative to a target element.
 */
export function useElementScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const total = rect.height + winH;
      const scrolled = winH - rect.top;
      setProgress(Math.min(1, Math.max(0, scrolled / total)));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);

  return progress;
}
