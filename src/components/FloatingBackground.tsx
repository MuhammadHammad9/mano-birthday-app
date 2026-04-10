import { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

// Elements are generated once — stable across re-renders
const ELEMENTS = [...Array(40)].map((_, i) => ({
  id: i,
  left: (i * 2.618) % 100, // Golden ratio distribution — no clumping
  duration: 20 + (i % 15),
  delay: -(i * 1.3),
  scale: 0.4 + (i % 7) * 0.1,
  type: i % 5 === 0 ? '✨' : '♥',
  depth: 20 + (i % 8) * 10,
}));

// A single particle that computes its own parallax transforms correctly
function Particle({ el, springX, springY }: {
  el: typeof ELEMENTS[0];
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  // Safe: useTransform is called at the top-level of a component, not inside a loop in the parent
  const xOffset = useTransform(springX, [-1, 1], [-el.depth, el.depth]);
  const yOffset = useTransform(springY, [-1, 1], [-el.depth, el.depth]);

  return (
    <motion.div
      className="absolute text-primary-light will-change-transform select-none pointer-events-none"
      style={{
        opacity: el.type === '✨' ? 0.7 : 0.25,
        left: `${el.left}%`,
        scale: el.scale,
        fontSize: '2rem',
        x: xOffset,
      }}
      animate={{
        y: ['110vh', '-15vh'],
        rotate: [0, el.id % 2 === 0 ? 360 : -360],
      }}
      transition={{
        y: { duration: el.duration, repeat: Infinity, ease: 'linear', delay: el.delay },
        rotate: { duration: el.duration * 0.8, repeat: Infinity, ease: 'linear' },
      }}
    >
      <motion.div style={{ y: yOffset }}>
        {el.type}
      </motion.div>
    </motion.div>
  );
}

export default function FloatingBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2));
      mouseY.set((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2));
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {ELEMENTS.map((el) => (
        <Particle key={el.id} el={el} springX={springX} springY={springY} />
      ))}
    </div>
  );
}
