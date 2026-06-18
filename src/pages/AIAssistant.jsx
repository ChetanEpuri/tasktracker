import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';

export const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Datacore Intelligence online. I can help you analyze occupancy rates, optimize housekeeping routes, or draft property upgrade proposals. How can I assist today?' }
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
      const response = "I've analyzed the current occupancy data against the maintenance schedule. By batching the HVAC inspections in the East Wing during the 11:00 AM checkout window, we can reduce staff overlap by 22% and improve guest satisfaction scores.";
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1500);
  };

  return (
    <GlassCard hoverEffect={false} className="flex flex-col h-[calc(100vh-140px)] max-w-3xl mx-auto font-sans">
      
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-[#1a1528]/80 shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7b39fc] rounded-full blur-[60px] opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <h2 className="text-2xl font-[Instrument_Serif] text-white flex items-center gap-3 tracking-tight">
          <Sparkles size={24} className="text-[#7b39fc]" />
          Datacore Intelligence
        </h2>
        <p className="text-sm font-[Inter] text-[--text-muted] mt-1">Advanced AI for Property Operations</p>
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
            <div className={`max-w-[85%] flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${m.role === 'assistant' ? 'bg-gradient-to-tr from-[#2b2344] to-[#7b39fc] border border-white/10 text-white' : 'bg-white text-black font-[Cabin]'}`}>
                {m.role === 'assistant' ? <Bot size={16} /> : <span className="text-[10px] font-bold">AD</span>}
              </div>
              <div className={`p-4 rounded-2xl text-[15px] font-[Inter] leading-relaxed shadow-sm ${m.role === 'assistant' ? 'bg-[#2b2344]/50 border border-white/5 text-white rounded-tl-sm' : 'bg-white text-black rounded-tr-sm'}`}>
                {m.content}
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
             <div className="max-w-[80%] flex gap-4">
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2b2344] to-[#7b39fc] text-white flex items-center justify-center shrink-0 shadow-sm">
                 <Bot size={16} />
               </div>
               <div className="px-5 py-4 bg-[#2b2344]/50 border border-white/5 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
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
      <div className="p-6 border-t border-white/5 bg-[#1a1528]/80 shrink-0">
        <form onSubmit={handleSubmit} className="relative flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Datacore Intelligence..." 
            className="flex-1 bg-black/40 border border-white/10 rounded-full pl-6 pr-4 py-3 outline-none text-white text-sm font-[Inter] focus:border-[#7b39fc]/50 focus:bg-black/60 transition-all shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="px-6 py-3 rounded-full bg-white text-black text-sm font-[Cabin] font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center shadow-lg shadow-white/10 uppercase tracking-wide"
          >
            Send
          </button>
        </form>
        <div className="flex flex-wrap gap-3 mt-4 px-2">
          {['Generate Housekeeping Schedule', 'Analyze Occupancy', 'Draft Renovation Brief'].map(s => (
            <button key={s} onClick={() => setInput(s)} className="text-xs font-[Inter] font-semibold bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[--text-muted] hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
              {s}
            </button>
          ))}
        </div>
      </div>

    </GlassCard>
  );
};
