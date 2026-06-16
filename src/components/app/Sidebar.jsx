import React from 'react';
import { LayoutDashboard, Inbox, CheckSquare, FolderOpen, Calendar, GitBranch, Target, FileText, Bot, Cpu, Zap, BarChart2, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { GlassCard } from '../../ui/GlassCard';

export const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar, activePage, setActivePage } = useStore();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'inbox', icon: Inbox, label: 'Inbox', badge: 3 },
    { id: 'tasks', icon: CheckSquare, label: 'My Tasks' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'timeline', icon: GitBranch, label: 'Timeline' },
  ];

  const renderNavGroup = (items, label) => (
    <div className="mb-6">
      {!sidebarCollapsed && <div className="px-5 text-[11px] font-semibold text-[--text-muted] uppercase tracking-wider mb-3">{label}</div>}
      <div className={`space-y-1 ${sidebarCollapsed ? 'px-2' : 'px-3'}`}>
        {items.map(item => {
          const active = activePage === item.id;
          return (
            <div 
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${sidebarCollapsed ? 'justify-center px-0' : 'px-3'} ${active ? 'bg-white/10 text-white shadow-sm' : 'text-[--text-muted] hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon size={16} className={active ? 'text-white' : 'text-[--text-muted]'} />
              {!sidebarCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && <span className="bg-[--accent-blue] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{item.badge}</span>}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={`p-4 transition-all duration-300 z-50 flex-shrink-0 h-screen ${sidebarCollapsed ? 'w-[88px]' : 'w-[280px]'}`}>
      <GlassCard className="h-full flex flex-col" hoverEffect={false}>
        {/* Header */}
        <div className={`h-16 flex items-center shrink-0 border-b border-white/5 ${sidebarCollapsed ? 'justify-center' : 'justify-between px-5'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white fill-white shrink-0">
              <path d="M1.04356 6.35771L13.6437 0.666504C14.0729 0.472596 14.5684 0.551608 14.919 0.869408L23.4981 8.64731C23.9576 9.06385 24.0863 9.72145 23.8188 10.2831L16.2917 26.0827C16.0354 26.6206 15.4285 26.8778 14.8617 26.6896L1.86016 22.3735C1.35338 22.2052 1.00282 21.7371 0.985955 21.2057L0.598583 9.00688C0.581561 8.47055 0.871092 7.97159 1.35032 7.70586L1.04356 6.35771Z" fill="white"/>
              <circle cx="12" cy="12" r="10" fill="white" />
            </svg>
            {!sidebarCollapsed && <span className="font-[Manrope] font-bold tracking-wide text-white text-lg truncate">Datacore</span>}
          </div>
          {!sidebarCollapsed && (
            <button onClick={toggleSidebar} className="text-[--text-muted] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors">
              <ChevronLeft size={16} />
            </button>
          )}
        </div>
        
        {sidebarCollapsed && (
          <div className="flex justify-center mt-4">
            <button onClick={toggleSidebar} className="text-[--text-muted] hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          {renderNavGroup(navItems, 'Workspace')}
          {renderNavGroup([{ id: 'ai', icon: Bot, label: 'AI Assistant' }, { id: 'agents', icon: Cpu, label: 'Agents' }], 'Intelligence')}
        </div>

        {/* Footer */}
        <div className={`border-t border-white/5 ${sidebarCollapsed ? 'p-2' : 'p-4'}`}>
          <div className={`flex items-center gap-3 cursor-pointer hover:bg-white/5 rounded-xl transition-colors ${sidebarCollapsed ? 'p-1 justify-center' : 'p-2'}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2b2344] to-[#7b39fc] border border-white/10 flex items-center justify-center font-[Cabin] font-medium text-white shrink-0 text-xs shadow-inner">AD</div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-[Cabin] font-medium text-white truncate">Administrator</p>
                <p className="text-xs text-[--text-muted] font-[Inter] truncate">System Access</p>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
