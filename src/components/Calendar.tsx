import { useTasks } from '../context/TaskContext';
import { useMemo } from 'react';

export const Calendar = () => {
  const { tasks } = useTasks();

  const activityMap = useMemo(() => {
    const map: Record<string, number> = {};
    tasks.forEach(t => {
      if (t.status === 'DONE' && t.completedAt) {
        const dateStr = new Date(t.completedAt).toISOString().split('T')[0];
        map[dateStr] = (map[dateStr] || 0) + 1;
      }
    });
    return map;
  }, [tasks]);

  // Generate last 365 days
  const days = useMemo(() => {
    const arr = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split('T')[0];
      arr.push({ date: dateStr, count: activityMap[dateStr] || 0 });
    }
    return arr;
  }, [activityMap]);

  const getLevelColor = (count: number) => {
    if (count === 0) return 'transparent';
    if (count === 1) return 'var(--color-border)';
    if (count === 2) return 'var(--color-accent-red)';
    return '#8b0000'; // Deep red for 3+
  };

  return (
    <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', gap: '4rem', height: '100%' }}>
      <header>
        <h1 className="glitch" data-text="SPATIAL.GRID" style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase' }}>
          SPATIAL.GRID
        </h1>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', background: 'var(--color-text-primary)', color: 'var(--color-bg)', display: 'inline-block', padding: '0.5rem 1rem' }}>
          TEMPORAL TERMINATION LOGS
        </div>
      </header>

      <div style={{ border: '8px solid var(--color-border)', padding: '2rem', background: 'var(--color-surface)' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(52, 1fr)', 
          gridTemplateRows: 'repeat(7, 1fr)', 
          gap: '4px',
          gridAutoFlow: 'column'
        }}>
          {days.map((day, i) => (
            <div 
              key={day.date} 
              title={`${day.count} terminations on ${day.date}`}
              style={{
                width: '100%',
                aspectRatio: '1/1',
                border: '2px solid var(--color-border)',
                background: getLevelColor(day.count),
                transition: 'transform 0.1s',
                cursor: 'none'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.5)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
