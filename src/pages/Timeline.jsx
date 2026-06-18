import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { GlassCard } from '../ui/GlassCard';
import { GitBranch, AlertCircle, Clock, CheckCircle2, TrendingUp, Filter } from 'lucide-react';

export const Timeline = () => {
  const { projects } = useStore();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Create a timeline grid with dummy markers
  const timelineGrid = Array.from({ length: 6 }, (_, i) => i + 4); // May to Oct

  return (
    <div className="flex flex-col gap-6 font-sans pb-12 h-[calc(100vh-8rem)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
        <div>
          <h1 className="font-[Instrument_Serif] text-5xl text-white tracking-tight mb-2">Global Timeline</h1>
          <p className="text-[--text-muted] font-[Inter] text-sm flex items-center gap-2">
            <GitBranch size={14} className="text-[#7b39fc]" /> Track parallel infrastructure upgrades
          </p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-3 mr-4">
            <div className="flex items-center gap-1.5 text-[10px] font-[Cabin] font-bold text-white uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span> On Track
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-[Cabin] font-bold text-white uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[--accent-amber]"></span> Delayed
            </div>
          </div>
          <button className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-full text-xs font-[Cabin] font-bold hover:bg-white/10 transition-colors flex items-center gap-2 shadow-inner">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      {/* Gantt Chart Area */}
      <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] bg-[#110D1A]/90 relative" hoverEffect={false}>
        
        {/* Timeline Header (Months) */}
        <div className="flex border-b border-white/5 bg-black/40 shrink-0 pl-64">
          {timelineGrid.map(monthIdx => (
            <div key={monthIdx} className="flex-1 py-4 border-r border-white/5 text-center relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#7b39fc]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <span className="font-[Cabin] font-bold text-xs text-[--text-muted] uppercase tracking-[0.2em]">{months[monthIdx]} 2026</span>
            </div>
          ))}
        </div>

        {/* Projects Rows */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          
          {/* Vertical Grid Lines */}
          <div className="absolute inset-0 flex pl-64 pointer-events-none">
            {timelineGrid.map(monthIdx => (
              <div key={monthIdx} className="flex-1 border-r border-white/5 border-dashed" />
            ))}
          </div>

          {projects.map((project, idx) => {
            const isDelayed = project.health === 'off-track' || project.health === 'at-risk';
            // Mock widths and positions for visual demo purposes
            const leftOffset = (idx * 15) + 5; 
            const width = project.progress > 80 ? 40 : 60;

            return (
              <div key={project.id} className="flex border-b border-white/5 group hover:bg-white/5 transition-colors relative z-10">
                
                {/* Fixed Project Info Column */}
                <div className="w-64 shrink-0 py-5 pl-6 pr-4 border-r border-white/5 bg-[#110D1A]/90 group-hover:bg-transparent backdrop-blur-md flex flex-col justify-center">
                  <h3 className="font-[Instrument_Serif] text-2xl text-white truncate mb-1">{project.name}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-[Inter] text-[--text-muted] uppercase tracking-wider font-bold">
                    <TrendingUp size={12} className={isDelayed ? "text-[--accent-amber]" : "text-[#10b981]"} />
                    {project.status}
                  </div>
                </div>

                {/* Gantt Bar Area */}
                <div className="flex-1 relative py-5 flex items-center">
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: `${width}%`, opacity: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
                    className={`absolute h-8 rounded-full shadow-lg flex items-center px-4 overflow-hidden cursor-pointer will-change-transform transform-gpu hover:scale-105 transition-transform origin-left`}
                    style={{ left: `${leftOffset}%` }}
                  >
                    {/* Bar Background */}
                    <div className={`absolute inset-0 opacity-80 ${isDelayed ? 'bg-gradient-to-r from-[#f59e0b] to-[#d97706]' : 'bg-gradient-to-r from-[#7b39fc] to-[#a77bf5]'}`} />
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />

                    {/* Bar Content */}
                    <div className="relative z-10 flex items-center gap-2 w-full justify-between">
                      <span className="font-[Inter] text-[10px] font-bold text-white whitespace-nowrap drop-shadow-md">{project.progress}% Complete</span>
                      {isDelayed ? <AlertCircle size={12} className="text-white drop-shadow-md" /> : <CheckCircle2 size={12} className="text-white drop-shadow-md" />}
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};
