import { useState, useMemo } from 'react';
import {
  Search, RefreshCw, Router, Eye, Pencil, Trash2
} from 'lucide-react';
import { ipBindings } from '@/data/mockData';

export default function IPBindings() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return ipBindings;
    const s = search.toLowerCase();
    return ipBindings.filter(
      (b) =>
        b.name.toLowerCase().includes(s) ||
        b.username.toLowerCase().includes(s) ||
        b.ip.includes(s) ||
        b.mac.toLowerCase().includes(s)
    );
  }, [search]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>IP Bindings</h1>

      <div className="card-dark">
        <div className="section-header-bar">
          <h3>Active IP Binding List</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium" style={{ background: 'var(--accent-blue)', color: 'white' }}>
              <RefreshCw size={12} /> Sync All Bindings
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium" style={{ background: 'var(--accent-blue)', color: 'white' }}>
              <Router size={12} /> Sync by Router
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by Name / Username / IP / MAC"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2 pl-9 pr-3 text-sm rounded outline-none"
              style={{
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <button className="flex items-center gap-1 px-4 py-2 rounded text-xs font-medium" style={{ background: 'var(--accent-blue)', color: 'white' }}>
            <Search size={12} /> Search
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>USERNAME</th>
                <th>IP</th>
                <th>MAC</th>
                <th>PLAN</th>
                <th>CREATED</th>
                <th>EXPIRES</th>
                <th>ROUTER</th>
                <th>STATUS</th>
                <th>MANAGE</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((binding) => (
                <tr key={binding.id}>
                  <td style={{ color: 'var(--text-primary)' }}>{binding.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{binding.username}</td>
                  <td style={{ color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '12px' }}>{binding.ip}</td>
                  <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '11px' }}>{binding.mac || '—'}</td>
                  <td>
                    <span className="badge" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>
                      {binding.plan}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{binding.created}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{binding.expires}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{binding.router}</td>
                  <td>
                    <span className="badge badge-status-online">
                      {binding.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="btn-action btn-view flex items-center gap-1">
                        <Eye size={10} /> View
                      </button>
                      <button className="btn-action btn-edit flex items-center gap-1">
                        <Pencil size={10} /> Edit
                      </button>
                      <button className="btn-action btn-delete flex items-center gap-1">
                        <Trash2 size={10} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
                    No IP bindings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
