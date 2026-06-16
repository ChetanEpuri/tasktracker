export const initialTasks = [
  { id: 't1', title: 'Design Database Schema', status: 'done', priority: 'high', assigneeId: 'u1', dueDate: '2026-06-10', labels: ['backend'], subtasks: [{ id: 's1', text: 'Define relations', done: true }, { id: 's2', text: 'Write migrations', done: true }], hasAISuggestion: false, description: 'Schema for the new AI agents module.', comments: [], timeLogged: 120 },
  { id: 't2', title: 'Implement JWT Auth', status: 'done', priority: 'urgent', assigneeId: 'u2', dueDate: '2026-06-12', labels: ['security'], subtasks: [], hasAISuggestion: false, description: 'Basic login flow', comments: [], timeLogged: 240 },
  { id: 't3', title: 'Build Landing Page', status: 'in-review', priority: 'medium', assigneeId: 'u3', dueDate: '2026-06-16', labels: ['frontend'], subtasks: [{ id: 's3', text: 'Hero section', done: true }, { id: 's4', text: 'Animations', done: false }], hasAISuggestion: true, description: 'The main Olympus landing page.', comments: [], timeLogged: 300 },
  { id: 't4', title: 'Integrate Stripe Billing', status: 'in-progress', priority: 'urgent', assigneeId: 'u1', dueDate: '2026-06-18', labels: ['backend', 'finance'], subtasks: [], hasAISuggestion: false, description: 'Setup webhooks for pro tier', comments: [], timeLogged: 60 },
  { id: 't5', title: 'Optimize WebGL Shaders', status: 'todo', priority: 'high', assigneeId: 'u3', dueDate: '2026-06-20', labels: ['frontend', 'performance'], subtasks: [], hasAISuggestion: true, description: 'Reduce frame drops on mobile.', comments: [], timeLogged: 0 },
  { id: 't6', title: 'Write API Documentation', status: 'todo', priority: 'low', assigneeId: 'u2', dueDate: '2026-06-25', labels: ['docs'], subtasks: [], hasAISuggestion: true, description: 'Swagger docs for public API', comments: [], timeLogged: 0 },
  { id: 't7', title: 'Setup CI/CD Pipeline', status: 'done', priority: 'high', assigneeId: 'u4', dueDate: '2026-06-05', labels: ['devops'], subtasks: [], hasAISuggestion: false, description: 'GitHub Actions to Vercel', comments: [], timeLogged: 180 },
  { id: 't8', title: 'Design Notification System', status: 'in-progress', priority: 'medium', assigneeId: 'u1', dueDate: '2026-06-19', labels: ['architecture'], subtasks: [], hasAISuggestion: true, description: 'WebSocket vs SSE evaluation', comments: [], timeLogged: 90 },
  { id: 't9', title: 'Create Logo Assets', status: 'done', priority: 'medium', assigneeId: 'u5', dueDate: '2026-06-14', labels: ['design'], subtasks: [], hasAISuggestion: false, description: 'SVG and PNG exports', comments: [], timeLogged: 120 },
  { id: 't10', title: 'Implement Command Palette', status: 'in-review', priority: 'high', assigneeId: 'u3', dueDate: '2026-06-17', labels: ['frontend'], subtasks: [], hasAISuggestion: false, description: 'Global Cmd+K search', comments: [], timeLogged: 210 },
  { id: 't11', title: 'Fix Auth Token Refresh Bug', status: 'todo', priority: 'urgent', assigneeId: 'u2', dueDate: '2026-06-16', labels: ['bug', 'security'], subtasks: [], hasAISuggestion: true, description: 'Users logged out randomly', comments: [], timeLogged: 0 },
  { id: 't12', title: 'Draft Marketing Copy', status: 'in-progress', priority: 'low', assigneeId: 'u5', dueDate: '2026-06-21', labels: ['marketing'], subtasks: [], hasAISuggestion: true, description: 'Website text and SEO tags', comments: [], timeLogged: 45 },
  { id: 't13', title: 'Update React to v19', status: 'todo', priority: 'medium', assigneeId: 'u3', dueDate: '2026-06-30', labels: ['maintenance'], subtasks: [], hasAISuggestion: false, description: 'Check compatibility', comments: [], timeLogged: 0 },
  { id: 't14', title: 'Configure Redis Cache', status: 'in-progress', priority: 'high', assigneeId: 'u4', dueDate: '2026-06-18', labels: ['backend'], subtasks: [], hasAISuggestion: false, description: 'For API rate limiting', comments: [], timeLogged: 120 },
  { id: 't15', title: 'Add Dark Mode Toggle', status: 'done', priority: 'low', assigneeId: 'u3', dueDate: '2026-06-08', labels: ['frontend'], subtasks: [], hasAISuggestion: false, description: 'CSS variables implementation', comments: [], timeLogged: 60 },
  { id: 't16', title: 'Plan Q3 Roadmap', status: 'todo', priority: 'high', assigneeId: 'u1', dueDate: '2026-06-28', labels: ['planning'], subtasks: [], hasAISuggestion: true, description: 'Features for next quarter', comments: [], timeLogged: 0 },
  { id: 't17', title: 'Audit NPM Dependencies', status: 'done', priority: 'medium', assigneeId: 'u2', dueDate: '2026-06-11', labels: ['security'], subtasks: [], hasAISuggestion: false, description: 'Check for vulnerabilities', comments: [], timeLogged: 30 },
  { id: 't18', title: 'Design Mobile App UI', status: 'in-progress', priority: 'high', assigneeId: 'u5', dueDate: '2026-07-05', labels: ['design'], subtasks: [], hasAISuggestion: true, description: 'Figma mocks for iOS', comments: [], timeLogged: 400 },
  { id: 't19', title: 'Setup Error Tracking', status: 'in-review', priority: 'medium', assigneeId: 'u4', dueDate: '2026-06-16', labels: ['devops'], subtasks: [], hasAISuggestion: false, description: 'Sentry integration', comments: [], timeLogged: 90 },
  { id: 't20', title: 'Write End-to-End Tests', status: 'todo', priority: 'low', assigneeId: 'u3', dueDate: '2026-07-10', labels: ['testing'], subtasks: [], hasAISuggestion: true, description: 'Playwright scripts for main flow', comments: [], timeLogged: 0 },
];

