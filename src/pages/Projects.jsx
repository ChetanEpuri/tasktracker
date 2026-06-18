import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { GlassCard } from '../ui/GlassCard';
import { Building2, Search, Filter, Hammer, TrendingUp, AlertCircle, CheckCircle2, ChevronRight, HardHat, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const Projects = () => {
  const { projects, users } = useStore();
  const [search, setSearch] = useState('');

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-[Instrument_Serif] text-5xl text-white tracking-tight mb-2">Property Upgrades</h1>
          <p className="text-[--text-muted] font-[Inter] text-sm">Track large-scale renovations and infrastructure upgrades</p>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[--text-muted]" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-black/40 border border-white/5 rounded-full pl-11 pr-6 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#7b39fc]/50 transition-colors shadow-inner"
            />
          </div>
          <button className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-full text-xs font-[Cabin] font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
          <button className="bg-[#7b39fc] text-white px-6 py-2.5 rounded-full text-xs font-[Cabin] font-bold hover:bg-[#6b29ec] transition-colors shadow-lg shadow-[#7b39fc]/20 flex items-center gap-2 uppercase tracking-wide">
            <Hammer size={16} /> New Upgrade
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 text-[--text-muted] mb-4">
              <Building2 size={18} />
              <span className="font-[Manrope] font-semibold text-sm uppercase tracking-wider">Active Projects</span>
            </div>
            <div className="font-[Instrument_Serif] text-[56px] leading-none text-white">{projects.filter(p => p.status === 'active').length}</div>
          </GlassCard>
        </div>
        <div className="col-span-12 md:col-span-3">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 text-[--text-muted] mb-4">
              <TrendingUp size={18} className="text-[#10b981]" />
              <span className="font-[Manrope] font-semibold text-sm uppercase tracking-wider">Budget Deployed</span>
            </div>
            <div className="font-[Instrument_Serif] text-[56px] leading-none text-white">$1.1<span className="text-3xl text-[--text-muted]">M</span></div>
          </GlassCard>
        </div>
        <div className="col-span-12 md:col-span-3">
          <GlassCard className="p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#7b39fc]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-3 text-[#7b39fc] mb-4">
              <Zap size={18} className="fill-[#7b39fc]/20" />
              <span className="font-[Manrope] font-semibold text-sm uppercase tracking-wider">Team Velocity</span>
            </div>
            <div className="font-[Instrument_Serif] text-[56px] leading-none text-white flex items-baseline gap-2">
              42 <span className="text-sm font-[Inter] text-[--text-muted] uppercase tracking-widest font-bold">Tasks / Wk</span>
            </div>
          </GlassCard>
        </div>
        <div className="col-span-12 md:col-span-3">
          <GlassCard className="p-6 border-[--accent-red]/20">
            <div className="flex items-center gap-3 text-[--text-muted] mb-4">
              <AlertCircle size={18} className="text-[--accent-red]" />
              <span className="font-[Manrope] font-semibold text-sm uppercase tracking-wider">At Risk</span>
            </div>
            <div className="font-[Instrument_Serif] text-[56px] leading-none text-white">{projects.filter(p => p.health !== 'on-track').length}</div>
          </GlassCard>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-12 gap-8 mt-4">
        {filteredProjects.map((project, idx) => {
          const isDelayed = project.health === 'off-track' || project.health === 'at-risk';
          
          return (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] }}
              key={project.id} 
              className="col-span-12 md:col-span-6 lg:col-span-4 flex"
            >
              <GlassCard 
                className="p-0 overflow-hidden flex flex-col w-full group cursor-pointer shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_60px_-15px_rgba(123,57,252,0.15)] transition-all duration-500 will-change-transform transform-gpu hover:-translate-y-2" 
                hoverEffect={true}
              >
                
                {/* Cover Image Placeholder with Overlay */}
                <div className="h-48 bg-gradient-to-br from-[#1a1528] to-[#0a0a0a] relative overflow-hidden shrink-0 border-b border-white/5">
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-700 z-10" />
                  {project.image ? (
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <HardHat size={100} />
                    </div>
                  )}
                  <div className="absolute top-5 right-5 z-20">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-[Inter] font-bold uppercase tracking-widest shadow-xl backdrop-blur-md ${
                      project.status === 'active' ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30' :
                      project.status === 'delayed' ? 'bg-[--accent-red]/20 text-[--accent-red] border border-[--accent-red]/30' :
                      'bg-white/10 text-[--text-muted] border border-white/20'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1 bg-gradient-to-b from-transparent to-black/20">
                  <h3 className="font-[Instrument_Serif] text-4xl text-white tracking-tight mb-3 group-hover:text-[#7b39fc] transition-colors duration-300">{project.name}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-[--text-muted] font-[Inter] mb-10">
                    <span className="flex items-center gap-1.5 font-medium"><HardHat size={15} /> {project.tasksCount} Tasks</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className={`flex items-center gap-1.5 font-medium ${isDelayed ? 'text-[--accent-amber]' : ''}`}>
                      <AlertCircle size={15} /> Due {project.deadline}
                    </span>
                  </div>

                  {/* Progress & Budget */}
                  <div className="mt-auto space-y-8">
                    <div>
                      <div className="flex justify-between text-xs font-[Inter] mb-3 text-white/70 uppercase tracking-wider font-bold">
                        <span>Progress</span>
                        <span className="text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-black/50 border border-white/5 rounded-full h-2 overflow-hidden shadow-inner">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${isDelayed ? 'bg-gradient-to-r from-[--accent-amber] to-[#f59e0b]' : 'bg-gradient-to-r from-[#7b39fc] to-[#a77bf5]'}`}
                          style={{ width: `${project.progress}%` }} 
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex -space-x-3">
                        {project.members.map((mId, i) => {
                          const u = users.find(u => u.id === mId);
                          return u ? (
                            <div key={i} className="w-9 h-9 rounded-full border-[3px] border-[#110D1A] flex items-center justify-center text-[11px] font-[Cabin] font-bold text-white shadow-lg z-10 hover:z-20 hover:-translate-y-1 transition-transform" style={{ backgroundColor: u.color }}>
                              {u.initials}
                            </div>
                          ) : null;
                        })}
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-[Manrope] text-[--text-muted] uppercase tracking-widest mb-1 font-bold">Budget</div>
                        <div className="text-base font-[Cabin] font-bold text-white">{project.spent} <span className="text-[--text-muted] text-sm">/ {project.budget}</span></div>
                      </div>
                    </div>
                  </div>

                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
