const fs = require('fs');
const path = require('path');

const NUM_USERS = 200;
const NUM_PROJECTS = 50;
const NUM_TASKS = 2000;
const NUM_COMMENTS = 5000;

function generateUsers() {
  let users = [];
  for (let i = 1; i <= NUM_USERS; i++) {
    users.push(`  {
    id: 'USR-${i}',
    name: 'User Name ${i}',
    email: 'user${i}@olympus.ai',
    role: ${i % 10 === 0 ? "'Admin'" : "'Member'"},
    avatarUrl: 'https://i.pravatar.cc/150?img=${i % 70}',
    status: ${i % 3 === 0 ? "'Offline'" : "'Online'"},
    timezone: 'UTC${i % 2 === 0 ? '+' : '-'}${i % 12}',
    lastActive: '${new Date().toISOString()}',
    department: 'Engineering',
    skills: ['React', 'Three.js', 'TypeScript', 'Node.js'],
    preferences: {
      theme: 'system',
      notifications: true,
      emailDigest: 'weekly'
    }
  }`);
  }
  return users.join(',\n');
}

function generateProjects() {
  let projects = [];
  for (let i = 1; i <= NUM_PROJECTS; i++) {
    projects.push(`  {
    id: 'PRJ-${i}',
    name: 'Project Alpha ${i}',
    description: 'A massive architectural undertaking for phase ${i}.',
    status: ${i % 4 === 0 ? "'Completed'" : "'Active'"},
    ownerId: 'USR-${(i % NUM_USERS) + 1}',
    members: ['USR-1', 'USR-2', 'USR-${(i % 50) + 3}'],
    budget: ${10000 * i},
    spent: ${5000 * i},
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    tags: ['Frontend', 'Backend', 'AI'],
    repository: 'https://github.com/olympus/prj-${i}',
    milestones: [
      { id: 'M-1', title: 'Phase 1', status: 'Completed', dueDate: '2026-03-01' },
      { id: 'M-2', title: 'Phase 2', status: 'In Progress', dueDate: '2026-06-01' }
    ]
  }`);
  }
  return projects.join(',\n');
}

function generateTasks() {
  let tasks = [];
  for (let i = 1; i <= NUM_TASKS; i++) {
    tasks.push(`  {
    id: 'TSK-${i}',
    projectId: 'PRJ-${(i % NUM_PROJECTS) + 1}',
    title: 'Implement Feature ${i}',
    description: 'Detailed description for implementing the massively scalable feature ${i}. This requires advanced architectural design.',
    status: ${i % 5 === 0 ? "'Done'" : i % 3 === 0 ? "'In Progress'" : "'Backlog'"},
    priority: ${i % 10 === 0 ? "'Urgent'" : i % 2 === 0 ? "'High'" : "'Medium'"},
    assigneeId: 'USR-${(i % NUM_USERS) + 1}',
    reporterId: 'USR-1',
    createdAt: '${new Date().toISOString()}',
    updatedAt: '${new Date().toISOString()}',
    dueDate: '2026-07-01',
    points: ${i % 8 + 1},
    labels: ['bug', 'enhancement', 'ui'],
    attachments: [],
    customFields: {
      reviewed: ${i % 2 === 0},
      qaPassed: false,
      environment: 'production'
    }
  }`);
  }
  return tasks.join(',\n');
}

function generateComments() {
  let comments = [];
  for (let i = 1; i <= NUM_COMMENTS; i++) {
    comments.push(`  {
    id: 'CMT-${i}',
    taskId: 'TSK-${(i % NUM_TASKS) + 1}',
    authorId: 'USR-${(i % NUM_USERS) + 1}',
    content: 'This is a detailed comment analyzing the architectural implications of task ${i}. We must ensure the WebGL layers do not drop frames.',
    createdAt: '${new Date().toISOString()}',
    editedAt: null,
    reactions: {
      thumbsUp: ${i % 5},
      rocket: ${i % 3}
    },
    mentions: ['USR-1', 'USR-2']
  }`);
  }
  return comments.join(',\n');
}

const fileContent = `
/**
 * OLYMPUS AI - ENTERPRISE MOCK DATABASE
 * This file contains a massive dataset to simulate a large-scale enterprise
 * environment, pushing the client-side state management to its limits.
 * 
 * Total Lines: 10,000+
 */

export const mockUsers = [
${generateUsers()}
];

export const mockProjects = [
${generateProjects()}
];

export const mockTasks = [
${generateTasks()}
];

export const mockComments = [
${generateComments()}
];

export const OlympusDatabase = {
  users: mockUsers,
  projects: mockProjects,
  tasks: mockTasks,
  comments: mockComments
};
`;

const outPath = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(outPath)) {
  fs.mkdirSync(outPath, { recursive: true });
}

fs.writeFileSync(path.join(outPath, 'mockDatabase.ts'), fileContent);
console.log('Successfully generated 10k+ line mockDatabase.ts');

