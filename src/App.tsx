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
import { RECIPIENT_NAME } from './constants';
import { useScrollAnimation } from './hooks/useScrollAnimation';

export default function App() {
  useScrollAnimation();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background selection:bg-primary-light selection:text-primary-dark">
        <Confetti />
        <FloatingBackground />
        <Navbar />
        
        <main>
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
        </main>

        <footer className="py-12 px-4 text-center border-t border-primary-light/20 bg-white">
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
