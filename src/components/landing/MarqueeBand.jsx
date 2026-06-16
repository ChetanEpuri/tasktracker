import React from 'react';
import { motion } from 'framer-motion';

export const MarqueeBand = () => {
  const words = [
    "Next.js", "React", "Framer Motion", "Tailwind CSS", "TypeScript", "Vite", "GraphQL", "PostgreSQL",
    "Next.js", "React", "Framer Motion", "Tailwind CSS", "TypeScript", "Vite", "GraphQL", "PostgreSQL"
  ];

  return (
    <div className="w-full py-10 border-y border-white/5 overflow-hidden relative bg-[#050505]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
      
      <div className="marquee-track flex gap-12 items-center opacity-40">
        {words.map((word, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="font-semibold text-xl text-white tracking-tight">{word}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
