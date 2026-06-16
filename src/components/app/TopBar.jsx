import React from 'react';
import { Search, Bell, Calendar } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const TopBar = ({ onExit }) => {
  const { activePage, openCommandPalette } = useStore();

  const getPageTitle = () => {
    const titles = { dashboard: 'Dashboard', tasks: 'My Tasks', ai: 'Datacore Intelligence' };
    return titles[activePage] || activePage;
  };

  return (
    <header className="h-24 flex items-center justify-between px-6 lg:px-8 shrink-0 relative z-40">
      
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2">
        <span className="font-[Instrument_Serif] text-3xl text-white tracking-tight capitalize">{getPageTitle()}</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-lg mx-8 hidden md:block">
        <div 
          onClick={openCommandPalette}
          className="flex items-center gap-3 px-5 py-2.5 bg-[#1a1528]/50 border border-[#7b39fc]/20 rounded-full text-[--text-muted] cursor-pointer hover:bg-[#2b2344]/50 hover:border-[#7b39fc]/50 transition-all shadow-inner"
        >
          <Search size={16} className="text-[#7b39fc]" />
          <span className="flex-1 text-sm font-[Inter] font-medium text-white/70">Search records, staff, rooms...</span>
          <span className="border border-[#7b39fc]/30 bg-[#2b2344] rounded-md px-2 py-0.5 text-[10px] font-[Cabin] font-bold text-[#7b39fc] uppercase tracking-wide">⌘K</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-5">
        <button onClick={onExit} className="text-xs font-[Cabin] font-bold uppercase tracking-wide text-[--text-muted] hover:text-white transition-colors mr-2">Sign out</button>
        
        <div className="flex items-center gap-2 bg-[#1a1528]/80 border border-white/5 rounded-full p-1.5 shadow-inner">
          <button className="p-2 text-[--text-muted] hover:text-white rounded-full hover:bg-[#7b39fc]/20 hover:text-[#7b39fc] relative transition-colors">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ef4444] rounded-full shadow-[0_0_8px_#ef4444]" />
          </button>
          <button className="p-2 text-[--text-muted] hover:text-white rounded-full hover:bg-[#7b39fc]/20 hover:text-[#7b39fc] transition-colors">
            <Calendar size={18} />
          </button>
        </div>
      </div>

    </header>
  );
};

