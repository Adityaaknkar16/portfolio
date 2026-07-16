import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function Typewriter({
  text,
  speed = 42,
  delay = 0,
  className = '',
  onComplete,
  showCursor = true,
  cursorClassName = 'text-gold',
}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let index = 0;
    let intervalId;
    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(intervalId);
          setDone(true);
          onCompleteRef.current?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <motion.span
          className={`ml-0.5 inline-block font-mono font-light ${cursorClassName}`}
          animate={{ opacity: done ? [1, 0, 1] : 1 }}
          transition={done ? { duration: 0.8, repeat: Infinity } : { duration: 0.1 }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

export function TypewriterLines({
  lines,
  speed = 38,
  lineDelay = 400,
  startDelay = 0,
  className = '',
  lineClassName = '',
  onAllComplete,
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const linesKey = lines.map((l) => l.text).join('|');

  useEffect(() => {
    setLineIndex(0);
    setAllDone(false);
  }, [linesKey]);

  const handleLineComplete = () => {
    if (lineIndex < lines.length - 1) {
      setTimeout(() => setLineIndex((i) => i + 1), lineDelay);
    } else {
      setAllDone(true);
      onAllComplete?.();
    }
  };

  return (
    <div className={className}>
      {lines.map((line, i) => {
        if (i > lineIndex) return null;
        const isCurrent = i === lineIndex;
        const isPast = i < lineIndex;

        return (
          <span key={`${line.text}-${i}`} className={`block ${line.className || lineClassName}`}>
            {isPast ? (
              line.text
            ) : (
              <Typewriter
                text={line.text}
                speed={speed}
                delay={i === 0 ? startDelay : 0}
                showCursor={isCurrent && !allDone}
                onComplete={isCurrent ? handleLineComplete : undefined}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
