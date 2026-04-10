import { motion } from 'motion/react';
import { RECIPIENT_NAME } from '../constants';
import { ChevronDown } from 'lucide-react';
import LiveCounter from './LiveCounter';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10"
      >
        <div className="inline-block px-4 py-1 rounded-full bg-primary-light text-primary font-medium text-sm mb-6">
          Happy Birthday!
        </div>
        <h1 className="text-5xl md:text-8xl font-display font-bold text-primary-dark mb-4 tracking-tight">
          {RECIPIENT_NAME}
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-lg mx-auto leading-relaxed mb-4">
          Today we celebrate the most wonderful person in my world. You are everything to me.
        </p>
        
        <LiveCounter />
      </motion.div>



      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-primary w-8 h-8" />
      </motion.div>
    </section>
  );
}
