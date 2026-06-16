import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: '/app', label: 'THE.LABORS (Board)' },
    { path: '/app/dashboard', label: 'THE.ORACLE (Analytics)' },
    { path: '/app/calendar', label: 'THE.PARTHENON (Grid)' },
    { path: '/app/all', label: 'THE.ARCHIVES (All)' },
  ];

  return (
    <div className="fluted-column" style={{
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }}>
      <div style={{ padding: '3rem 2rem', borderBottom: 'var(--border-thick)', background: 'var(--color-surface)' }}>
        <h2 className="chiseled-text" style={{
          fontSize: '3rem',
          fontWeight: 900,
          lineHeight: 1,
          color: 'var(--color-text-primary)'
        }}>
          AGORA.NAV
        </h2>
      </div>

      <nav style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '2rem', gap: '1rem', background: 'var(--color-surface)' }}>
        {links.map((link) => {
          const isActive = location.pathname === link.path || (location.pathname === '/app/board' && link.path === '/app');
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '1.5rem',
                border: 'var(--border-thick)',
                fontFamily: 'var(--font-chiseled)',
                fontSize: '1.2rem',
                fontWeight: 900,
                textDecoration: 'none',
                background: isActive ? 'var(--color-gold)' : 'var(--color-surface)',
                color: 'var(--color-stone)',
                transition: 'all 0.1s',
                boxShadow: isActive ? 'none' : 'var(--shadow-stone)',
                transform: isActive ? 'translate(4px, 4px)' : 'none',
                letterSpacing: '2px'
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '2rem', background: 'var(--color-surface)', borderTop: 'var(--border-thick)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', opacity: 0.5 }}>
          STATUS: OLYMPUS CONNECTED
        </div>
      </div>
    </div>
  );
};
