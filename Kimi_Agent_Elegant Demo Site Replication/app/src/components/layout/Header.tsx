import { useState } from 'react';
import { Search, Sun, Moon, Bell, ChevronDown, Zap, User } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header
      className="fixed top-0 right-0 flex items-center justify-between px-4"
      style={{
        height: 'var(--header-height)',
        background: 'var(--header-bg)',
        left: 'var(--sidebar-width)',
        zIndex: 40,
        borderBottom: '1px solid var(--card-border)',
      }}
    >
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full py-1.5 pl-9 pr-3 text-sm rounded"
            style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--input-border)',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            color: 'var(--text-secondary)',
          }}
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
          <span>Light</span>
        </button>

        {/* Language */}
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            color: 'var(--text-secondary)',
          }}
        >
          <img
            src="https://flagcdn.com/w20/id.png"
            alt="ID"
            className="w-5 h-3.5 rounded-sm object-cover"
          />
          <span>ID</span>
        </button>

        {/* Quick Actions */}
        <div className="relative">
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              color: 'var(--text-secondary)',
            }}
          >
            <Zap size={14} />
            <span>Quick Actions</span>
            <ChevronDown size={12} />
          </button>
          {showQuickActions && (
            <div
              className="absolute right-0 top-full mt-1 py-1 rounded-lg min-w-[180px]"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              }}
            >
              {['Add Customer', 'Create Ticket', 'Generate Voucher', 'Recharge Account', 'Send SMS'].map((action) => (
                <button
                  key={action}
                  className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-white/5"
                  style={{ color: 'var(--text-secondary)' }}
                  onClick={() => setShowQuickActions(false)}
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded transition-colors hover:bg-white/5" style={{ color: 'var(--text-secondary)' }}>
          <Bell size={18} />
          <span
            className="absolute -top-0.5 -right-0.5 flex items-center justify-center text-[10px] font-bold text-white rounded-full"
            style={{
              background: 'var(--accent-red)',
              width: '18px',
              height: '18px',
            }}
          >
            57
          </span>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-2 py-1 rounded transition-colors hover:bg-white/5"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: 'var(--accent-blue)' }}
            >
              <User size={14} className="text-white" />
            </div>
            <div className="text-left">
              <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                Demo Account
              </div>
            </div>
          </button>
          {showProfile && (
            <div
              className="absolute right-0 top-full mt-1 py-1 rounded-lg min-w-[160px]"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              }}
            >
              {['Profile', 'Settings', 'Billing', 'Logout'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-white/5"
                  style={{ color: 'var(--text-secondary)' }}
                  onClick={() => setShowProfile(false)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
