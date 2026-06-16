import { useTasks } from '../context/TaskContext';

export const AllTasks = () => {
  const { tasks } = useTasks();

  return (
    <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      <header>
        <h1 className="glitch" data-text="ALL.RECORDS" style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase' }}>
          ALL.RECORDS
        </h1>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', background: 'var(--color-text-primary)', color: 'var(--color-bg)', display: 'inline-block', padding: '0.5rem 1rem' }}>
          MASTER MANIFEST DATABASE
        </div>
      </header>

      <div style={{ border: '8px solid var(--color-border)', background: 'var(--color-surface)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)' }}>
          <thead>
            <tr style={{ background: 'var(--color-text-primary)', color: 'var(--color-bg)', fontSize: '1.2rem' }}>
              <th style={{ padding: '1.5rem', textAlign: 'left', borderRight: '2px solid var(--color-bg)' }}>ID_HASH</th>
              <th style={{ padding: '1.5rem', textAlign: 'left', borderRight: '2px solid var(--color-bg)' }}>ENTITY_NAME</th>
              <th style={{ padding: '1.5rem', textAlign: 'left', borderRight: '2px solid var(--color-bg)' }}>THREAT_LVL</th>
              <th style={{ padding: '1.5rem', textAlign: 'left' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t => (
              <tr key={t.id} style={{ borderBottom: '4px solid var(--color-border)', background: t.status === 'DONE' ? 'rgba(0,0,0,0.1)' : 'transparent' }}>
                <td style={{ padding: '1.5rem', borderRight: '2px solid var(--color-border)', fontWeight: 900, opacity: 0.5 }}>
                  {t.id.split('-')[0]}
                </td>
                <td style={{ padding: '1.5rem', borderRight: '2px solid var(--color-border)', fontWeight: 900, fontSize: '1.2rem', textDecoration: t.status === 'DONE' ? 'line-through' : 'none' }}>
                  {t.title}
                </td>
                <td style={{ padding: '1.5rem', borderRight: '2px solid var(--color-border)' }}>
                  <span style={{ background: t.priority === 'DEFCON 1' ? 'var(--color-accent-red)' : 'transparent', color: t.priority === 'DEFCON 1' ? '#fff' : 'inherit', padding: '0.2rem 0.5rem', fontWeight: 900 }}>
                    {t.priority}
                  </span>
                </td>
                <td style={{ padding: '1.5rem', fontWeight: 900, color: t.status === 'DONE' ? 'var(--color-accent-red)' : 'inherit' }}>
                  {t.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
