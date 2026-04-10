import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function LiveCounter() {
  const [timeLeft, setTimeLeft] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Start Date: 8th April 2025
    const startDate = new Date('2025-04-08T00:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      
      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const diffMs = now.getTime() - startDate.getTime();
      const hours = Math.floor((Math.max(0, diffMs) / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((Math.max(0, diffMs) / 1000 / 60) % 60);
      const seconds = Math.floor((Math.max(0, diffMs) / 1000) % 60);

      setTimeLeft({ 
        years: Math.max(0, years), 
        months: Math.max(0, months), 
        days: Math.max(0, days), 
        hours, 
        minutes, 
        seconds 
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Years', value: timeLeft.years },
    { label: 'Months', value: timeLeft.months },
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-8 w-full max-w-4xl mx-auto px-4 z-20 relative">
      {timeUnits.map((unit, idx) => (
        <motion.div 
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + (idx * 0.1) }}
          className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-3 md:p-5 w-[80px] md:w-[100px] shadow-xl hover:scale-105 transition-transform"
        >
          <span className="text-2xl md:text-4xl font-bold text-primary-dark font-display mb-1 tabular-nums">
            {unit.value}
          </span>
          <span className="text-[9px] md:text-xs uppercase tracking-[0.2em] text-primary font-bold">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
