import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Task, Status, Priority } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface TaskContextType {
  tasks: Task[];
  addTask: (data: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: Status) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('brutal-os-tasks');
    return saved ? JSON.parse(saved) : [
      { id: uuidv4(), title: 'INITIALIZE BRUTAL OS', priority: 'DEFCON 1', status: 'IN_PROGRESS', tags: ['SYSTEM', 'URGENT'], subtasks: [], createdAt: Date.now() },
      { id: uuidv4(), title: 'GENERATE METRICS', priority: 'CHILL', status: 'TODO', tags: ['DATA'], subtasks: [], createdAt: Date.now() }
    ];
  });

  useEffect(() => {
    localStorage.setItem('brutal-os-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (data: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const newTask: Task = {
      ...data,
      id: uuidv4(),
      status: 'BACKLOG',
      createdAt: Date.now()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const moveTask = (id: string, newStatus: Status) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: newStatus,
          completedAt: newStatus === 'DONE' ? Date.now() : t.completedAt
        };
      }
      return t;
    }));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};
