import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../context/TaskContext';
import { X, Plus } from 'lucide-react';
import type { Task, Priority, SubTask } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task | null;
}

export const TaskModal = ({ isOpen, onClose, taskToEdit }: TaskModalProps) => {
  const { addTask, updateTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('STANDARD');
  const [tags, setTags] = useState('');
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [newSubtask, setNewSubtask] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description || '');
        setPriority(taskToEdit.priority);
        setTags(taskToEdit.tags.join(', '));
        setSubtasks(taskToEdit.subtasks || []);
      } else {
        setTitle('');
        setDescription('');
        setPriority('STANDARD');
        setTags('');
        setSubtasks([]);
      }
    }
  }, [isOpen, taskToEdit]);

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    setSubtasks([...subtasks, { id: crypto.randomUUID(), title: newSubtask, completed: false }]);
    setNewSubtask('');
  };

  const toggleSubtask = (id: string) => {
    setSubtasks(subtasks.map(st => st.id === id ? { ...st, completed: !st.completed } : st));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      title,
      description,
      priority,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      subtasks
    };

    if (taskToEdit) {
      updateTask(taskToEdit.id, taskData);
    } else {
      addTask(taskData);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000 }}
          />
          <div style={{ position: 'fixed', inset: 0, zIndex: 1001, display: 'flex', justifyContent: 'flex-end', pointerEvents: 'none' }}>
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              style={{ width: '800px', background: 'var(--color-limestone)', height: '100vh', borderLeft: 'var(--border-monument)', display: 'flex', flexDirection: 'column', pointerEvents: 'auto', boxShadow: '-20px 0 50px rgba(0,0,0,0.5)' }}
            >
              <div style={{ padding: '3rem 4rem', borderBottom: 'var(--border-monument)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-obsidian)' }}>
                <h2 className="chiseled-text" style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-limestone)' }}>
                  {taskToEdit ? "REFORGE LABOR" : "CHISEL NEW LABOR"}
                </h2>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-limestone)' }}><X size={50} /></button>
              </div>

              <div style={{ padding: '4rem', overflowY: 'auto', flexGrow: 1 }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                  
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-chiseled)', fontWeight: 900, marginBottom: '1rem', fontSize: '2rem' }}>LABOR INSCRIPTION</label>
                    <input 
                      autoFocus
                      value={title} onChange={(e) => setTitle(e.target.value)}
                      style={{ width: '100%', padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 900, background: 'transparent', border: 'var(--border-monument)', color: 'var(--color-obsidian)', outline: 'none' }} 
                      placeholder="WHAT MUST BE DONE?"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-chiseled)', fontWeight: 900, marginBottom: '1rem', fontSize: '2rem' }}>THE CHRONICLE (DETAILS)</label>
                    <textarea 
                      value={description} onChange={(e) => setDescription(e.target.value)}
                      style={{ width: '100%', height: '200px', padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '1.5rem', background: 'transparent', border: 'var(--border-monument)', color: 'var(--color-obsidian)', resize: 'none', outline: 'none' }} 
                      placeholder="ETCH THE DETAILS HERE..."
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-chiseled)', fontWeight: 900, marginBottom: '1rem', fontSize: '1.5rem' }}>URGENCY LEVEL</label>
                      <select 
                        value={priority} onChange={(e) => setPriority(e.target.value as Priority)}
                        style={{ width: '100%', padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 900, background: 'transparent', border: 'var(--border-monument)', color: 'var(--color-obsidian)', outline: 'none', cursor: 'pointer', appearance: 'none' }}
                      >
                        <option value="CHILL">CHILL (PEACE)</option>
                        <option value="STANDARD">STANDARD (DUTY)</option>
                        <option value="DEFCON 1">DEFCON 1 (WAR)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-chiseled)', fontWeight: 900, marginBottom: '1rem', fontSize: '1.5rem' }}>CATEGORIES (CSV)</label>
                      <input 
                        value={tags} onChange={(e) => setTags(e.target.value)}
                        style={{ width: '100%', padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '1.5rem', background: 'transparent', border: 'var(--border-monument)', color: 'var(--color-obsidian)', outline: 'none' }} 
                        placeholder="WAR, HUNT, CRAFT"
                      />
                    </div>
                  </div>

                  {/* Subtasks Section */}
                  <div style={{ borderTop: 'var(--border-monument)', paddingTop: '3rem', marginTop: '1rem' }}>
                    <label style={{ display: 'block', fontFamily: 'var(--font-chiseled)', fontWeight: 900, marginBottom: '2rem', fontSize: '2rem', letterSpacing: '2px' }}>THE TRIALS (CHECKLIST)</label>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                      {subtasks.map((st) => (
                        <div key={st.id} style={{ display: 'flex', alignItems: 'center', gap: '2rem', background: 'var(--color-surface)', border: 'var(--border-monument)', padding: '1.5rem' }}>
                          <input 
                            type="checkbox" 
                            checked={st.completed} 
                            onChange={() => toggleSubtask(st.id)}
                            style={{ width: '30px', height: '30px', cursor: 'pointer' }}
                          />
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 900, textDecoration: st.completed ? 'line-through' : 'none', opacity: st.completed ? 0.5 : 1 }}>{st.title}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <input 
                        value={newSubtask} 
                        onChange={(e) => setNewSubtask(e.target.value)}
                        onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddSubtask(); } }}
                        style={{ flexGrow: 1, padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '1.5rem', border: '8px dashed var(--color-obsidian)', background: 'transparent', color: 'var(--color-obsidian)', outline: 'none' }} 
                        placeholder="DEFINE NEXT TRIAL..."
                      />
                      <button type="button" onClick={handleAddSubtask} className="stone-block-btn" style={{ padding: '1.5rem', background: 'var(--color-gold)' }}>
                        <Plus size={30} />
                      </button>
                    </div>
                  </div>

                  <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem', borderTop: 'var(--border-monument)', paddingTop: '4rem' }}>
                    <button type="button" onClick={onClose} className="stone-block-btn" style={{ flex: 1, background: 'transparent' }}>
                      ABANDON
                    </button>
                    <button type="submit" className="stone-block-btn" style={{ flex: 2, background: 'var(--color-aegean)', color: '#fff' }}>
                      {taskToEdit ? 'ENGRAVE REVISIONS' : 'HEAVE STONE INTO AGORA'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
