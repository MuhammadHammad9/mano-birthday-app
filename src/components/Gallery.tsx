import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PHOTOS } from '../constants';
import { X, ChevronLeft, ChevronRight, Share2, Maximize2 } from 'lucide-react';
import { playPop } from '../utils/audio';

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(PHOTOS.length / 2));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedPhoto = PHOTOS.find(p => p.id === selectedId);

  const navigateCoverflow = (direction: number) => {
    playPop();
    setCurrentIndex((prev) => {
      let next = prev + direction;
      if (next < 0) next = 0;
      if (next > PHOTOS.length - 1) next = PHOTOS.length - 1;
      return next;
    });
  };

  const navigateModal = (direction: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedId) return;
    const currentIdx = PHOTOS.findIndex(p => p.id === selectedId);
    let nextIndex = currentIdx + direction;
    if (nextIndex < 0) nextIndex = PHOTOS.length - 1;
    if (nextIndex >= PHOTOS.length) nextIndex = 0;
    setSelectedId(PHOTOS[nextIndex].id);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;

    const shareData = {
      title: "Amna's Birthday Memory",
      text: `Check out this memory from Amna's birthday website: ${selectedPhoto.caption}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <section id="gallery" className="py-24 px-4 overflow-hidden relative">
      <div className="text-center mb-16 animate-on-scroll">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-dark mb-4">Our Memories</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="relative h-[400px] md:h-[500px] max-w-6xl mx-auto flex items-center justify-center perspective-1000">
        {PHOTOS.map((photo, index) => {
          const offset = index - currentIndex;
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          
          if (absOffset > 3) return null;

          return (
            <motion.div
              key={photo.id}
              layoutId={`cover-${photo.id}`}
              onClick={() => {
                if (!isActive) {
                  navigateCoverflow(offset);
                }
              }}
              className="absolute w-64 md:w-80 h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer will-change-transform"
              initial={false}
              animate={{
                x: offset * (window.innerWidth < 768 ? 60 : 120),
                rotateY: offset * -25,
                z: absOffset * -100,
                scale: 1 - absOffset * 0.1,
                zIndex: PHOTOS.length - absOffset,
                opacity: absOffset > 2 ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />
              
              <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isActive ? 'opacity-0 hover:opacity-10' : 'opacity-60'}`} />
              
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"
                >
                  <p className="text-white font-bold text-lg">{photo.caption}</p>
                </motion.div>
              )}

              {isActive && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedId(photo.id); playPop(); }}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-md opacity-0 hover:opacity-100 transition-opacity hover:bg-primary"
                >
                  <Maximize2 size={20} />
                </button>
              )}
            </motion.div>
          );
        })}

        {/* Carousel Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 md:px-12 pointer-events-none z-50">
          <button 
            disabled={currentIndex === 0}
            onClick={() => navigateCoverflow(-1)}
            className="pointer-events-auto bg-card/80 text-primary-dark p-3 rounded-full backdrop-blur-xl shadow-lg border border-primary-light/20 hover:scale-110 active:scale-95 transition-all disabled:opacity-30"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            disabled={currentIndex === PHOTOS.length - 1}
            onClick={() => navigateCoverflow(1)}
            className="pointer-events-auto bg-card/80 text-primary-dark p-3 rounded-full backdrop-blur-xl shadow-lg border border-primary-light/20 hover:scale-110 active:scale-95 transition-all disabled:opacity-30"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedId(null)}
          >
            <div className="absolute top-6 right-6 flex items-center gap-4">
              <button 
                className="text-white hover:text-primary transition-colors p-2 bg-white/10 rounded-full"
                onClick={handleShare}
                title="Share memory"
              >
                <Share2 size={24} />
              </button>
              <button 
                className="text-white hover:text-primary transition-colors"
                onClick={() => setSelectedId(null)}
              >
                <X size={32} />
              </button>
            </div>

            <button 
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-primary transition-colors"
              onClick={(e) => navigateModal(-1, e)}
            >
              <ChevronLeft size={48} />
            </button>

            <button 
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-primary transition-colors"
              onClick={(e) => navigateModal(1, e)}
            >
              <ChevronRight size={48} />
            </button>

            <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <motion.img
                layoutId={`cover-${selectedId}`}
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              <p className="text-white text-center mt-6 text-xl font-display italic tracking-wide drop-shadow-md">
                {selectedPhoto.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
