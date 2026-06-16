import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bot, Clock, AlertCircle, CalendarCheck, Wrench, Sparkles, Home } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export const Dashboard = () => {
  const { tasks, projects, users } = useStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const tasksDueToday = tasks.filter(t => t.status !== 'done' && t.dueDate === new Date().toISOString().split('T')[0]).slice(0, 3);
  const overdueTasks = tasks.filter(t => t.status !== 'done' && new Date(t.dueDate) < new Date());
  
  return (
    <div className="flex flex-col gap-8 pb-12 font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-[Instrument_Serif] text-5xl text-white tracking-tight mb-2">Property Overview</h1>
          <p className="text-[--text-muted] font-[Inter] text-sm">Real-time metrics for Datacore flagship property</p>
        </div>
      </div>

      {/* Top Row: Metrics */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Occupancy Score */}
        <div className="col-span-12 md:col-span-4">
          <GlassCard className="p-6 flex flex-col items-center justify-center relative h-full">
            <h3 className="absolute top-6 left-6 font-[Manrope] font-semibold text-sm text-[--text-muted] uppercase tracking-wider flex items-center gap-2">
              <Home size={16} /> Occupancy Rate
            </h3>
            <div className="w-36 h-36 mt-8">
              <Doughnut 
                data={{
                  labels: ['Booked', 'Available'],
                  datasets: [{ data: [85, 15], backgroundColor: ['#7b39fc', 'rgba(255,255,255,0.05)'], borderWidth: 0 }]
                }}
                options={{ maintainAspectRatio: false, cutout: '82%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
              />
            </div>
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 mt-3 flex flex-col items-center pointer-events-none">
              <span className="font-[Instrument_Serif] text-[56px] leading-none text-white">85<span className="text-2xl text-[--text-muted]">%</span></span>
            </div>
          </GlassCard>
        </div>

        {/* Due Today */}
        <div className="col-span-12 md:col-span-4">
          <GlassCard className="p-6 h-full flex flex-col">
            <h3 className="font-[Manrope] font-semibold text-sm text-[--text-muted] uppercase tracking-wider mb-6 flex items-center gap-2">
              <CalendarCheck size={16} className="text-[#7b39fc]" /> Arrivals Today
            </h3>
            <div className="font-[Instrument_Serif] text-[64px] leading-none mb-6 text-white tracking-tight">{tasksDueToday.length || 12}</div>
            <div className="space-y-3 mt-auto">
              <div className="text-sm font-[Inter] text-[--text-main] truncate flex items-center gap-3 bg-white/5 p-2 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[#7b39fc] shadow-[0_0_8px_#7b39fc]" />
                VIP Check-in: Suite 402
              </div>
              <div className="text-sm font-[Inter] text-[--text-main] truncate flex items-center gap-3 bg-white/5 p-2 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                Standard Check-in: Room 210
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Overdue */}
        <div className="col-span-12 md:col-span-4">
          <GlassCard className="p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-[Manrope] font-semibold text-sm text-[--text-muted] uppercase tracking-wider mb-6 flex items-center gap-2">
                <AlertCircle size={16} className="text-[--accent-red]" /> Pending Maintenance
              </h3>
              <div className="font-[Instrument_Serif] text-[64px] leading-none mb-4 text-white tracking-tight">{overdueTasks.length || 3}</div>
            </div>
            <div className="text-sm font-[Inter] font-medium text-[--accent-red] mt-4 bg-[--accent-red]/10 border border-[--accent-red]/20 rounded-xl p-4 flex items-start gap-3">
              <Wrench size={18} className="shrink-0 mt-0.5" />
              <span>HVAC inspection required in East Wing before 3:00 PM.</span>
            </div>
          </GlassCard>
        </div>

      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* AI Insights */}
        <div className="col-span-12 md:col-span-8">
          <GlassCard className="p-6 h-full">
            <h3 className="font-[Manrope] font-semibold text-sm text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Sparkles size={16} className="text-[#7b39fc]" /> Datacore Intelligence Insights
            </h3>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-[#2b2344]/50 to-transparent border border-[#7b39fc]/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between hover:border-[#7b39fc]/60 transition-colors gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#7b39fc] mt-2 shrink-0 shadow-[0_0_8px_#7b39fc]"></div>
                  <div>
                    <h4 className="font-[Manrope] font-semibold text-white mb-1">Batch Room Cleaning</h4>
                    <span className="text-sm font-[Inter] text-[--text-muted]">3 housekeeping requests on Floor 4 can be batched for a 20% time saving.</span>
                  </div>
                </div>
                <button className="bg-white text-black px-5 py-2.5 rounded-full text-xs font-[Cabin] font-bold hover:bg-gray-200 transition-colors shrink-0 shadow-lg shadow-white/10">Automate Schedule</button>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/10 transition-colors gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[--accent-amber] mt-2 shrink-0"></div>
                  <div>
                    <h4 className="font-[Manrope] font-semibold text-white mb-1">Staff Reallocation Recommended</h4>
                    <span className="text-sm font-[Inter] text-[--text-muted]">Concierge Desk B has 40% higher workload than average today.</span>
                  </div>
                </div>
                <button className="bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-full text-xs font-[Cabin] font-bold hover:bg-white/20 transition-colors shrink-0">Rebalance Staff</button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Active Projects */}
        <div className="col-span-12 md:col-span-4">
          <GlassCard className="p-6 h-full">
            <h3 className="font-[Manrope] font-semibold text-sm text-[--text-muted] uppercase tracking-wider mb-6 flex items-center gap-2">
              <Wrench size={16} /> Property Upgrades
            </h3>
            <div className="space-y-6">
              {[
                { id: 1, name: 'Lobby Renovation', progress: 85 },
                { id: 2, name: 'Pool Deck Maintenance', progress: 40 },
                { id: 3, name: 'Suite 500 Deep Clean', progress: 15 }
              ].map(p => (
                <div key={p.id}>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-[Inter] font-medium text-[--text-main]">{p.name}</span>
                    <span className="font-[Cabin] text-[--text-muted] font-bold">{p.progress}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-[#7b39fc] rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: mounted ? `${p.progress}%` : '0%' }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

      </div>

    </div>
  );
};

