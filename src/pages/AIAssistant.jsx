import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';

export const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'AI Assistant online. How can I help optimize your workflow today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = "I've analyzed your request and drafted a new project timeline. Velocity is expected to increase by 14%.";
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1200);
  };

  return (
    <GlassCard hoverEffect={false} className="flex flex-col h-[calc(100vh-140px)] max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-white/5 shrink-0">
        <h2 className="text-xl font-[Instrument_Serif] font-bold text-white flex items-center gap-3 tracking-tight">
          <Bot size={20} className="text-[#7b39fc]" />
          Datacore Intelligence
        </h2>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((m, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${m.role === 'assistant' ? 'bg-gradient-to-tr from-[--accent-purple] to-[--accent-blue] text-white' : 'bg-white text-black'}`}>
                {m.role === 'assistant' ? <Bot size={16} /> : <span className="text-[10px] font-bold">ME</span>}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed font-medium shadow-sm ${m.role === 'assistant' ? 'bg-white/10 border border-white/10 text-white rounded-tl-sm' : 'bg-white text-black rounded-tr-sm'}`}>
                {m.content}
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
             <div className="max-w-[80%] flex gap-4">
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[--accent-purple] to-[--accent-blue] text-white flex items-center justify-center shrink-0 shadow-sm">
                 <Bot size={16} />
               </div>
               <div className="px-5 py-4 bg-white/10 border border-white/10 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
               </div>
             </div>
          </motion.div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/5 bg-white/5 shrink-0">
        <form onSubmit={handleSubmit} className="relative flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI Assistant..." 
            className="flex-1 bg-black/40 border border-white/10 rounded-full pl-6 pr-4 py-3 outline-none text-white text-sm font-medium focus:border-white/30 focus:bg-white/5 transition-all shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="px-6 py-3 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          >
            Send
          </button>
        </form>
        <div className="flex gap-3 mt-4 px-2">
          {['Draft Project Brief', 'Reschedule Overdue', 'Analyze Workload'].map(s => (
            <button key={s} onClick={() => setInput(s)} className="text-xs font-semibold bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[--text-muted] hover:text-white hover:bg-white/10 transition-colors">
              {s}
            </button>
          ))}
        </div>
      </div>

    </GlassCard>
  );
};
