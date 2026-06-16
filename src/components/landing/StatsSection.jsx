import React, { useEffect, useState, useRef } from 'react';

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true);
      }
    }, { threshold: 0.15 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime;
    const endVal = parseFloat(end.replace(/[^0-9.]/g, ''));
    const suffix = end.replace(/[0-9.]/g, '');

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      let currentVal = endVal * easeProgress;
      // formatting logic (assume integer if no decimal in end)
      if (end.includes('.')) {
        currentVal = currentVal.toFixed(1);
      } else {
        currentVal = Math.floor(currentVal);
      }
      
      setCount(`${currentVal}${suffix}`);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end); // force exact end value
      }
    };
    
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{hasStarted ? count : '0' + end.replace(/[0-9.]/g, '')}</span>;
};

export const StatsSection = () => {
  return (
    <section className="py-24 bg-[--obsidian] relative overflow-hidden">
      {/* Meander Pattern Background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="meander" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0 20h80v60H20v-40h40v20H40 M0 100v-20" fill="none" stroke="var(--gold)" strokeWidth="4"/>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#meander)" />
      </svg>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <div className="font-display text-6xl gold-text mb-2">
            <CountUp end="100K+" />
          </div>
          <span className="font-sans text-white/60 text-sm tracking-widest uppercase">Teams</span>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="font-display text-6xl gold-text mb-2">
            <CountUp end="12M+" />
          </div>
          <span className="font-sans text-white/60 text-sm tracking-widest uppercase">Tasks Completed</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="font-display text-6xl gold-text mb-2">
            <CountUp end="99.9%" />
          </div>
          <span className="font-sans text-white/60 text-sm tracking-widest uppercase">Uptime</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="font-display text-6xl gold-text mb-2">
            <CountUp end="50+" />
          </div>
          <span className="font-sans text-white/60 text-sm tracking-widest uppercase">Countries</span>
        </div>
      </div>
    </section>
  );
};
