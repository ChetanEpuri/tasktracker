import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const TopNavbar = () => {
  return (
    <header style={{ 
      padding: '1.5rem 3rem', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      color: 'var(--text-dark)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <h2 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>THE AGORA</h2>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search Olympus..." 
          style={{ 
            background: 'var(--color-marble-vein)', border: 'none', padding: '0.5rem 1rem', 
            borderRadius: '20px', fontSize: '0.875rem', width: '250px' 
          }} 
        />
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gold-gradient)' }} />
      </div>
    </header>
  );
};

export const MainLayout = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--color-marble-vein)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <TopNavbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '3rem' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
