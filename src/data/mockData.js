export const initialTasks = [
  { id: 't1', title: 'Coordinate Lobby Renovation Contractors', status: 'done', priority: 'high', assigneeId: 'u1', dueDate: '2026-06-10', labels: ['maintenance'], subtasks: [{ id: 's1', text: 'Clear west wing', done: true }, { id: 's2', text: 'Setup scaffolding', done: true }], hasAISuggestion: false, description: 'Ensure all contractors have visitor badges and staging area is clear.', comments: [], timeLogged: 120 },
  { id: 't2', title: 'Audit HVAC Systems in South Wing', status: 'done', priority: 'urgent', assigneeId: 'u2', dueDate: '2026-06-12', labels: ['facilities'], subtasks: [], hasAISuggestion: false, description: 'Check freon levels and replace all filters on floors 3-5.', comments: [], timeLogged: 240 },
  { id: 't3', title: 'VIP Arrival: Diplomat Suite Preparation', status: 'in-review', priority: 'medium', assigneeId: 'u3', dueDate: '2026-06-16', labels: ['concierge'], subtasks: [{ id: 's3', text: 'Stock minibar', done: true }, { id: 's4', text: 'Security sweep', done: false }], hasAISuggestion: true, description: 'Prepare Presidential Suite for the foreign delegation arriving Tuesday.', comments: [], timeLogged: 300 },
  { id: 't4', title: 'Restock Minibars (Floor 10-15)', status: 'in-progress', priority: 'urgent', assigneeId: 'u1', dueDate: '2026-06-18', labels: ['housekeeping', 'inventory'], subtasks: [], hasAISuggestion: false, description: 'Standard premium restock. Note: Room 1204 requested no alcohol.', comments: [], timeLogged: 60 },
  { id: 't5', title: 'Optimize Staff Scheduling', status: 'todo', priority: 'high', assigneeId: 'u3', dueDate: '2026-06-20', labels: ['hr', 'operations'], subtasks: [], hasAISuggestion: true, description: 'Reduce overtime by optimizing the shift overlap during peak checkout hours.', comments: [], timeLogged: 0 },
  { id: 't6', title: 'Update Evacuation Procedures', status: 'todo', priority: 'low', assigneeId: 'u2', dueDate: '2026-06-25', labels: ['safety'], subtasks: [], hasAISuggestion: true, description: 'Draft new evacuation maps for the recently renovated East Wing.', comments: [], timeLogged: 0 },
  { id: 't7', title: 'Kitchen Exhaust Cleaning', status: 'done', priority: 'high', assigneeId: 'u4', dueDate: '2026-06-05', labels: ['maintenance'], subtasks: [], hasAISuggestion: false, description: 'Quarterly deep clean of the main restaurant kitchen exhausts.', comments: [], timeLogged: 180 },
  { id: 't8', title: 'Evaluate New Valet System', status: 'in-progress', priority: 'medium', assigneeId: 'u1', dueDate: '2026-06-19', labels: ['guest-services'], subtasks: [], hasAISuggestion: true, description: 'Compare ticketless SMS systems vs traditional RFID tags.', comments: [], timeLogged: 90 },
  { id: 't9', title: 'Order Poolside Towels', status: 'done', priority: 'medium', assigneeId: 'u5', dueDate: '2026-06-14', labels: ['inventory'], subtasks: [], hasAISuggestion: false, description: 'Replenish luxury Egyptian cotton towels for the summer season.', comments: [], timeLogged: 120 },
  { id: 't10', title: 'Implement Keyless Entry', status: 'in-review', priority: 'high', assigneeId: 'u3', dueDate: '2026-06-17', labels: ['technology'], subtasks: [], hasAISuggestion: false, description: 'Roll out mobile app Bluetooth keys for Club Level guests.', comments: [], timeLogged: 210 },
  { id: 't11', title: 'Fix Elevator 4 Fault', status: 'todo', priority: 'urgent', assigneeId: 'u2', dueDate: '2026-06-16', labels: ['maintenance', 'urgent'], subtasks: [], hasAISuggestion: true, description: 'Elevator 4 stuck on floor 8. Maintenance team dispatched.', comments: [], timeLogged: 0 },
  { id: 't12', title: 'Draft Wedding Package Brochure', status: 'in-progress', priority: 'low', assigneeId: 'u5', dueDate: '2026-06-21', labels: ['marketing'], subtasks: [], hasAISuggestion: true, description: 'New 2027 wedding packages for the grand ballroom.', comments: [], timeLogged: 45 },
  { id: 't13', title: 'Update POS Software', status: 'todo', priority: 'medium', assigneeId: 'u3', dueDate: '2026-06-30', labels: ['it'], subtasks: [], hasAISuggestion: false, description: 'Apply security patch to all lobby bar terminals.', comments: [], timeLogged: 0 },
  { id: 't14', title: 'Configure Smart Thermostats', status: 'in-progress', priority: 'high', assigneeId: 'u4', dueDate: '2026-06-18', labels: ['facilities'], subtasks: [], hasAISuggestion: false, description: 'Set default idle temperatures for unoccupied rooms to save energy.', comments: [], timeLogged: 120 },
  { id: 't15', title: 'Add Night Mode to Guest Tablets', status: 'done', priority: 'low', assigneeId: 'u3', dueDate: '2026-06-08', labels: ['technology'], subtasks: [], hasAISuggestion: false, description: 'Push OTA update to in-room tablets.', comments: [], timeLogged: 60 },
  { id: 't16', title: 'Plan Q3 Event Calendar', status: 'todo', priority: 'high', assigneeId: 'u1', dueDate: '2026-06-28', labels: ['events'], subtasks: [], hasAISuggestion: true, description: 'Schedule corporate retreats and block out dates.', comments: [], timeLogged: 0 },
  { id: 't17', title: 'Audit Vendor Contracts', status: 'done', priority: 'medium', assigneeId: 'u2', dueDate: '2026-06-11', labels: ['finance'], subtasks: [], hasAISuggestion: false, description: 'Review laundry service SLAs and pricing.', comments: [], timeLogged: 30 },
  { id: 't18', title: 'Design New Uniforms', status: 'in-progress', priority: 'high', assigneeId: 'u5', dueDate: '2026-07-05', labels: ['hr'], subtasks: [], hasAISuggestion: true, description: 'Review fabric swatches with the executive team.', comments: [], timeLogged: 400 },
  { id: 't19', title: 'Setup Noise Monitoring', status: 'in-review', priority: 'medium', assigneeId: 'u4', dueDate: '2026-06-16', labels: ['security'], subtasks: [], hasAISuggestion: false, description: 'Install decibel monitors in hallway corridors.', comments: [], timeLogged: 90 },
  { id: 't20', title: 'Write Housekeeping Protocols', status: 'todo', priority: 'low', assigneeId: 'u3', dueDate: '2026-07-10', labels: ['training'], subtasks: [], hasAISuggestion: true, description: 'Updated sanitation standards for 2026.', comments: [], timeLogged: 0 },
];

