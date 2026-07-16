import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let rafId;

    function onMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function loop() {
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    document.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
