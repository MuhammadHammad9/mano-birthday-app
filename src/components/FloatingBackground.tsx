import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function FloatingBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 50,
        y: (e.clientY / window.innerHeight - 0.5) * 50,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const elements = [...Array(30)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: Math.random() * 25 + 25,
    delay: Math.random() * -40,
    scale: Math.random() * 0.6 + 0.3,
    type: Math.random() > 0.8 ? '✨' : '♥'
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-primary-light"
          style={{ 
            opacity: el.type === '✨' ? 0.8 : 0.2,
            left: `${el.left}%`,
            scale: el.scale,
            fontSize: '2rem'
          }}
          animate={{
            y: ['110vh', '-20vh'],
            rotate: 360,
            x: mousePosition.x * (el.scale * 3),
            yOffset: mousePosition.y * (el.scale * 3), // faux parallax for y
          }}
          transition={{
            y: {
              duration: el.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: el.delay,
            },
            rotate: {
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            },
            x: { type: 'spring', damping: 15, stiffness: 50 }
          }}
        >
          {el.type}
        </motion.div>
      ))}
    </div>
  );
}
