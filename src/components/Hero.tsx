import { motion } from 'motion/react';
import { RECIPIENT_NAME } from '../constants';
import { ChevronDown } from 'lucide-react';
import LiveCounter from './LiveCounter';
import { MEMORY_PHOTOS } from '../constants';

// 4 polaroids pinned to the sides of the hero, with stable positions
const HERO_POLAROIDS = [
  { photo: MEMORY_PHOTOS[0], top: '10%', left: '2%',  rotate: -12 },
  { photo: MEMORY_PHOTOS[2], top: '55%', left: '1%',  rotate: 8  },
  { photo: MEMORY_PHOTOS[4], top: '10%', right: '2%', rotate: 14 },
  { photo: MEMORY_PHOTOS[6], top: '55%', right: '1%', rotate: -9 },
];

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      {/* Polaroid photos — hero only */}
      {HERO_POLAROIDS.map(({ photo, top, left, right, rotate }, i) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate }}
          transition={{ duration: 1.2, delay: 0.6 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute hidden lg:block z-0 select-none"
          style={{ top, left, right }}
        >
          <div className="bg-white p-2 pb-7 shadow-xl border border-gray-100 w-[150px]">
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-28 object-cover"
            />
          </div>
        </motion.div>
      ))}

      {/* Main hero content */}
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
