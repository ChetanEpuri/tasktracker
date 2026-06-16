import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search, Filter, AlignJustify, Kanban, CheckCircle2, Star, Sparkles, Clock } from 'lucide-react';
import { TaskDrawer } from './TaskDrawer';
import { GlassCard } from '../ui/GlassCard';

export const MyTasks = () => {
  const { tasks, users, completeTask } = useStore();
  const [view, setView] = useState('list');
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleComplete = (e, id) => {
    e.stopPropagation();
    completeTask(id);
  };

  const getPriorityStyle = (p) => {
    switch (p) {
      case 'urgent': return 'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/30';
      case 'high': return 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30';
      case 'medium': return 'bg-[#7b39fc]/10 text-[#7b39fc] border-[#7b39fc]/30';
      case 'low': return 'bg-white/5 text-[--text-muted] border-white/10';
      default: return 'bg-white/5 text-[--text-muted] border-white/10';
    }
  };

  return (
    <div className="flex flex-col h-full font-sans">
      
      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="font-[Instrument_Serif] text-4xl text-white tracking-tight">Staff Operations</h1>
          <p className="text-[--text-muted] font-[Inter] text-sm mt-1">Manage housekeeping, maintenance, and concierge tasks.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-[#2b2344]/50 border border-[#7b39fc]/20 rounded-full px-4 py-2.5 flex items-center gap-2 hover:bg-[#2b2344]/80 transition-colors shadow-inner">
            <Search size={16} className="text-[#7b39fc]" />
            <input type="text" placeholder="Search tasks..." className="bg-transparent outline-none text-sm w-48 text-white font-[Inter] placeholder-[#7b39fc]/50" />
          </div>
          
          <div className="flex gap-1 bg-[#1a1528] border border-white/10 rounded-full p-1 shadow-inner">
            <button onClick={() => setView('list')} className={`p-2 rounded-full transition-colors ${view === 'list' ? 'bg-[#7b39fc] text-white shadow-md' : 'text-[--text-muted] hover:text-white'}`}>
              <AlignJustify size={16} />
            </button>
            <button onClick={() => setView('board')} className={`p-2 rounded-full transition-colors ${view === 'board' ? 'bg-[#7b39fc] text-white shadow-md' : 'text-[--text-muted] hover:text-white'}`}>
              <Kanban size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Task List View */}
      {view === 'list' && (
        <GlassCard hoverEffect={false} className="flex-1 flex flex-col mb-10 overflow-hidden border-white/5">
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-2">
            {tasks.map(task => {
              const assignee = users.find(u => u.id === task.assigneeId);
              const isDone = task.status === 'done';
              
              return (
                <div 
                  key={task.id} 
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`group rounded-xl border px-5 py-4 flex flex-col md:flex-row md:items-center gap-4 transition-all cursor-pointer ${isDone ? 'bg-black/40 border-transparent opacity-60' : 'bg-[#1a1528]/40 border-white/5 hover:border-[#7b39fc]/30 hover:bg-[#2b2344]/40'}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div 
                      onClick={(e) => handleComplete(e, task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isDone ? 'bg-[#10b981] border-[#10b981] text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]' : 'border-[#7b39fc]/40 hover:border-[#7b39fc] hover:bg-[#7b39fc]/10'}`}
                    >
                      {isDone && <CheckCircle2 size={14} />}
                    </div>

                    <div className="flex flex-col">
                      <div className={`text-base font-[Manrope] font-semibold transition-colors ${isDone ? 'text-[--text-muted] line-through' : 'text-white'}`}>
                        {task.title}
                      </div>
                      {task.labels && (
                        <div className="flex gap-2 mt-1">
                          {task.labels.map(l => (
                            <span key={l} className="text-[11px] font-[Inter] text-[--text-muted] uppercase tracking-wider">{l}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 mt-3 md:mt-0 ml-10 md:ml-0">
                    <span className={`px-3 py-1 text-xs font-[Cabin] font-bold rounded-full border ${getPriorityStyle(task.priority)} uppercase tracking-wide`}>
                      {task.priority}
                    </span>

                    {task.hasAISuggestion && (
                      <div className="flex items-center gap-1.5 text-[#7b39fc] bg-[#7b39fc]/10 px-3 py-1 rounded-full text-xs font-[Cabin] font-bold border border-[#7b39fc]/20 shadow-[0_0_10px_rgba(123,57,252,0.1)]">
                        <Sparkles size={12} /> Auto
                      </div>
                    )}

                    <div className="flex items-center gap-2 w-28 justify-end">
                      <Clock size={14} className={task.dueDate < new Date().toISOString().split('T')[0] && !isDone ? 'text-[#ef4444]' : 'text-[--text-muted]'} />
                      <div className={`text-sm font-[Inter] font-medium ${task.dueDate < new Date().toISOString().split('T')[0] && !isDone ? 'text-[#ef4444]' : 'text-[--text-muted]'}`}>
                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>

                    {assignee && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2b2344] to-[#7b39fc] border border-white/20 text-white flex items-center justify-center text-xs font-[Cabin] font-bold shrink-0 shadow-md">
                        {assignee.initials}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}

      {/* Kanban Board View */}
      {view === 'board' && (
        <div className="flex-1 flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
          {['Todo', 'In Progress', 'In Review', 'Done'].map(status => (
            <div key={status} className="w-[340px] shrink-0 flex flex-col bg-[#1a1528]/30 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center justify-between mb-5 px-1">
                <h3 className="font-[Manrope] font-bold text-base text-white tracking-wide">{status}</h3>
                <span className="text-xs font-[Cabin] font-bold bg-[#7b39fc]/20 text-[#7b39fc] px-2.5 py-1 rounded-full">
                  {tasks.filter(t => t.status.toLowerCase().replace('-', ' ') === status.toLowerCase()).length}
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                {tasks.filter(t => t.status.toLowerCase().replace('-', ' ') === status.toLowerCase()).map(task => (
                  <GlassCard
                    key={task.id} 
                    onClick={() => setSelectedTaskId(task.id)}
                    className="p-5 cursor-pointer border-white/5 hover:border-[#7b39fc]/40 transition-colors bg-[#0a0a0a]"
                    hoverEffect={false}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-2.5 py-0.5 text-[10px] font-[Cabin] font-bold rounded-full border ${getPriorityStyle(task.priority)} uppercase`}>
                        {task.priority}
                      </span>
                      {task.hasAISuggestion && <span className="text-[10px] text-white font-[Cabin] font-bold bg-[#7b39fc] rounded-full px-2 py-0.5 shadow-[0_0_8px_#7b39fc] flex items-center gap-1"><Sparkles size={10}/> AI</span>}
                    </div>
                    <p className={`text-[15px] font-[Manrope] font-semibold leading-snug mb-4 ${task.status === 'done' ? 'text-[--text-muted] line-through' : 'text-white'}`}>{task.title}</p>
                    <div className="flex justify-between items-end mt-auto">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-[Inter] text-[--text-muted] uppercase tracking-wider">Due</span>
                        <span className="text-xs font-[Inter] font-medium text-[--text-main]">{task.dueDate}</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#2b2344] to-[#7b39fc] border border-white/20 text-white flex items-center justify-center text-[10px] font-[Cabin] font-bold shadow-sm">MA</div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTaskId && (
        <TaskDrawer 
          taskId={selectedTaskId} 
          onClose={() => setSelectedTaskId(null)} 
        />
      )}

    </div>
  );
};

