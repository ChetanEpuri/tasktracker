import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FocusMode = ({ isActive, onClose }: { isActive: boolean, onClose: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  useEffect(() => {
    let timer: number;
    if (isActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: '#000',
            color: '#fff',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div style={{ fontSize: '2rem', color: 'var(--color-accent-1)', marginBottom: '2rem', fontWeight: 900 }}>
            FOCUS PROTOCOL ENGAGED
          </div>
          
          <div style={{ 
            fontSize: '15vw', 
            fontWeight: 900, 
            lineHeight: 1,
            textShadow: '8px 8px 0px var(--color-accent-2)'
          }}>
            {mins}:{secs}
          </div>

          <button 
            onClick={onClose}
            className="btn btn-secondary"
            style={{ marginTop: '4rem', fontSize: '1.5rem' }}
          >
            ABORT
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
