import React, { useState, useEffect, useRef } from 'react';
import { Search, CheckSquare, Folder, Zap } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const CommandPalette = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const { tasks, projects } = useStore();

  const results = [
    { type: 'Task', icon: CheckSquare, label: 'Design Database Schema', secondary: 'In Progress' },
    { type: 'Task', icon: CheckSquare, label: 'Implement JWT Auth', secondary: 'Todo' },
    { type: 'Project', icon: Folder, label: 'Olympus Web App', secondary: 'Active' },
    { type: 'Project', icon: Folder, label: 'Marketing Website', secondary: 'Planning' },
    { type: 'Action', icon: Zap, label: 'Create new task', secondary: 'Shortcut: C' },
    { type: 'Action', icon: Zap, label: 'Switch to Dark Mode', secondary: 'Settings' },
  ].filter(r => r.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    inputRef.current?.focus();
    
    const handleKeyDown = (e) => {
      if (!onClose) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      }
      if (e.key === 'Enter') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [results.length, onClose]);

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-start justify-center pt-24" onClick={onClose}>
      <div 
        className="rounded-3xl border border-white/10 w-full max-w-xl mx-4 overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-3xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-5 border-b border-white/10 bg-white/5">
          <Search size={20} className="text-[--text-muted]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Search tasks, projects, actions..."
            className="flex-1 bg-transparent text-lg font-medium outline-none py-4 px-4 text-white"
          />
        </div>

        <div className="max-h-80 overflow-y-auto py-3 custom-scrollbar">
          {results.length === 0 ? (
            <div className="p-4 text-center text-sm font-medium text-[--text-muted]">No results found for "{query}"</div>
          ) : (
            results.map((result, i) => (
              <div 
                key={i}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-xl cursor-pointer transition-colors ${i === selectedIndex ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-[--text-muted]'}`}
                onMouseEnter={() => setSelectedIndex(i)}
                onClick={onClose}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${i === selectedIndex ? 'bg-white/10 border-white/10' : 'bg-transparent border-transparent'}`}>
                  <result.icon size={16} className={i === selectedIndex ? 'text-white' : 'text-[--text-muted]'} />
                </div>
                <span className={`text-sm font-semibold ${i === selectedIndex ? 'text-white' : 'text-[--text-main]'}`}>{result.label}</span>
                <span className="text-[--text-muted] text-xs font-medium ml-auto bg-white/5 px-2 py-1 rounded-md">{result.secondary}</span>
              </div>
            ))
          )}
        </div>
        
        <div className="bg-white/5 px-5 py-3 text-[10px] font-semibold text-[--text-muted] flex justify-between border-t border-white/10">
          <span className="flex items-center gap-2"><span className="border border-white/10 rounded px-1">↑↓</span> navigate</span>
          <span className="flex items-center gap-2"><span className="border border-white/10 rounded px-1">↵</span> select</span>
          <span className="flex items-center gap-2"><span className="border border-white/10 rounded px-1">ESC</span> close</span>
        </div>
      </div>
    </div>
  );
};
