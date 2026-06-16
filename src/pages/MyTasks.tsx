const TASKS = [
  { id: 'T-402', title: 'Design System Documentation', status: 'In Progress', priority: 'High', date: 'Today' },
  { id: 'T-403', title: 'Implement Stripe Webhooks', status: 'Backlog', priority: 'Urgent', date: 'Tomorrow' },
  { id: 'T-404', title: 'User Onboarding Flow', status: 'Done', priority: 'Medium', date: 'Oct 12' },
  { id: 'T-405', title: 'Fix Navigation Bug on Safari', status: 'In Progress', priority: 'Low', date: 'Today' },
];

export const MyTasks = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ paddingBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--text-dark)' }}>MY LABORS</h1>
          <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Organize and conquer your divine duties.</p>
        </div>
        <button className="btn-gold" style={{ padding: '0.75rem 2rem', fontSize: '0.875rem' }}>FORGE NEW LABOR</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <input 
            type="text" 
            placeholder="Search Labors..." 
            style={{ 
              background: 'var(--color-marble-pure)', border: '1px solid rgba(0,0,0,0.1)', padding: '1rem 1.5rem', 
              borderRadius: '12px', fontSize: '1rem', width: '100%', color: 'var(--text-dark)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
            }} 
          />
        </div>
      </div>

      {/* Task List View - Elegant SaaS Style */}
      <div className="glass-marble-card" style={{ padding: 0, overflow: 'hidden' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px 100px', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '1rem 2rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', background: 'var(--color-marble-vein)' }}>
          <div>ID</div>
          <div>TITLE</div>
          <div>STATUS</div>
          <div>PRIORITY</div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {TASKS.map((task, i) => (
            <div 
              key={task.id} 
              style={{ 
                display: 'grid', gridTemplateColumns: '80px 1fr 120px 100px', padding: '1.5rem 2rem', 
                borderBottom: i === TASKS.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.05)',
                alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s ease'
              }}
              className="hover:bg-marble-vein"
            >
              <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>{task.id}</div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontWeight: task.status === 'Done' ? 400 : 500, color: task.status === 'Done' ? 'var(--text-light)' : 'var(--text-dark)', textDecoration: task.status === 'Done' ? 'line-through' : 'none' }}>
                  {task.title}
                </span>
                {task.priority === 'Urgent' && <span style={{ padding: '0.25rem 0.5rem', background: 'rgba(179, 135, 40, 0.1)', color: 'var(--color-gold-deep)', fontSize: '0.65rem', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase' }}>Attention</span>}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: task.status === 'Done' ? 'var(--color-gold-deep)' : task.status === 'In Progress' ? 'var(--color-sky-deep)' : 'var(--color-marble-vein)', border: '1px solid rgba(0,0,0,0.1)' }} />
                {task.status}
              </div>
              
              <div style={{ fontSize: '0.875rem', color: task.priority === 'Urgent' ? 'var(--text-dark)' : 'var(--text-light)', fontWeight: task.priority === 'Urgent' ? 600 : 400 }}>
                {task.priority}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
