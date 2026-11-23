import { useState, useCallback, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Provides 3D mouse-move perspective tilt and cursor-following glow coordinates.
 * Automatically disables tilt when `prefers-reduced-motion` is enabled.
 */
export function useTilt(maxTilt = 8) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [tiltStyle, setTiltStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
    isHovered: false,
  });

  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const xPct = clientX / width;
      const yPct = clientY / height;

      const rotateY = (xPct - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - yPct) * maxTilt * 2;

      setTiltStyle({
        rotateX,
        rotateY,
        glowX: Math.round(xPct * 100),
        glowY: Math.round(yPct * 100),
        isHovered: true,
      });
    },
    [maxTilt, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      rotateX: 0,
      rotateY: 0,
      glowX: 50,
      glowY: 50,
      isHovered: false,
    });
  }, []);

  return {
    ref,
    tiltStyle,
    handleMouseMove,
    handleMouseLeave,
  };
}
