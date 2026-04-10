import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import ScratchCard from './ScratchCard';
import { playPop, playSuccessChime } from '../utils/audio';

export default function SecretPage() {
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // The password is "amna"
  const CORRECT_PASSWORD = "amna"; 

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === CORRECT_PASSWORD) {
      playSuccessChime();
      setIsLocked(false);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#D4537E', '#FAC775', '#FFFFFF']
      });
    } else {
      playPop();
      setError('Incorrect password. Try again?');
      setAttempts(a => a + 1);
      setPassword('');
    }
  };

  return (
    <section id="secret" className="py-20 px-4 bg-primary-dark/5">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {isLocked ? (
            <motion.div 
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Lock className="text-primary" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-primary-dark mb-4 font-display">A Secret Surprise...</h2>
              <p className="text-text-secondary mb-8">Only for the birthday girl. Enter the secret word to unlock.</p>
              
              <form onSubmit={handleUnlock} className="max-w-xs mx-auto">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Secret word..."
                  className="w-full px-6 py-3 rounded-full border-2 border-primary-light focus:border-primary outline-none transition-colors text-center mb-4"
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {attempts >= 3 && <p className="text-primary/60 text-xs mb-4 italic">Hint: It's your name!</p>}
                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-primary-dark transition-colors"
                >
                  Unlock
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="unlocked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 md:p-16 rounded-[2rem] shadow-2xl border border-primary-light/30 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-primary/10">
                <Sparkles size={120} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                    <Heart fill="currentColor" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-primary-dark font-display">The Secret Message</h2>
                </div>

                <div className="space-y-8 text-lg text-text-primary leading-relaxed">
                  <p className="font-handwriting text-4xl text-primary">You found it!</p>
                  <p>
                    I wanted to hide this little corner of the internet just for you. 
                    This is where I tell you that I've planned a special surprise trip for us next month. 
                    I won't tell you where yet, but pack your bags for somewhere warm!
                  </p>
                  <p>
                    You are the most important person in my life, and I want to spend every single day 
                    making you feel as special as you truly are.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <ScratchCard className="rotate-[-2deg]" text="Scratch me!">
                      <img src="/8.jpeg" alt="Secret 1" className="w-full h-auto rounded-none shadow-none" referrerPolicy="no-referrer" />
                    </ScratchCard>
                    <ScratchCard className="rotate-[2deg]" text="Scratch for more✨">
                      <img src="/9.jpeg" alt="Secret 2" className="w-full h-auto rounded-none shadow-none" referrerPolicy="no-referrer" />
                    </ScratchCard>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
