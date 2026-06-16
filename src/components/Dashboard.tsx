import { useTasks } from '../context/TaskContext';

export const Dashboard = () => {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'DONE').length;
  const defcon1 = tasks.filter(t => t.priority === 'DEFCON 1' && t.status !== 'DONE').length;

  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      <header>
        <h1 className="glitch" data-text="ANALYTICS.CORE" style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase' }}>
          ANALYTICS.CORE
        </h1>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', background: 'var(--color-text-primary)', color: 'var(--color-bg)', display: 'inline-block', padding: '0.5rem 1rem' }}>
          SYSTEM METRICS EXTRACTION
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="shipping-label" style={{ transform: 'none' }}>
          <div style={{ fontFamily: 'var(--font-barcode)', fontSize: '3rem', opacity: 0.5 }}>DEATH_RATE</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '8rem', fontWeight: 900, lineHeight: 1 }}>{completionRate}%</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 900 }}>TERMINATION EFFICIENCY</div>
        </div>
        
        <div className="shipping-label" style={{ transform: 'none', background: defcon1 > 0 ? 'var(--color-accent-red)' : 'var(--color-surface)', color: defcon1 > 0 ? '#fff' : 'inherit' }}>
          <div style={{ fontFamily: 'var(--font-barcode)', fontSize: '3rem', opacity: 0.5 }}>THREATS</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '8rem', fontWeight: 900, lineHeight: 1 }}>{defcon1}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 900 }}>ACTIVE DEFCON 1 THREATS</div>
        </div>

        <div className="shipping-label" style={{ transform: 'none' }}>
          <div style={{ fontFamily: 'var(--font-barcode)', fontSize: '3rem', opacity: 0.5 }}>TOTAL</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '8rem', fontWeight: 900, lineHeight: 1 }}>{totalTasks}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 900 }}>TOTAL ENTITIES LOGGED</div>
        </div>
      </div>

      <div style={{ border: '8px solid var(--color-border)', padding: '2rem', background: 'var(--color-surface)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, marginBottom: '2rem' }}>RAW OUTPUT DATA</h2>
        {/* Fake chaotic terminal chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', height: '300px', gap: '4px', borderBottom: '4px solid var(--color-border)' }}>
          {Array.from({ length: 40 }).map((_, i) => {
            const height = Math.random() * 100;
            return (
              <div key={i} style={{ 
                flex: 1, 
                height: `${height}%`, 
                background: height > 80 ? 'var(--color-accent-red)' : 'var(--color-text-primary)',
                transition: 'height 0.2s',
                borderTop: '4px solid var(--color-surface)'
              }} />
            )
          })}
        </div>
      </div>
    </div>
  );
};