export const initialProjects = [
  { id: 'p1', name: 'Grand Lobby Renovation', status: 'active', progress: 75, health: 'on-track', members: ['u1', 'u3', 'u5'], deadline: '2026-07-01', tasksCount: 42, budget: '$1.2M', spent: '$850k', image: 'https://images.unsplash.com/photo-1542314831-c6a420325142?w=800&q=80' },
  { id: 'p2', name: 'Smart Room Upgrades', status: 'active', progress: 40, health: 'at-risk', members: ['u1', 'u2', 'u4'], deadline: '2026-07-15', tasksCount: 28, budget: '$450k', spent: '$200k', image: 'https://images.unsplash.com/photo-1590490359854-dfba196ce0cb?w=800&q=80' },
  { id: 'p3', name: 'Summer Staff Training', status: 'active', progress: 90, health: 'on-track', members: ['u5', 'u3'], deadline: '2026-06-20', tasksCount: 15, budget: '$25k', spent: '$22k', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80' },
  { id: 'p4', name: 'Rooftop Bar Extension', status: 'planning', progress: 5, health: 'on-track', members: ['u1', 'u3', 'u5'], deadline: '2026-09-01', tasksCount: 60, budget: '$800k', spent: '$10k', image: 'https://images.unsplash.com/photo-1572177215152-32f247303126?w=800&q=80' },
  { id: 'p5', name: 'Security Audit', status: 'active', progress: 60, health: 'on-track', members: ['u2', 'u4'], deadline: '2026-06-30', tasksCount: 12, budget: '$15k', spent: '$8k', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80' },
  { id: 'p6', name: 'Legacy POS Migration', status: 'delayed', progress: 15, health: 'off-track', members: ['u1', 'u2', 'u4'], deadline: '2026-08-15', tasksCount: 85, budget: '$120k', spent: '$40k', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80' },
];

export const initialUsers = [
  { id: 'u1', name: 'Marcus (Ops)', initials: 'MA', color: '#7b39fc' },
  { id: 'u2', name: 'Ada (Facilities)', initials: 'AL', color: '#10b981' },
  { id: 'u3', name: 'Grace (IT)', initials: 'GH', color: '#f59e0b' },
  { id: 'u4', name: 'Alan (Maintenance)', initials: 'AT', color: '#3b82f6' },
  { id: 'u5', name: 'Hedy (HR)', initials: 'HL', color: '#ec4899' },
];

export const initialNotifications = [
  { id: 'n1', type: 'mention', text: 'Ada mentioned you in "Audit HVAC Systems"', time: '10m ago', read: false },
  { id: 'n2', type: 'system', text: 'Project "Grand Lobby Renovation" is nearing its deadline', time: '1h ago', read: false },
  { id: 'n3', type: 'assign', text: 'Marcus assigned "Plan Q3 Event Calendar" to you', time: '2h ago', read: false },
  { id: 'n4', type: 'comment', text: 'Grace commented on "Fix Elevator 4 Fault"', time: '3h ago', read: true },
  { id: 'n5', type: 'system', text: 'Daily Occupancy Report is ready', time: '1d ago', read: true },
  { id: 'n6', type: 'mention', text: 'Hedy mentioned you in "Design New Uniforms"', time: '1d ago', read: true },
  { id: 'n7', type: 'complete', text: 'Alan completed "Kitchen Exhaust Cleaning"', time: '2d ago', read: true },
  { id: 'n8', type: 'system', text: 'Welcome to Datacore! View the property map.', time: '1w ago', read: true },
];
