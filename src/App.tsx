import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { MainLayout } from './components/layout/MainLayout';
import Landing from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { MyTasks } from './pages/MyTasks';
import { TaskProvider } from './context/TaskContext';

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex-center" style={{ height: '100%', flexDirection: 'column', gap: '1rem', opacity: 0.5 }}>
    <h2 style={{ fontSize: '2rem' }}>{title}</h2>
    <p>Premium 2026 AI Interface under construction.</p>
  </div>
);

// The Full-Screen Curtain Transition
const PageTransitionLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ opacity: 1, clipPath: 'circle(150% at 50% 50%)' }}
          exit={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ width: '100%', height: '100%' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* The Curtain Loader itself - fires on route change */}
      <AnimatePresence>
        <motion.div
          key={location.pathname + '-curtain'}
          initial={{ y: '100%' }}
          animate={{ y: '-100%' }}
          exit={{ y: '100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'var(--color-river-teal)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
        >
          <h1 style={{ color: 'var(--color-gold-light)', fontSize: '4rem', fontFamily: 'var(--font-heading)' }}>
            LOADING OLYMPUS
          </h1>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const AnimatedRoutes = () => {
  return (
    <PageTransitionLayout>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Main App Routes */}
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<MyTasks />} />
          <Route path="inbox" element={<PlaceholderPage title="Inbox" />} />
          <Route path="projects" element={<PlaceholderPage title="Projects" />} />
          <Route path="calendar" element={<PlaceholderPage title="Calendar" />} />
          <Route path="timeline" element={<PlaceholderPage title="Timeline" />} />
          <Route path="goals" element={<PlaceholderPage title="Goals" />} />
          <Route path="documents" element={<PlaceholderPage title="Documents" />} />
          <Route path="reports" element={<PlaceholderPage title="Reports" />} />
          <Route path="automations" element={<PlaceholderPage title="Automations" />} />
          <Route path="agents" element={<PlaceholderPage title="AI Agents" />} />
          <Route path="team" element={<PlaceholderPage title="Team Directory" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
      </Routes>
    </PageTransitionLayout>
  );
};

function App() {
  useEffect(() => {
    // 1. Easter Egg Console Log
    console.log(
      '%c OLYMPUS AI %c The Future of Productivity %c LOAD_NORRIS ',
      'background: #B38728; color: #fff; font-size: 20px; font-weight: bold; padding: 10px; border-radius: 4px;',
      'color: #1A4B5C; font-size: 16px; font-weight: bold; padding: 10px;',
      'background: #000; color: #0f0; font-size: 12px; font-family: monospace; padding: 4px;'
    );

    // 2. Lenis Smooth Scrolling Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <TaskProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
