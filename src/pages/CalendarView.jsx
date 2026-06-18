import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { GlassCard } from '../ui/GlassCard';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, HardHat, Sparkles } from 'lucide-react';

export const CalendarView = () => {
  const { tasks } = useStore();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5, 1)); // June 2026

  // Generate days for the grid (simple 35-day grid for demo)
  const days = Array.from({ length: 35 }, (_, i) => {
    const d = new Date(2026, 5, i - 1); // Start slightly before June 1
    return d;
  });

  const getTasksForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(t => t.deadline === dateStr);
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="flex flex-col gap-6 font-sans pb-12 h-[calc(100vh-8rem)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
        <div>
          <h1 className="font-[Instrument_Serif] text-5xl text-white tracking-tight mb-2">Master Schedule</h1>
          <p className="text-[--text-muted] font-[Inter] text-sm flex items-center gap-2">
            <Sparkles size={14} className="text-[#7b39fc]" /> Predictive Timeline Mapping
          </p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center bg-black/40 border border-white/5 rounded-full p-1 shadow-inner">
            <button onClick={prevMonth} className="p-2 text-[--text-muted] hover:text-white rounded-full hover:bg-white/5 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <span className="px-6 font-[Instrument_Serif] text-xl text-white tracking-wide">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button onClick={nextMonth} className="p-2 text-[--text-muted] hover:text-white rounded-full hover:bg-white/5 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
          <button className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-full text-xs font-[Cabin] font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
          <button className="bg-[#7b39fc] text-white px-6 py-2.5 rounded-full text-xs font-[Cabin] font-bold hover:bg-[#6b29ec] transition-colors shadow-lg shadow-[#7b39fc]/20 flex items-center gap-2 uppercase tracking-wide">
            <CalendarIcon size={16} /> New Event
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <GlassCard className="flex-1 flex flex-col p-6 overflow-hidden border-white/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] bg-[#110D1A]/80" hoverEffect={false}>
        
        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-4 mb-4 shrink-0">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <div key={day} className="text-center font-[Cabin] font-bold text-[10px] text-[--text-muted] tracking-[0.2em] uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* 35 Day Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-3 h-full">
          {days.map((date, idx) => {
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isToday = date.toDateString() === new Date().toDateString();
            const dayTasks = getTasksForDate(date);

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.01 }}
                className={`relative p-3 rounded-2xl border transition-all duration-300 flex flex-col ${
                  isCurrentMonth ? 'bg-black/40 border-white/5 hover:border-[#7b39fc]/50 hover:shadow-[0_0_20px_rgba(123,57,252,0.1)]' : 'bg-transparent border-transparent opacity-30'
                } ${isToday ? 'ring-1 ring-[#7b39fc] bg-[#7b39fc]/5' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-[Instrument_Serif] text-2xl ${isToday ? 'text-[#7b39fc]' : 'text-white/60'}`}>
                    {date.getDate()}
                  </span>
                  {dayTasks.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
                  )}
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5">
                  {dayTasks.map(task => (
                    <div 
                      key={task.id} 
                      className={`px-2 py-1.5 rounded-md text-[10px] font-[Inter] font-medium truncate cursor-pointer transition-transform hover:scale-[1.02] ${
                        task.priority === 'High' ? 'bg-[--accent-red]/20 text-[--accent-red] border border-[--accent-red]/30' :
                        task.priority === 'Medium' ? 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30' :
                        'bg-white/10 text-white/80 border border-white/10'
                      }`}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};
