import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export default function CursorGlow() {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);

  const springX = useSpring(cursorX, { damping: 32, stiffness: 220, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 32, stiffness: 220, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const mediaQuery = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 240);
      cursorY.set(e.clientY - 240);
    };

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY, prefersReducedMotion]);

  if (!isDesktop || prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: springX,
        y: springY,
      }}
      className="pointer-events-none fixed top-0 left-0 z-30 h-[480px] w-[480px] rounded-full opacity-35 dark:opacity-25 blur-[95px] transition-opacity duration-500"
    >
      <div className="h-full w-full rounded-full bg-gradient-to-tr from-brand-indigo via-brand-cyan to-brand-crimson" />
    </motion.div>
  );
}
