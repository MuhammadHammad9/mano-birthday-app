import { useState, useEffect } from 'react';
import { RECIPIENT_NAME } from '../constants';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reasons', href: '#reasons' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Letter', href: '#letter' },
    { name: 'Playlist', href: '#playlist' },
    { name: 'Quiz', href: '#quiz' },
    { name: 'Guestbook', href: '#guestbook' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-display font-bold text-2xl text-primary-dark tracking-tight">
          {RECIPIENT_NAME}<span className="text-primary">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary-dark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-6 right-6 text-primary-dark" onClick={() => setIsMenuOpen(false)}>
          <X size={32} />
        </button>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl font-display font-bold text-primary-dark hover:text-primary transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
