import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export const GlassCard = ({ children, className = '', hoverEffect = true, onClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`;

  return (
    <div
      onClick={onClick}
      onMouseMove={hoverEffect ? handleMouseMove : undefined}
      className={`relative group rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-300 ${onClick ? 'cursor-pointer hover:border-white/[0.15]' : ''} ${className}`}
    >
      {hoverEffect && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
