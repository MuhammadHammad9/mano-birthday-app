import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, MapPin } from 'lucide-react';

export default function StarMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(springY, [-200, 200], [15, -15]);
  const rotateY = useTransform(springX, [-200, 200], [-15, 15]);
  const glareX = useTransform(springX, [-200, 200], [-20, 120]);
  const glareY = useTransform(springY, [-200, 200], [-20, 120]);

  const [stars] = useState(() => 
    [...Array(150)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() > 0.95 ? 3 : Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      layer: Math.floor(Math.random() * 3) // 0: back, 1: mid, 2: front
    }))
  );

  return (
    <section id="starmap" className="py-24 px-4 overflow-hidden relative">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="text-accent w-10 h-10 mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-dark mb-6 leading-tight">The Stars On Our Night</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              January 24th, 2025. The universe aligned perfectly to begin our beautiful journey together. This is a snapshot of exactly how the cosmos looked over us on that magical night.
            </p>
            <div className="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-xs border border-primary/20 bg-primary/5 px-5 py-3 rounded-full cursor-default">
              <MapPin size={14} /> Hover map to explore
            </div>
          </motion.div>
        </div>

        <div className="md:w-1/2 w-full flex justify-center [perspective:1000px] relative">
          <motion.div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-tr from-[#050914] to-[#121A2F] shadow-2xl relative overflow-hidden flex items-center justify-center will-change-transform cursor-crosshair ring-8 ring-primary/10"
            style={{ 
              rotateX, 
              rotateY,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {/* Stars Layers */}
            {stars.map((star) => {
               const depthOffset = star.layer === 0 ? 0.05 : star.layer === 1 ? 0.1 : 0.2;
               return (
                <motion.div
                  key={star.id}
                  className={`absolute rounded-full bg-white will-change-transform ${star.size > 2 ? 'shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]' : ''}`}
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: star.size,
                    height: star.size,
                    opacity: star.opacity,
                    x: useTransform(springX, v => -v * depthOffset),
                    y: useTransform(springY, v => -v * depthOffset),
                  }}
                />
               );
            })}

            {/* Constellation Lines */}
            <svg className="absolute inset-0 w-full h-full text-white/10 pointer-events-none stroke-current" strokeWidth="1" viewBox="0 0 100 100">
              <motion.path 
                d="M 20 30 L 40 45 L 70 30 L 80 60 L 50 80 L 30 65 Z M 40 45 L 50 80 M 70 30 L 30 65" 
                fill="none"
                style={{ 
                  x: useTransform(springX, v => -v * 0.08),
                  y: useTransform(springY, v => -v * 0.08)
                }}
              />
            </svg>

            {/* Glass Glare */}
            <motion.div 
              className="absolute pointer-events-none rounded-full w-[200%] h-[200%] mix-blend-overlay"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%)',
                x: useTransform(glareX, x => `${x}%`),
                y: useTransform(glareY, y => `${y}%`),
                left: '-50%',
                top: '-50%'
              }}
            />
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/70 tracking-[0.3em] font-mono whitespace-nowrap bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              JAN 24 • 2025
            </div>
            
            {/* Inner Ring Glow */}
            <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none shadow-[inset_0_0_40px_rgba(255,255,255,0.1)]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