export const initialProjects = [
  { id: 'p1', name: 'Olympus Web App', status: 'active', progress: 75, health: 'on-track', members: ['u1', 'u3', 'u5'], deadline: '2026-07-01', tasksCount: 42 },
  { id: 'p2', name: 'Backend API v2', status: 'active', progress: 40, health: 'at-risk', members: ['u1', 'u2', 'u4'], deadline: '2026-07-15', tasksCount: 28 },
  { id: 'p3', name: 'Marketing Website', status: 'active', progress: 90, health: 'on-track', members: ['u5', 'u3'], deadline: '2026-06-20', tasksCount: 15 },
  { id: 'p4', name: 'iOS App (Alpha)', status: 'planning', progress: 5, health: 'on-track', members: ['u1', 'u3', 'u5'], deadline: '2026-09-01', tasksCount: 60 },
  { id: 'p5', name: 'Security Audit', status: 'active', progress: 60, health: 'on-track', members: ['u2', 'u4'], deadline: '2026-06-30', tasksCount: 12 },
  { id: 'p6', name: 'Legacy System Migration', status: 'delayed', progress: 15, health: 'off-track', members: ['u1', 'u2', 'u4'], deadline: '2026-08-15', tasksCount: 85 },
];

export const initialUsers = [
  { id: 'u1', name: 'Marcus Aurelius', initials: 'MA', color: '#1A6BAF' },
  { id: 'u2', name: 'Ada Lovelace', initials: 'AL', color: '#C4633A' },
  { id: 'u3', name: 'Grace Hopper', initials: 'GH', color: '#C9A84C' },
  { id: 'u4', name: 'Alan Turing', initials: 'AT', color: '#0D0D0D' },
  { id: 'u5', name: 'Hedy Lamarr', initials: 'HL', color: '#4ECDC4' },
];

export const initialNotifications = [
  { id: 'n1', type: 'mention', text: 'Ada Lovelace mentioned you in "Implement JWT Auth"', time: '10m ago', read: false },
  { id: 'n2', type: 'system', text: 'Project "Marketing Website" is nearing its deadline', time: '1h ago', read: false },
  { id: 'n3', type: 'assign', text: 'Marcus Aurelius assigned "Plan Q3 Roadmap" to you', time: '2h ago', read: false },
  { id: 'n4', type: 'comment', text: 'Grace Hopper commented on "Optimize WebGL Shaders"', time: '3h ago', read: true },
  { id: 'n5', type: 'system', text: 'Weekly productivity report is ready', time: '1d ago', read: true },
  { id: 'n6', type: 'mention', text: 'Hedy Lamarr mentioned you in "Design Mobile App UI"', time: '1d ago', read: true },
  { id: 'n7', type: 'complete', text: 'Alan Turing completed "Audit NPM Dependencies"', time: '2d ago', read: true },
  { id: 'n8', type: 'system', text: 'Welcome to Olympus! Read the quick start guide.', time: '1w ago', read: true },
];
