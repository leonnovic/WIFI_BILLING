import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatWidget from './ChatWidget';

export default function AppLayout() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--content-bg)' }}>
      <Sidebar />
      <Header />
      <main
        style={{
          marginLeft: 'var(--sidebar-width)',
          paddingTop: 'var(--header-height)',
          minHeight: '100vh',
        }}
      >
        <div style={{ padding: 'var(--content-padding)' }}>
          <Outlet />
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
