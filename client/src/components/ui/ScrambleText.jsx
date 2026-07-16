import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

/**
 * ScrambleText — scrambles characters then settles into the real text.
 * @param {string} text - target text
 * @param {number} speed - ms per frame (default 40)
 * @param {number} delay - ms before starting (default 300)
 * @param {function} onComplete - called when animation finishes
 */
export default function ScrambleText({ text, speed = 40, delay = 300, onComplete }) {
  const [display, setDisplay] = useState(() => text.replace(/\S/g, ' '));
  const doneRef = useRef(false);

  useEffect(() => {
    doneRef.current = false;
    let frame = 0;
    const chars = text.split('');
    const revealed = new Array(chars.length).fill(false);

    // Start with spaces
    setDisplay(text.replace(/\S/g, ' '));

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;

        // Reveal one character every 3 frames
        if (frame % 3 === 0) {
          const unrevealed = revealed
            .map((r, i) => (!r && text[i] !== ' ' ? i : -1))
            .filter((i) => i !== -1);

          if (unrevealed.length > 0) {
            const idx = unrevealed[Math.floor(Math.random() * unrevealed.length)];
            revealed[idx] = true;
          }
        }

        const next = chars.map((ch, i) => {
          if (ch === ' ') return ' ';
          if (revealed[i]) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        });

        setDisplay(next.join(''));

        if (revealed.every((r, i) => r || text[i] === ' ')) {
          clearInterval(interval);
          setDisplay(text);
          if (!doneRef.current) {
            doneRef.current = true;
            onComplete?.();
          }
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return <span aria-label={text}>{display}</span>;
}
