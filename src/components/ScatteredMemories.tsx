import { motion } from 'motion/react';
import { MEMORY_PHOTOS } from '../constants';
import { useMemo } from 'react';

// Pre-compute stable positions to avoid Math.random() on every render
const POSITIONS = [
  { top: 8, left: 1, rotate: -12, scale: 0.85 },
  { top: 22, left: 88, rotate: 8, scale: 0.9 },
  { top: 38, left: 2, rotate: 15, scale: 0.8 },
  { top: 52, left: 87, rotate: -10, scale: 0.95 },
  { top: 65, left: 0, rotate: 6, scale: 0.85 },
  { top: 78, left: 89, rotate: -14, scale: 0.9 },
  { top: 90, left: 1, rotate: 10, scale: 0.8 },
  { top: 14, left: 86, rotate: -7, scale: 0.95 },
];

export default function ScatteredMemories() {
  const scatteredPhotos = useMemo(() => {
    return [...MEMORY_PHOTOS].slice(0, 8);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {scatteredPhotos.map((photo, index) => {
        const pos = POSITIONS[index];
        return (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.18, scale: pos.scale, rotate: pos.rotate }}
            transition={{ duration: 2, delay: index * 0.3, ease: 'easeOut' }}
            className="absolute hidden lg:block pointer-events-auto"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              width: '160px',
            }}
          >
            <div className="bg-white p-2 pb-6 shadow-2xl border border-gray-200 hover:opacity-80 transition-all duration-500 cursor-default">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-28 object-cover"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
