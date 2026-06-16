import React, { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface LiquidButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
  variant?: 'gold' | 'outline' | 'dark';
}

export const LiquidButton = ({ children, onClick, className = '', variant = 'gold' }: LiquidButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getStyles = () => {
    switch(variant) {
      case 'gold': return { bg: 'linear-gradient(135deg, #E6C27A 0%, #B38728 50%, #FBF5B7 100%)', text: '#fff', border: 'none' };
      case 'outline': return { bg: 'transparent', text: '#1A202C', border: '1px solid #B38728' };
      case 'dark': return { bg: '#1A202C', text: '#fff', border: '1px solid rgba(255,255,255,0.2)' };
    }
  };

  const styles = getStyles();

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'relative',
        padding: '1rem 3rem',
        borderRadius: '50px',
        background: styles.bg,
        color: styles.text,
        border: styles.border,
        fontFamily: 'var(--font-heading)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: variant === 'gold' ? '0 10px 30px rgba(179, 135, 40, 0.4)' : 'none',
      }}
      className={className}
    >
      {/* WebGL Ripple Simulation Overlay (CSS interpretation for perf) */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isHovered ? 0.2 : 0,
          scale: isHovered ? 2 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '100%', height: '100%',
          background: '#fff',
          borderRadius: '50%',
          transformOrigin: 'center',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Staggered Text Layer */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        {children.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 0 }}
            animate={{ y: isHovered ? -20 : 0 }}
            transition={{ duration: 0.3, delay: i * 0.02, ease: [0.76, 0, 0.24, 1] }}
            style={{ display: char === ' ' ? 'inline' : 'inline-block', whiteSpace: 'pre' }}
          >
            {char}
          </motion.span>
        ))}
        {/* Hidden replacement text that flies up */}
        <div style={{ position: 'absolute', top: '100%', left: 0, display: 'flex', width: '100%', justifyContent: 'center' }}>
          {children.split('').map((char, i) => (
            <motion.span
              key={i + 'alt'}
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -20 : 0 }}
              transition={{ duration: 0.3, delay: i * 0.02, ease: [0.76, 0, 0.24, 1] }}
              style={{ display: char === ' ' ? 'inline' : 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.button>
  );
};
