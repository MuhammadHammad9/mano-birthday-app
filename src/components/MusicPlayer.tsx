import { useState, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'motion/react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.2; // Soft ambient volume
        audioRef.current.play().catch(e => console.error("Playback blocked:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop
        // Beautiful, soft romantic piano track from Pixabay
        src="https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=a-romantic-piano-126421.mp3"
      />
      
      <button 
        onClick={togglePlay}
        className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 overflow-hidden group border border-primary-light/20 shadow-sm
          ${isPlaying 
            ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(229,114,151,0.2)]' 
            : 'bg-card/80 text-text-secondary hover:text-primary backdrop-blur-md'
          }`}
        title={isPlaying ? "Pause Ambient Music" : "Play Ambient Music"}
      >
        {/* Animated Sound Waves when playing */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20 Mix-blend-overlay">
            <motion.div animate={{ height: [10, 24, 10] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-primary rounded-full" />
            <motion.div animate={{ height: [16, 8, 16] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-primary rounded-full" />
            <motion.div animate={{ height: [8, 20, 8] }} transition={{ repeat: Infinity, duration: 1.0 }} className="w-1 bg-primary rounded-full" />
          </div>
        )}

        <div className="relative z-10 transition-transform duration-300 group-active:scale-90">
          {isPlaying ? <Music size={18} /> : <VolumeX size={18} />}
        </div>
      </button>
    </>
  );
}
