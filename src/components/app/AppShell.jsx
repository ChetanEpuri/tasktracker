import React from 'react';
import { useStore } from '../../store/useStore';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Dashboard } from '../../pages/Dashboard';
import { MyTasks } from '../../pages/MyTasks';
import { TaskDrawer } from '../../pages/TaskDrawer';
import { AIAssistant } from '../../pages/AIAssistant';
import { Projects } from '../../pages/Projects';
import { Inbox } from '../../pages/Inbox';
import { CalendarView } from '../../pages/CalendarView';
import { Timeline } from '../../pages/Timeline';
import { Agents } from '../../pages/Agents';
import { CommandPalette } from './CommandPalette';

export const AppShell = ({ onExit }) => {
  const { activePage, commandPaletteOpen, closeCommandPalette } = useStore();

  return (
    <div className="flex h-screen bg-[#000000] overflow-hidden font-sans text-[--text-main]">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#7b39fc] rounded-full blur-[150px] opacity-[0.05] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#2b2344] rounded-full blur-[150px] opacity-[0.1] pointer-events-none"></div>

      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-transparent z-10 relative">
        <TopBar onExit={onExit} />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 custom-scrollbar relative z-10">
          <div className="w-full max-w-[1400px] mx-auto h-full">
            {activePage === 'dashboard' && <Dashboard />}
            {activePage === 'tasks' && <MyTasks />}
            {activePage === 'ai' && <AIAssistant />}
            {activePage === 'projects' && <Projects />}
            {activePage === 'inbox' && <Inbox />}
            {activePage === 'calendar' && <CalendarView />}
            {activePage === 'timeline' && <Timeline />}
            {activePage === 'agents' && <Agents />}
          </div>
        </main>
      </div>
      <TaskDrawer />
      {commandPaletteOpen && <CommandPalette onClose={closeCommandPalette} />}
    </div>
  );
};

