import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CloudSky = () => {
  const [parting, setParting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setParting(true);
      } else {
        setParting(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cloudSVG = (
    <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.85">
        <ellipse cx="100" cy="50" rx="60" ry="35" fill="white" />
        <ellipse cx="60" cy="65" rx="45" ry="25" fill="rgba(255,255,255,0.7)" />
        <ellipse cx="140" cy="60" rx="50" ry="30" fill="rgba(255,255,255,0.9)" />
      </g>
    </svg>
  );

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 ${parting ? 'clouds-parting' : ''}`}>
      {/* Left Clouds */}
      <div className="cloud-left absolute top-[10%] left-[-5%] opacity-60" style={{ animation: 'cloudDrift 10s ease-in-out infinite alternate' }}>{cloudSVG}</div>
      <div className="cloud-left absolute top-[30%] left-[10%] opacity-80" style={{ animation: 'cloudDrift 8s ease-in-out infinite alternate 1s' }}>{cloudSVG}</div>
      <div className="cloud-left absolute top-[60%] left-[-2%] opacity-70" style={{ animation: 'cloudDrift 12s ease-in-out infinite alternate 2s' }}>{cloudSVG}</div>
      <div className="cloud-left absolute top-[80%] left-[15%] opacity-90" style={{ animation: 'cloudDrift 9s ease-in-out infinite alternate 0.5s' }}>{cloudSVG}</div>

      {/* Right Clouds */}
      <div className="cloud-right absolute top-[15%] right-[5%] opacity-70" style={{ animation: 'cloudDrift 11s ease-in-out infinite alternate 0.2s' }}>{cloudSVG}</div>
      <div className="cloud-right absolute top-[40%] right-[-10%] opacity-85" style={{ animation: 'cloudDrift 7s ease-in-out infinite alternate 1.5s' }}>{cloudSVG}</div>
      <div className="cloud-right absolute top-[65%] right-[10%] opacity-60" style={{ animation: 'cloudDrift 14s ease-in-out infinite alternate 3s' }}>{cloudSVG}</div>
      <div className="cloud-right absolute top-[85%] right-[-5%] opacity-95" style={{ animation: 'cloudDrift 8.5s ease-in-out infinite alternate 0.8s' }}>{cloudSVG}</div>
    </div>
  );
};
