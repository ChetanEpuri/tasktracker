import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Landing from './pages/Landing';
import { AppShell } from './components/app/AppShell';
import { initStore } from './store/useStore';

export default function App() {
  const [view, setView] = useState('landing');
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    initStore();
  }, []);

  const navigateTo = (target) => {
    setTransitioning(true);
    setTimeout(() => {
      setView(target);
      setTransitioning(false);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#000000] z-[999] flex items-center justify-center"
          >
            <div className="w-8 h-8 border-4 border-[#7b39fc] border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!transitioning && view === 'landing' && <Landing onEnter={() => navigateTo('app')} />}
      {!transitioning && view === 'app' && <AppShell onExit={() => navigateTo('landing')} />}
    </>
  );
}
