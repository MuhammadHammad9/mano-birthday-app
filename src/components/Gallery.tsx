import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PHOTOS } from '../constants';
import { X, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';

export default function Gallery() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedPhoto = PHOTOS.find(p => p.id === selectedId);

  const navigate = (direction: number) => {
    if (!selectedId) return;
    const currentIndex = PHOTOS.findIndex(p => p.id === selectedId);
    let nextIndex = currentIndex + direction;
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
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12 animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Our Memories</h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {PHOTOS.map((photo, index) => (
          <motion.div
            key={photo.id}
            layoutId={photo.id}
            onClick={() => setSelectedId(photo.id)}
            className={`relative cursor-pointer overflow-hidden rounded-xl animate-on-scroll`}
            style={{ transitionDelay: `${index * 100}ms` }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-64 object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white text-sm font-medium">{photo.caption}</p>
            </div>
          </motion.div>
        ))}
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
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            >
              <ChevronLeft size={48} />
            </button>

            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
            >
              <ChevronRight size={48} />
            </button>

            <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <motion.img
                layoutId={selectedId}
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              <p className="text-white text-center mt-6 text-lg font-display italic">
                {selectedPhoto.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
