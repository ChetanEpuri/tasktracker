import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Cpu, Terminal, Zap, ShieldCheck, Activity, Play, Square, Settings2 } from 'lucide-react';

export const Agents = () => {
  const [logs, setLogs] = useState([
    "> INITIALIZING DATACORE INTELLIGENCE MODULE...",
    "> CONNECTING TO PROPERTY MANAGEMENT SYSTEMS...",
    "> CONNECTION SECURE. 0 LATENCY.",
  ]);

  const [activeAgent, setActiveAgent] = useState('routing');

  const agents = [
    { id: 'routing', name: 'Predictive Routing', status: 'Active', cpu: '42%', icon: <Activity size={20} /> },
    { id: 'maintenance', name: 'Maintenance Batching', status: 'Active', cpu: '28%', icon: <Zap size={20} /> },
    { id: 'security', name: 'Security Overwatch', status: 'Idle', cpu: '2%', icon: <ShieldCheck size={20} /> },
  ];

  // Simulated live logs
  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        "> OPTIMIZING HVAC PATHFINDING IN EAST WING...",
        "> DETECTED ANOMALY IN SUITE 402 - DISPATCHING HOUSEKEEPING.",
        "> RECALCULATING ELEVATOR LOAD BALANCING.",
        "> SECURITY SWEEP COMPLETE. NO INCIDENTS.",
        "> BATCHING WORK ORDERS FOR PLUMBING CREW."
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setLogs(prev => {
        const newLogs = [...prev, randomMsg];
        return newLogs.slice(-10); // Keep last 10 logs
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 font-sans pb-12 h-[calc(100vh-8rem)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
        <div>
          <h1 className="font-[Instrument_Serif] text-5xl text-white tracking-tight mb-2">Datacore Agents</h1>
          <p className="text-[--text-muted] font-[Inter] text-sm flex items-center gap-2">
            <Cpu size={14} className="text-[#7b39fc]" /> Autonomous Property Intelligence
          </p>
        </div>

        <div className="flex gap-4">
          <button className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-full text-xs font-[Cabin] font-bold hover:bg-white/10 transition-colors flex items-center gap-2 shadow-inner">
            <Settings2 size={16} /> Global Config
          </button>
          <button className="bg-[--accent-red] text-white px-6 py-2.5 rounded-full text-xs font-[Cabin] font-bold hover:bg-red-600 transition-colors shadow-lg shadow-[--accent-red]/20 flex items-center gap-2 uppercase tracking-wide">
            <Square size={14} className="fill-white" /> Emergency Halt
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        
        {/* Agents List Pane */}
        <div className="w-[350px] shrink-0 flex flex-col gap-4">
          {agents.map((agent, idx) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveAgent(agent.id)}
            >
              <GlassCard 
                className={`p-5 cursor-pointer border transition-all duration-300 group ${activeAgent === agent.id ? 'bg-[#7b39fc]/10 border-[#7b39fc]/50 shadow-[0_0_30px_rgba(123,57,252,0.15)]' : 'bg-[#110D1A]/80 border-white/5 hover:border-white/20'}`}
                hoverEffect={false}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${activeAgent === agent.id ? 'bg-[#7b39fc] text-white shadow-[0_0_15px_#7b39fc]' : 'bg-white/5 text-[--text-muted]'}`}>
                    {agent.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    {agent.status === 'Active' ? (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                      </span>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-[--text-muted]"></span>
                    )}
                    <span className="text-[10px] font-[Cabin] font-bold uppercase tracking-widest text-white/60">{agent.status}</span>
                  </div>
                </div>
                
                <h3 className="font-[Instrument_Serif] text-2xl text-white mb-4 group-hover:text-[#7b39fc] transition-colors">{agent.name}</h3>
                
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                  <span className="text-xs font-[Inter] text-[--text-muted]">CPU Usage</span>
                  <span className="text-sm font-[Cabin] font-bold text-white">{agent.cpu}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Terminal Pane */}
        <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden border-white/5 bg-[#0a0a0a]" hoverEffect={false}>
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#110D1A]">
            <div className="flex items-center gap-3 text-[--text-muted]">
              <Terminal size={18} />
              <span className="font-[Cabin] font-bold text-xs uppercase tracking-[0.2em]">Datacore Live Telemetry</span>
            </div>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-white/10" />
              <span className="w-3 h-3 rounded-full bg-white/10" />
              <span className="w-3 h-3 rounded-full bg-white/10" />
            </div>
          </div>
          
          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar flex flex-col justify-end">
            <AnimatePresence>
              {logs.map((log, i) => (
                <motion.div 
                  key={i + log}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-2 text-[#10b981] drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]"
                >
                  <span className="text-white/30 mr-4">[{new Date().toISOString().split('T')[1].slice(0, 8)}]</span>
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="mt-2 flex items-center text-[#7b39fc] drop-shadow-[0_0_8px_rgba(123,57,252,0.8)]">
              <span className="mr-2">&gt;</span>
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-[#7b39fc]"
              />
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
