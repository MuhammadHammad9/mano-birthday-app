import React, { useRef, useEffect, useState } from 'react';

interface ScratchCardProps {
  children: React.ReactNode;
  text?: string;
  className?: string;
}

export default function ScratchCard({ children, text = "Scratch to Reveal ✨", className = "" }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false); // Can be used to fade out entirely

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeObserver = new ResizeObserver(() => {
      if (isRevealed) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Add metallic gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#e5b2ca');
      gradient.addColorStop(0.5, '#cd82a0');
      gradient.addColorStop(1, '#e5b2ca');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add text
      ctx.font = 'bold 24px system-ui, sans-serif';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Basic text wrapping if too long
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [isRevealed, text]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();
    
    // Smooth out drawing
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    handleDrag(e); // allow tap dots
  };

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    
    // Prevent scrolling while scratching on mobile
    if (e.cancelable && e.type === 'touchmove') {
      e.preventDefault();
    }

    if ('touches' in e) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    } else {
      scratch((e as React.MouseEvent).clientX, (e as React.MouseEvent).clientY);
    }
  };

  const handleDragEnd = () => {
    setIsDrawing(false);
    
    // Optional: We could check if X percent is scratched to fully reveal here.
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative rounded-2xl overflow-hidden cursor-pointer select-none shadow-xl ${className}`}
    >
      {children}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDrag}
          onTouchEnd={handleDragEnd}
          className="absolute inset-0 z-10 w-full h-full touch-none"
        />
      )}
    </div>
  );
}
