/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Reasons from './components/Reasons';
import Timeline from './components/Timeline';
import LoveLetter from './components/LoveLetter';
import Playlist from './components/Playlist';
import Promises from './components/Promises';
import Quiz from './components/Quiz';
import VideoMessage from './components/VideoMessage';
import Guestbook from './components/Guestbook';
import SecretPage from './components/SecretPage';
import Confetti from './components/Confetti';
import FloatingBackground from './components/FloatingBackground';
import MagicCursor from './components/MagicCursor';
import { RECIPIENT_NAME } from './constants';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

export default function App() {
  useScrollAnimation();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((e.clientX - centerX) / centerX);
      mouseY.set((e.clientY - centerY) / centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Subtle reverse movement for content layer
  const contentX = useTransform(springX, [-1, 1], [-10, 10]);
  const contentY = useTransform(springY, [-1, 1], [-10, 10]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background selection:bg-primary-light selection:text-primary-dark overflow-hidden transition-colors duration-1000">
        <MagicCursor />
        <Confetti />
        <FloatingBackground />
        <Navbar />
        
        <motion.main style={{ x: contentX, y: contentY }} className="will-change-transform z-10 relative">
          <Hero />
          <Gallery />
          <Reasons />
          <Timeline />
          <LoveLetter />
          <VideoMessage />
          <Playlist />
          <Quiz />
          <Promises />
          <Guestbook />
          <SecretPage />
        </motion.main>

        <footer className="py-12 px-4 text-center border-t border-primary-light/20 bg-card transition-colors duration-500">
          <p className="font-display text-xl text-primary-dark mb-2">Happy Birthday, {RECIPIENT_NAME}!</p>
          <p className="text-text-secondary text-sm">Made with ♥ by Hammad</p>
          <div className="mt-4 text-[10px] text-primary-light/50 uppercase tracking-[0.2em]">
            © 2026 • Forever & Always
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
