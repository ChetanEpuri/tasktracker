import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, ArrowRight, ArrowLeft } from 'lucide-react';

type TaskStatus = 'TODO' | 'DOING' | 'DONE';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

const Kanban = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('brutal-tasks');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: '1', title: 'BUILD THE BRUTALIST APP', status: 'DOING' },
      { id: '2', title: 'DESTROY WEAK DESIGNS', status: 'TODO' }
    ];
  });

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('brutal-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task: Task = {
      id: uuidv4(),
      title: newTask.toUpperCase(),
      status: 'TODO'
    };
    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const moveTask = (id: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const columns: { title: string, status: TaskStatus, color: string }[] = [
    { title: 'TO-DO', status: 'TODO', color: 'var(--color-surface)' },
    { title: 'DOING', status: 'DOING', color: 'var(--color-accent-1)' },
    { title: 'DONE', status: 'DONE', color: 'var(--color-accent-3)' },
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      
      <form onSubmit={addTask} style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '4rem',
        background: 'var(--color-surface)',
        padding: '2rem',
        border: 'var(--border-width) solid var(--color-border)',
        boxShadow: '8px 8px 0px var(--color-border)'
      }}>
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="ENTER NEW OBJECTIVE..."
          className="brutal-input"
          style={{ flexGrow: 1, fontSize: '1.5rem', padding: '1rem' }}
        />
        <button type="submit" className="btn btn-primary" style={{ fontSize: '1.2rem' }}>
          ADD TASK
        </button>
      </form>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        {columns.map(col => (
          <div key={col.status} style={{
            background: col.color,
            border: 'var(--border-width) solid var(--color-border)',
            boxShadow: '12px 12px 0px var(--color-border)',
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h2 style={{
              background: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              borderBottom: 'var(--border-width) solid var(--color-border)',
              padding: '1rem',
              textAlign: 'center',
              fontSize: '2rem'
            }}>
              {col.title}
            </h2>
            
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
              <AnimatePresence>
                {tasks.filter(t => t.status === col.status).map(task => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    layout
                    style={{
                      background: 'var(--color-bg)',
                      border: 'var(--border-width) solid var(--color-border)',
                      padding: '1.5rem',
                      boxShadow: '6px 6px 0px var(--color-border)',
                      position: 'relative'
                    }}
                  >
                    <h3 style={{ 
                      fontSize: '1.2rem', 
                      fontFamily: 'var(--font-mono)', 
                      wordBreak: 'break-word',
                      textDecoration: task.status === 'DONE' ? 'line-through' : 'none',
                      opacity: task.status === 'DONE' ? 0.5 : 1
                    }}>
                      {task.title}
                    </h3>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', borderTop: '2px solid var(--color-border)', paddingTop: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {task.status !== 'TODO' && (
                          <button onClick={() => moveTask(task.id, task.status === 'DONE' ? 'DOING' : 'TODO')} className="btn" style={{ padding: '0.5rem' }}>
                            <ArrowLeft size={20} />
                          </button>
                        )}
                        {task.status !== 'DONE' && (
                          <button onClick={() => moveTask(task.id, task.status === 'TODO' ? 'DOING' : 'DONE')} className="btn" style={{ padding: '0.5rem' }}>
                            <ArrowRight size={20} />
                          </button>
                        )}
                      </div>
                      
                      <button onClick={() => deleteTask(task.id)} className="btn btn-secondary" style={{ padding: '0.5rem', background: '#ff3333' }}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kanban;
