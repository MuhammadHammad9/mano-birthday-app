export const playPop = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Ignore audio context errors (e.g., user hasn't interacted yet)
  }
};

export const playSuccessChime = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const playNote = (freq: number, startTime: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + 1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + 1);
    };

    // Major arpeggio
    playNote(523.25, 0); // C5
    playNote(659.25, 0.1); // E5
    playNote(783.99, 0.2); // G5
    playNote(1046.50, 0.3); // C6
  } catch (e) {}
};

let shimmerInterval: any = null;
export const startShimmer = () => {
  if (typeof window === 'undefined') return;
  if (shimmerInterval) return;
  
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const playSparkle = () => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      // High pitch random frequencies
      osc.frequency.setValueAtTime(2000 + Math.random() * 2000, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1); // Extremely short
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    };

    shimmerInterval = setInterval(playSparkle, 50); // Sparkle rapidly while scratching
  } catch (e) {}
};

export const stopShimmer = () => {
  if (shimmerInterval) {
    clearInterval(shimmerInterval);
    shimmerInterval = null;
  }
};
