import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverIntensity?: number;
}

export const GlassCard = ({ children, className = '', onClick, hoverIntensity = 1 }: GlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX);
    y.set(mouseY);
  };

  const gradientX = useMotionTemplate`${springX}px`;
  const gradientY = useMotionTemplate`${springY}px`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.1)',
        transformStyle: 'preserve-3d',
      }}
      className={`cursor-pointer ${className}`}
    >
      {/* Dynamic Lighting Layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: useMotionTemplate`radial-gradient(circle at ${gradientX} ${gradientY}, rgba(255,255,255,${0.4 * hoverIntensity}), transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />
      
      {/* Noise Texture for Frosted Glass Effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, padding: '2.5rem' }}>
        {children}
      </div>
    </motion.div>
  );
};
