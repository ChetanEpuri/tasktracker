const Widget = ({ title, value, label, span = 1 }: { title: string, value: string, label: string, span?: number }) => (
  <div className="glass-marble-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', gridColumn: `span ${span}` }}>
    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-light)', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem' }}>{title}</h3>
    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
      <span className="text-gold" style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 0.9, fontFamily: 'var(--font-heading)' }}>{value}</span>
      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-light)', marginBottom: '0.5rem' }}>{label}</span>
    </div>
  </div>
);

export const Dashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '3rem', margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--text-dark)' }}>DASHBOARD</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Welcome to the peak of Olympus.</p>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        {/* Core Metrics */}
        <Widget title="Productivity Score" value="92" label="+5% Vs Last Week" />
        <Widget title="Tasks Conquered" value="14" label="Today" />
        <Widget title="Overdue Labors" value="03" label="Requires Attention" />

        {/* AI Insights Card */}
        <div className="glass-marble-card" style={{ gridColumn: '1 / -1', border: '1px solid var(--color-gold-deep)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '30%', background: 'var(--gold-gradient)', opacity: 0.05 }} />
          <h3 style={{ fontSize: '1.5rem', color: 'var(--color-gold-deep)', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>THE ORACLE</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 10 }}>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-dark)' }}>
              Workload Imbalance Detected in Squad Alpha
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-light)', maxWidth: '800px', lineHeight: 1.6 }}>
              Spartan Leonidas is assigned 14 story points this sprint, while the squad average is 8. The Oracle predicts a 78% chance of burnout within 12 days. 
              Would you like to authorize an automatic redistribution of labor?
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn-gold" style={{ fontSize: '0.875rem', padding: '0.75rem 2rem' }}>AUTHORIZE</button>
              <button className="btn-outline" style={{ fontSize: '0.875rem', padding: '0.75rem 2rem' }}>DISMISS</button>
            </div>
          </div>
        </div>

        {/* Project Progress */}
        <div className="glass-marble-card" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-light)', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem' }}>ACTIVE CAMPAIGNS</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             {[
               { id: 'Athens Defense', val: 40 },
               { id: 'Spartan Assault', val: 75 },
               { id: 'Naval Supply', val: 20 },
             ].map((proj, i) => (
               <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                 <span style={{ fontSize: '1rem', fontWeight: 600, width: '150px' }}>{proj.id}</span>
                 <div style={{ flex: 1, height: '8px', background: 'var(--color-marble-vein)', borderRadius: '4px', overflow: 'hidden' }}>
                   <div style={{ height: '100%', width: `${proj.val}%`, background: 'var(--gold-gradient)' }} />
                 </div>
                 <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-gold-deep)' }}>{proj.val}%</span>
               </div>
             ))}
           </div>
        </div>

        {/* Team Activity */}
        <div className="glass-marble-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-light)', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem' }}>SQUAD ACTIVITY</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {['Leonidas conquered Task T-404', 'Athena pushed 3 commits', 'Ares assigned 2 new labors'].map((log, i) => (
              <div key={i} style={{ fontSize: '0.875rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-gold-deep)' }} />
                {log}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
