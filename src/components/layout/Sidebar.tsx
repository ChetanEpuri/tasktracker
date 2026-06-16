import { Link, useLocation } from 'react-router-dom';

const MAIN_NAV = [
  { name: 'Dashboard', path: '/app/dashboard' },
  { name: 'Inbox', path: '/app/inbox' },
  { name: 'My Tasks', path: '/app/tasks' },
];

const WORKSPACE_NAV = [
  { name: 'Projects', path: '/app/projects' },
  { name: 'Calendar', path: '/app/calendar' },
  { name: 'Timeline', path: '/app/timeline' },
  { name: 'Goals', path: '/app/goals' },
  { name: 'Documents', path: '/app/documents' },
];

const AI_NAV = [
  { name: 'AI Assistant', path: '/app/ai-chat' },
  { name: 'Automations', path: '/app/automations' },
  { name: 'Agent Fleet', path: '/app/agents' },
];

const ADMIN_NAV = [
  { name: 'Reports', path: '/app/reports' },
  { name: 'Team', path: '/app/team' },
  { name: 'Settings', path: '/app/settings' },
];

export const Sidebar = () => {
  const location = useLocation();

  const NavGroup = ({ title, items }: { title: string, items: any[] }) => (
    <div style={{ marginBottom: '2rem' }}>
      {title && (
        <h4 style={{ 
          fontSize: '0.875rem', 
          color: 'var(--color-gold-deep)',
          fontFamily: 'var(--font-heading)',
          padding: '1rem 1.5rem',
          marginBottom: '0',
          letterSpacing: '1px'
        }}>
          {title}
        </h4>
      )}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              style={{
                display: 'block',
                padding: '0.75rem 1.5rem',
                color: isActive ? 'var(--color-gold-deep)' : 'var(--text-light)',
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
                fontWeight: isActive ? 600 : 500,
                background: isActive ? 'rgba(179, 135, 40, 0.05)' : 'transparent',
                borderRight: isActive ? '3px solid var(--color-gold-deep)' : '3px solid transparent',
                transition: 'all 0.2s ease'
              }}
              className="hover:bg-marble-vein"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside 
      style={{ 
        width: '260px', 
        height: '100vh', 
        background: 'var(--color-marble-pure)', 
        borderRight: '1px solid rgba(0,0,0,0.05)',
        boxShadow: 'var(--shadow-museum)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10
      }}
    >
      <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '24px', height: '24px', background: 'var(--gold-gradient)', borderRadius: '4px', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
        <h1 style={{ fontSize: '1.25rem', color: 'var(--text-dark)', margin: 0, fontFamily: 'var(--font-heading)' }}>OLYMPUS AI</h1>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '2rem', paddingTop: '1rem' }}>
        <NavGroup title="" items={MAIN_NAV} />
        <NavGroup title="WORKSPACE" items={WORKSPACE_NAV} />
        <NavGroup title="MACHINE MIND" items={AI_NAV} />
        <NavGroup title="ADMINISTRATION" items={ADMIN_NAV} />
      </div>
    </aside>
  );
};
