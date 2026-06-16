import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../context/TaskContext';
import type { Priority } from '../types';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { addTask } = useTasks();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    let priority: Priority = 'STANDARD';
    if (input.includes('!urgent')) priority = 'DEFCON 1';
    if (input.includes('!chill')) priority = 'CHILL';

    const tags = input.match(/#[\w-]+/g)?.map(t => t.slice(1).toUpperCase()) || [];
    let title = input.replace(/!urgent|!chill/g, '').replace(/#[\w-]+/g, '').trim().toUpperCase();

    addTask(title, priority, tags);
    setInput('');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '20vh'
        }}>
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            style={{
              width: '100%',
              maxWidth: '800px',
              background: 'var(--color-surface)',
              border: 'var(--border-width) solid var(--color-border)',
              boxShadow: '16px 16px 0px var(--color-border)',
              padding: '2rem'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, marginBottom: '1rem', color: 'var(--color-accent-2)' }}>
              &gt; TERMINAL INITIATED
            </div>
            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type task... use !urgent, !chill, #tag"
                className="brutal-input"
                style={{ width: '100%', fontSize: '2rem', padding: '1.5rem', background: 'var(--color-bg)' }}
              />
            </form>
            <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              PRESS ESC TO ABORT. PRESS ENTER TO EXECUTE.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
