import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'motion/react';
import { Sparkles, MapPin } from 'lucide-react';

// Generate stars once for stable rendering
const STARS = [...Array(150)].map((_, i) => ({
  id: i,
  x: (i * 7.3) % 100,
  y: (i * 11.7) % 100,
  size: i % 20 === 0 ? 3 : (i % 3) * 0.5 + 0.5,
  opacity: 0.2 + (i % 8) * 0.1,
  depthOffset: [0.05, 0.1, 0.2][i % 3],
}));

// Individual star — has its own hooks at top-level, no Rules of Hooks violation
function Star({ star, springX, springY }: {
  star: typeof STARS[0];
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}) {
  const x = useTransform(springX, v => -v * star.depthOffset);
  const y = useTransform(springY, v => -v * star.depthOffset);

  return (
    <motion.div
      className={`absolute rounded-full bg-white will-change-transform ${star.size >= 3 ? 'shadow-[0_0_8px_3px_rgba(255,255,255,0.9)]' : ''}`}
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: star.size,
        height: star.size,
        opacity: star.opacity,
        x,
        y,
      }}
    />
  );
}

// Constellation SVG layer with its own parallax
function ConstellationLayer({ springX, springY }: {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}) {
  const x = useTransform(springX, v => -v * 8);
  const y = useTransform(springY, v => -v * 8);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" strokeWidth="0.8" viewBox="0 0 100 100">
      <motion.path
        d="M 20 30 L 40 45 L 70 30 L 80 60 L 50 80 L 30 65 Z M 40 45 L 50 80 M 70 30 L 30 65"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        style={{ x, y }}
      />
    </svg>
  );
}

// Glass glare layer
function GlareLayer({ springX, springY }: {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}) {
  const glareX = useTransform(springX, [-200, 200], [-20, 120]);
  const glareY = useTransform(springY, [-200, 200], [-20, 120]);
  const x = useTransform(glareX, v => `${v}%`);
  const y = useTransform(glareY, v => `${v}%`);

  return (
    <motion.div
      className="absolute pointer-events-none rounded-full w-[200%] h-[200%] mix-blend-soft-light"
      style={{
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 45%)',
        x,
        y,
        left: '-50%',
        top: '-50%',
      }}
    />
  );
}

export default function StarMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 28 });

  const rotateX = useTransform(springY, [-200, 200], [12, -12]);
  const rotateY = useTransform(springX, [-200, 200], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="starmap" className="py-24 px-4 overflow-hidden relative">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Text Side */}
        <div className="md:w-1/2 z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sparkles className="text-accent w-10 h-10 mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-dark mb-6 leading-tight">
              The Stars On Our Night
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              January 24th, 2025. The universe aligned perfectly to begin our beautiful journey together.
              This is a snapshot of exactly how the cosmos looked over us on that magical night.
            </p>
            <div className="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-xs border border-primary/20 bg-primary/5 px-5 py-3 rounded-full">
              <MapPin size={14} /> Hover map to explore
            </div>
          </motion.div>
        </div>

        {/* Globe Side */}
        <div className="md:w-1/2 w-full flex justify-center [perspective:1200px] relative">
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-80 h-80 md:w-[440px] md:h-[440px] rounded-full bg-gradient-to-tr from-[#030B1A] to-[#0E1D3A] relative overflow-hidden flex items-center justify-center will-change-transform cursor-crosshair"
            style={{
              rotateX,
              rotateY,
              boxShadow: '0 0 0 8px rgba(212,83,126,0.08), 0 30px 60px -20px rgba(0,0,0,0.6)',
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, type: 'spring', bounce: 0.3 }}
          >
            {STARS.map(star => (
              <Star key={star.id} star={star} springX={springX} springY={springY} />
            ))}
            <ConstellationLayer springX={springX} springY={springY} />
            <GlareLayer springX={springX} springY={springY} />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/60 tracking-[0.35em] font-mono whitespace-nowrap bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm z-10">
              JAN 24 • 2025
            </div>
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(255,255,255,0.07)] pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
