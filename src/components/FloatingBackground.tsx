import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export default function FloatingBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Buttery smooth physics for the mouse movement
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get exact center of screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate offset from center (from -1 to 1)
      const x = (e.clientX - centerX) / centerX;
      const y = (e.clientY - centerY) / centerY;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate deterministic elements so they don't jump around on re-renders
  const [elements] = useState(() => 
    [...Array(40)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 30 + 20, // 20 to 50 seconds to drift up
      delay: Math.random() * -50,
      scale: Math.random() * 0.7 + 0.3, // 0.3 to 1.0 scale
      type: Math.random() > 0.8 ? '✨' : '♥',
      depth: Math.random() * 100 + 20 // Parallax multiplier
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden perspective-1000">
      {elements.map((el) => {
        // Each element translates differently based on its "depth" for true 3D parallax
        const xOffset = useTransform(springX, [-1, 1], [-el.depth, el.depth]);
        const yOffset = useTransform(springY, [-1, 1], [-el.depth, el.depth]);

        return (
          <motion.div
            key={el.id}
            className="absolute text-primary-light will-change-transform"
            style={{ 
              opacity: el.type === '✨' ? 0.8 : 0.3,
              left: `${el.left}%`,
              scale: el.scale,
              fontSize: '2rem',
              x: xOffset,
            }}
            animate={{
              y: ['120vh', '-20vh'], // Infinite drift heavily padded to prevent clipping
              rotate: [0, Math.random() > 0.5 ? 360 : -360],
            }}
            transition={{
              y: {
                duration: el.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: el.delay,
              },
              rotate: {
                duration: el.duration * 0.8,
                repeat: Infinity,
                ease: 'linear',
              }
            }}
          >
            <motion.div style={{ y: yOffset }}>
              {el.type}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
