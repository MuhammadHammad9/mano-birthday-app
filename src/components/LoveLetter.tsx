import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RECIPIENT_NAME } from '../constants';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime } from '../utils/audio';

export default function LoveLetter() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const isHoldingRef = useRef(false);
  const isUnlockedRef = useRef(false);

  const clearTick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startHolding = useCallback(() => {
    if (isUnlockedRef.current) return;
    isHoldingRef.current = true;
    setIsHolding(true);
    clearTick();
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + 2;
        if (next >= 100) {
          clearTick();
          isUnlockedRef.current = true;
          setIsUnlocked(true);
          playSuccessChime();
          confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#D4537E', '#FAC775', '#F4C0D1'] });
          return 100;
        }
        return next;
      });
    }, 50);
  }, []);

  const stopHolding = useCallback(() => {
    if (isUnlockedRef.current) return;
    isHoldingRef.current = false;
    setIsHolding(false);
    clearTick();
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) { clearTick(); return 0; }
        return prev - 4;
      });
    }, 30);
  }, []);

  // Cleanup on unmount
  useEffect(() => clearTick, []);

  return (
    <section id="letter" className="py-24 bg-primary-light/5 px-4 min-h-[600px] flex items-center justify-center relative overflow-hidden">
      <div className="max-w-2xl w-full mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              className="flex flex-col items-center justify-center py-20"
            >
              <h2 className="text-3xl font-display font-bold text-primary-dark mb-12 text-center">
                A Message For Your Heart
              </h2>
              
              <div
                className="relative cursor-pointer select-none touch-none"
                onPointerDown={startHolding}
                onPointerUp={stopHolding}
                onPointerLeave={stopHolding}
              >
                {/* SVG Progress Ring */}
                <svg className="w-48 h-48 -rotate-90 absolute -inset-6 drop-shadow-xl pointer-events-none" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    className="stroke-primary-light/20" 
                    strokeWidth="2" 
                  />
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    className="stroke-primary transition-all duration-75" 
                    strokeWidth="4" 
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progress) / 100}
                    strokeLinecap="round"
                  />
                </svg>

                <motion.div 
                  animate={{ 
                    scale: isHolding ? 1.1 : [1, 1.05, 1],
                  }}
                  transition={{ 
                    scale: isHolding ? { duration: 0.2 } : { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                  }}
                  className={`w-36 h-36 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300 ${isHolding ? 'bg-primary shadow-primary/50' : 'bg-card border-4 border-primary/20'}`}
                >
                  <Heart size={64} className={`transition-colors duration-300 ${isHolding ? 'text-white fill-white' : 'text-primary fill-primary/20'}`} />
                </motion.div>
              </div>

              <motion.p 
                animate={{ opacity: isHolding ? 0.3 : 1 }}
                className="mt-12 text-text-secondary font-medium tracking-wide uppercase text-sm"
              >
                {progress > 0 && progress < 100 ? `${Math.floor(progress)}%` : "Hold heartbeat to unlock"}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="bg-card p-8 md:p-14 rounded-2xl shadow-2xl border border-primary-light/20 relative"
            >
              {/* Decorative wax seal */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30 rotate-12 shadow-inner">
                <span className="text-primary font-handwriting text-2xl">A</span>
              </div>

              <div className="font-handwriting text-4xl text-primary mb-10">
                My dearest {RECIPIENT_NAME},
              </div>

              <div className="space-y-6 text-text-primary leading-relaxed font-body text-lg md:text-xl">
                <p>
                  As I sit down to write this, I find myself overwhelmed with gratitude for having you in my life. 
                  Another year has passed, and my love for you has only grown deeper and stronger.
                </p>
                <p>
                  I still remember the first time we met. I didn't know then that you would become my entire world, 
                  but there was a spark that I couldn't ignore. Looking back, it was the best thing that ever happened to me.
                </p>
                <p>
                  You make every day brighter just by being in it. Your kindness, your strength, and your beautiful soul 
                  inspire me every single day. You are my best friend, my partner in crime, and my greatest love.
                </p>
                <p>
                  I hope this birthday is as wonderful as you are. I can't wait to see what the next year brings for us 
                  and to make even more beautiful memories together.
                </p>
              </div>

              <div className="mt-16 font-handwriting text-4xl text-primary flex flex-col">
                <span className="mb-2">Forever yours,</span>
                <span className="ml-8 text-primary-dark">Hammad</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
