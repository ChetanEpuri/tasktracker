import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { useStore } from '../store/useStore';
import { Mail, CheckCircle2, AlertTriangle, Zap, MessageSquare, Clock, Filter, Trash2, ArrowRight } from 'lucide-react';

export const Inbox = () => {
  const { notifications } = useStore();
  const [activeId, setActiveId] = useState(notifications?.[0]?.id || null);
  const [filter, setFilter] = useState('all');

  const activeNotif = notifications.find(n => n.id === activeId);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 font-sans pb-12">
      {/* Left Pane: List */}
      <div className="w-[400px] flex flex-col shrink-0">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="font-[Instrument_Serif] text-5xl text-white tracking-tight mb-2">Inbox</h1>
            <p className="text-[--text-muted] font-[Inter] text-sm">Priority zero-latency dispatches</p>
          </div>
          <button className="bg-white/5 border border-white/10 text-white p-2.5 rounded-full hover:bg-white/10 transition-colors shadow-inner">
            <Filter size={18} />
          </button>
        </div>

        <GlassCard className="flex-1 p-0 overflow-hidden flex flex-col border-white/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]" hoverEffect={false}>
          <div className="flex border-b border-white/5 p-2 gap-2 shrink-0">
            {['all', 'unread', 'mentions'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-2.5 text-[10px] font-[Cabin] font-bold uppercase tracking-widest rounded-lg transition-all ${filter === f ? 'bg-white/10 text-white shadow-sm' : 'text-[--text-muted] hover:text-white hover:bg-white/5'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
            <AnimatePresence>
              {notifications.map((notif, idx) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActiveId(notif.id)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 group ${activeId === notif.id ? 'bg-[#7b39fc]/10 border-[#7b39fc]/30 shadow-md' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                >
                  <div className="flex gap-4">
                    <div className="shrink-0 mt-1">
                      {notif.type === 'alert' && <AlertTriangle size={18} className="text-[--accent-red]" />}
                      {notif.type === 'system' && <Zap size={18} className="text-[#7b39fc]" />}
                      {notif.type === 'message' && <MessageSquare size={18} className="text-[--accent-blue]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-sm font-bold font-[Inter] truncate pr-2 ${notif.read ? 'text-white/60' : 'text-white group-hover:text-[#7b39fc] transition-colors'}`}>
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-[--text-muted] font-[Manrope] whitespace-nowrap pt-0.5 uppercase tracking-wider font-bold">{notif.time}</span>
                      </div>
                      <p className={`text-xs font-[Inter] line-clamp-2 ${notif.read ? 'text-[--text-muted]' : 'text-white/80'}`}>
                        {notif.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </GlassCard>
      </div>

      {/* Right Pane: Detail */}
      <div className="flex-1 flex flex-col h-full min-w-0 pt-[88px]">
        <AnimatePresence mode="wait">
          {activeNotif ? (
            <motion.div
              key={activeNotif.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1 h-full"
            >
              <GlassCard className="h-full flex flex-col p-10 border-white/5 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] bg-gradient-to-br from-[#1a1528]/80 to-[#0a0a0a]/80" hoverEffect={false}>
                <div className="flex justify-between items-start mb-8 pb-8 border-b border-white/5 shrink-0">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#7b39fc]/20 flex items-center justify-center text-[#7b39fc] shadow-inner border border-[#7b39fc]/30">
                      {activeNotif.type === 'alert' && <AlertTriangle size={24} />}
                      {activeNotif.type === 'system' && <Zap size={24} />}
                      {activeNotif.type === 'message' && <MessageSquare size={24} />}
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-[Instrument_Serif] text-white tracking-tight mb-2">{activeNotif.title}</h2>
                      <div className="flex items-center gap-3 text-[10px] font-[Manrope] text-[--text-muted] uppercase tracking-widest font-bold">
                        <span>Datacore System</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[#7b39fc]">{activeNotif.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-[--text-muted] hover:text-white hover:bg-white/10 transition-colors shadow-sm hover:-translate-y-0.5 will-change-transform">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none flex-1 overflow-y-auto custom-scrollbar pr-4">
                  <p className="text-white/80 font-[Inter] text-base leading-relaxed">{activeNotif.content}</p>
                  
                  {activeNotif.type === 'alert' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="mt-10 p-6 bg-[--accent-red]/10 border border-[--accent-red]/30 rounded-2xl relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[--accent-red]/0 via-[--accent-red]/5 to-[--accent-red]/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
                      <h4 className="flex items-center gap-2 text-[--accent-red] font-[Manrope] font-bold uppercase tracking-wider text-xs mb-3">
                        <AlertTriangle size={14} /> Required Action
                      </h4>
                      <p className="text-white text-sm font-[Inter] mb-6">Anomaly detected in quadrant. Please dispatch a maintenance crew immediately to resolve the pending issue.</p>
                      <button className="bg-[--accent-red] text-white px-8 py-3 rounded-full text-xs font-[Cabin] font-bold hover:bg-red-600 transition-all shadow-lg shadow-[--accent-red]/20 flex items-center gap-2 uppercase tracking-widest hover:shadow-[--accent-red]/40 hover:-translate-y-1 will-change-transform">
                        Deploy Crew <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <div className="flex-1 flex items-center justify-center h-full">
              <div className="text-center text-[--text-muted]">
                <Mail size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-[Inter] text-sm">Select a dispatch to view details</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
