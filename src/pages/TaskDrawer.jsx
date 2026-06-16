import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { X, Calendar, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TaskDrawer = ({ taskId, onClose }) => {
  const { tasks, users, completeTask } = useStore();
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (taskId) {
      setTask(tasks.find(t => t.id === taskId));
    }
  }, [taskId, tasks]);

  if (!task) return null;

  const assignee = users.find(u => u.id === task.assigneeId);
  const isDone = task.status === 'done';

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-4 right-4 bottom-4 w-[460px] bg-[#0a0a0a] border border-[#7b39fc]/20 rounded-3xl z-[100] flex flex-col shadow-2xl overflow-hidden font-sans"
      >
        
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-8 border-b border-white/5 shrink-0 bg-[#1a1528]">
          <button 
            onClick={() => completeTask(task.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-[Cabin] font-bold tracking-wide uppercase ${isDone ? 'bg-[#10b981]/20 border-[#10b981]/30 text-[#10b981]' : 'bg-[#7b39fc]/20 border-[#7b39fc]/30 text-white hover:bg-[#7b39fc]/40'}`}
          >
            <CheckCircle2 size={16} /> {isDone ? 'Completed' : 'Mark Done'}
          </button>
          <button onClick={onClose} className="p-2.5 text-[--text-muted] hover:text-white rounded-full hover:bg-white/10 transition-colors bg-white/5">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10">
          
          <h2 className={`text-3xl font-[Instrument_Serif] leading-tight mb-8 tracking-tight ${isDone ? 'text-[--text-muted] line-through' : 'text-white'}`}>
            {task.title}
          </h2>

          {/* Properties Grid */}
          <div className="grid grid-cols-3 gap-y-6 gap-x-4 mb-10">
            <div className="text-sm font-[Manrope] font-semibold text-[--text-muted] uppercase tracking-wider flex items-center">Assignee</div>
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2b2344] to-[#7b39fc] text-white flex items-center justify-center text-xs font-[Cabin] font-bold shadow-md">{assignee?.initials}</div>
              <span className="text-sm font-[Inter] font-semibold text-white">{assignee?.name}</span>
            </div>

            <div className="text-sm font-[Manrope] font-semibold text-[--text-muted] uppercase tracking-wider flex items-center">Due Date</div>
            <div className="col-span-2 flex items-center gap-2 text-sm font-[Inter] font-medium text-white bg-white/5 px-3 py-1.5 rounded-lg w-fit">
              <Calendar size={14} className="text-[#7b39fc]" />
              {task.dueDate}
            </div>

            <div className="text-sm font-[Manrope] font-semibold text-[--text-muted] uppercase tracking-wider flex items-center">Priority</div>
            <div className="col-span-2 flex items-center gap-2">
              <span className="text-xs uppercase font-[Cabin] font-bold text-white bg-[#2b2344] border border-[#7b39fc]/30 px-3 py-1 rounded-full">{task.priority}</span>
            </div>

            <div className="text-sm font-[Manrope] font-semibold text-[--text-muted] uppercase tracking-wider flex items-center">Labels</div>
            <div className="col-span-2 flex flex-wrap gap-2">
              {task.labels?.map(l => (
                <span key={l} className="bg-black/40 border border-white/10 text-[--text-muted] px-3 py-1 rounded-full text-[11px] font-[Inter] font-semibold uppercase tracking-wider">{l}</span>
              ))}
              <button className="text-[--text-muted] text-xs font-[Inter] font-semibold hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-dashed border-white/20">
                + Add
              </button>
            </div>
          </div>

          <div className="w-full h-px bg-white/5 mb-10" />

          {/* Description */}
          <div className="mb-10">
            <h3 className="font-[Manrope] font-semibold text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <MessageSquare size={16} className="text-[#7b39fc]" /> Description
            </h3>
            <p className="text-[15px] text-[--text-muted] leading-relaxed font-[Inter]">
              {task.description || "No description provided."}
            </p>
          </div>

          {/* AI Suggestion Area */}
          {task.hasAISuggestion && (
            <div className="bg-gradient-to-br from-[#2b2344]/80 to-[#1a1528] border border-[#7b39fc]/30 rounded-2xl p-6 mb-10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#7b39fc] rounded-full blur-[60px] opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-center gap-2 text-white font-[Manrope] font-bold text-sm mb-3 uppercase tracking-wider">
                <Sparkles size={16} className="text-[#7b39fc]" /> Datacore Intelligence
              </div>
              <p className="text-sm text-[--text-muted] leading-relaxed mb-6 relative z-10 font-[Inter]">
                This task can be optimized by splitting it into 3 sub-tasks to improve tracking velocity across different staff members.
              </p>
              <button className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-[Cabin] font-bold hover:bg-gray-200 transition-colors w-full shadow-lg shadow-white/10 relative z-10 uppercase tracking-wide">
                Apply Suggestion
              </button>
            </div>
          )}

          {/* Activity / Comments */}
          <div>
            <h3 className="font-[Manrope] font-semibold text-sm text-[--text-muted] uppercase tracking-wider mb-5">Activity Log</h3>
            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2b2344] to-[#7b39fc] text-white flex items-center justify-center text-xs font-[Cabin] font-bold shrink-0 shadow-md">AD</div>
              <div className="flex-1">
                <textarea 
                  placeholder="Add a note or update..." 
                  className="w-full bg-[#1a1528]/50 border border-white/10 rounded-xl p-4 text-sm text-white font-[Inter] outline-none focus:border-[#7b39fc]/50 focus:bg-[#1a1528] transition-colors resize-none h-28 shadow-inner placeholder-white/30"
                />
                <div className="flex justify-end mt-3">
                  <button className="bg-[#7b39fc] text-white px-5 py-2 rounded-full text-xs font-[Cabin] font-bold hover:bg-[#6b29ec] transition-colors shadow-lg shadow-[#7b39fc]/20 uppercase tracking-wide">Post Note</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
