import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function MagicCursor() {
  const [hoverType, setHoverType] = useState<'default' | 'pointer' | 'magic'>('default');
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth, snappy physics
  const springX = useSpring(mouseX, { stiffness: 800, damping: 35, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 800, damping: 35, mass: 0.5 });

  useEffect(() => {
    // Disable completely on mobile touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (target.closest('canvas')) {
        setHoverType('magic');
      } else if (target.closest('a, button, input, [role="button"]')) {
        setHoverType('pointer');
      } else {
        setHoverType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9999] flex items-center justify-center transition-colors"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hoverType === 'pointer' ? 1.5 : hoverType === 'magic' ? 2 : 1,
          backgroundColor: hoverType === 'pointer' ? 'rgba(212, 83, 126, 0.1)' : hoverType === 'magic' ? 'rgba(250, 199, 117, 0.2)' : 'transparent',
          borderColor: hoverType === 'magic' ? '#FAC775' : '#D4537E'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {hoverType === 'magic' && (
          <motion.div 
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            className="text-accent"
          >
            <Sparkles size={16} fill="currentColor" />
          </motion.div>
        )}
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary-dark rounded-full pointer-events-none z-[10000]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: hoverType === 'magic' ? 0 : 1,
          scale: hoverType === 'default' ? 1 : 0.5,
        }}
      />
    </>
  );
}
