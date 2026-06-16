import { useState, useEffect } from 'react';
import { initialTasks, initialProjects, initialUsers, initialNotifications } from '../data/mockData';

let state = {
  tasks: initialTasks,
  projects: initialProjects,
  users: initialUsers,
  notifications: initialNotifications,
  activePage: "dashboard",
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  notificationsPanelOpen: false
};

const subscribers = new Set();

const notify = () => {
  subscribers.forEach(fn => fn());
};

const setState = (newState) => {
  state = { ...state, ...newState };
  try {
    localStorage.setItem('olympus-state', JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
  notify();
};

export const initStore = () => {
  try {
    const saved = localStorage.getItem('olympus-state');
    if (saved) {
      state = { ...state, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
  }
};

export const useStore = () => {
  const [, forceRender] = useState({});

  useEffect(() => {
    const callback = () => forceRender({});
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  }, []);

  return {
    ...state,
    
    // Actions
    addTask: (task) => setState({ tasks: [...state.tasks, { id: `t${Date.now()}`, ...task }] }),
    updateTask: (id, updates) => setState({
      tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
    }),
    deleteTask: (id) => setState({
      tasks: state.tasks.filter(t => t.id !== id)
    }),
    completeTask: (id) => setState({
      tasks: state.tasks.map(t => t.id === id ? { ...t, status: 'done' } : t)
    }),
    
    addProject: (project) => setState({ projects: [...state.projects, { id: `p${Date.now()}`, ...project }] }),
    updateProject: (id, updates) => setState({
      projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p)
    }),
    
    setActivePage: (page) => setState({ activePage: page }),
    toggleSidebar: () => setState({ sidebarCollapsed: !state.sidebarCollapsed }),
    
    openCommandPalette: () => setState({ commandPaletteOpen: true }),
    closeCommandPalette: () => setState({ commandPaletteOpen: false }),
    
    openNotifications: () => setState({ notificationsPanelOpen: true }),
    closeNotifications: () => setState({ notificationsPanelOpen: false }),
  };
};
