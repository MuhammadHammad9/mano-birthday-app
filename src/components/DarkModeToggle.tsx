import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playPop } from '../utils/audio';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggle = () => {
    playPop();
    setIsDark(!isDark);
  };

  return (
    <button 
      onClick={toggle}
      className="p-2 rounded-full bg-primary-light/20 hover:bg-primary-light/40 transition-colors text-primary flex items-center justify-center relative w-10 h-10 overflow-hidden mix-blend-difference z-[9000]"
      aria-label="Toggle dark mode"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div 
            key="sun" 
            initial={{ y: 20, opacity: 0, rotate: -45 }} 
            animate={{ y: 0, opacity: 1, rotate: 0 }} 
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <Sun size={20} />
          </motion.div>
        ) : (
          <motion.div 
            key="moon" 
            initial={{ y: 20, opacity: 0, rotate: -45 }} 
            animate={{ y: 0, opacity: 1, rotate: 0 }} 
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <Moon size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
