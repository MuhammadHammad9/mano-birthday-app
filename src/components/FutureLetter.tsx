import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, FastForward } from 'lucide-react';
import { playPop, playSuccessChime } from '../utils/audio';

export default function FutureLetter() {
  const [prediction, setPrediction] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrediction = async () => {
    playPop();
    setIsLoading(true);
    setPrediction('');
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Write a completely unique, highly romantic 3 sentence short story about Hammad and Amna 5 years in the future. Make it extremely sweet, incredibly luxurious, and unique every time. Do not use hashtags or weird formatting." }] }],
          generationConfig: { temperature: 0.9 }
        })
      });
      
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "The stars are aligning perfectly for us...";
      
      playSuccessChime();
      
      let currentText = '';
      const chars = text.split('');
      
      const interval = setInterval(() => {
        if (chars.length === 0) {
          clearInterval(interval);
          return;
        }
        currentText += chars.shift();
        setPrediction(currentText);
      }, 30);
      
    } catch (e) {
      setPrediction("My love for you transcends time, but it seems our futuristic connection is temporarily offline.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="future" className="py-20 px-4 bg-primary-light/5">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <FastForward className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-bold font-display text-primary-dark mb-4">Five Years From Now...</h2>
          <p className="text-text-secondary text-lg">Click below to ask the universe for a glimpse into our beautiful future together.</p>
        </motion.div>

        <motion.div 
          className="bg-card p-8 md:p-12 rounded-[2rem] shadow-xl border border-primary-light/30 relative overflow-hidden transition-colors duration-500"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 p-8 text-primary/5">
            <Sparkles size={120} />
          </div>
          
          <button
            onClick={fetchPrediction}
            disabled={isLoading}
            className="relative z-10 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 mx-auto shadow-lg shadow-primary/20"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            Predict Our Future
          </button>

          <AnimatePresence>
            {prediction && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 relative z-10"
              >
                <div className="w-full h-px bg-primary-light/30 mb-8"></div>
                <p className="font-body text-xl md:text-2xl text-primary-dark leading-relaxed italic relative">
                  "{prediction}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
