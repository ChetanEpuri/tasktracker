import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { CommandPalette } from './CommandPalette';

export const AppLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <CommandPalette />
      <Sidebar />
      <div style={{ flexGrow: 1, overflowY: 'auto', background: 'var(--color-bg)', position: 'relative' }}>
        <Outlet />
      </div>
    </div>
  );
};
