import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, UserCheck, UserX, Wifi, Radio, Plug, UserPlus,
  Search, Download, ChevronLeft, ChevronRight, HelpCircle
} from 'lucide-react';
import { customers } from '@/data/mockData';

type UserTab = 'all' | 'active' | 'expired' | 'hotspot' | 'static' | 'pppoe' | 'new';

const tabs: { key: UserTab; label: string; icon: React.ReactNode }[] = [
  { key: 'all', label: 'All Users', icon: <Users size={14} /> },
  { key: 'active', label: 'Active Users', icon: <UserCheck size={14} /> },
  { key: 'expired', label: 'Expired Users', icon: <UserX size={14} /> },
  { key: 'hotspot', label: 'Hotspot Users', icon: <Wifi size={14} /> },
  { key: 'static', label: 'Static Users', icon: <Radio size={14} /> },
  { key: 'pppoe', label: 'PPPoE Users', icon: <Plug size={14} /> },
  { key: 'new', label: 'New Users', icon: <UserPlus size={14} /> },
];

export default function Customers() {
  const [activeTab, setActiveTab] = useState<UserTab>('all');
  const [search, setSearch] = useState('');
  const [routerFilter, setRouterFilter] = useState('All Routers');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCustomers = useMemo(() => {
    let filtered = customers;

    // Tab filter
    if (activeTab !== 'all') {
      const typeMap: Record<string, string> = {
        hotspot: 'Hotspot',
        static: 'Static',
        pppoe: 'PPPoE',
      };
      if (typeMap[activeTab]) {
        filtered = filtered.filter((c) => c.serviceType === typeMap[activeTab]);
      }
    }

    // Search filter
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.username.toLowerCase().includes(s) ||
          c.fullName.toLowerCase().includes(s) ||
          c.phone.includes(s) ||
          c.email.toLowerCase().includes(s) ||
          c.macAddress.toLowerCase().includes(s) ||
          c.ipAddress.includes(s)
      );
    }

    // Router filter
    if (routerFilter !== 'All Routers') {
      filtered = filtered.filter((c) => c.router === routerFilter);
    }

    return filtered;
  }, [activeTab, search, routerFilter]);

  const totalPages = Math.ceil(filteredCustomers.length / entriesPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const uniqueRouters = ['All Routers', ...Array.from(new Set(customers.map((c) => c.router).filter(Boolean)))];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Customer</h1>

      {/* Tabs */}
      <div className="card-dark">
        <div className="section-header-bar">
          <h3>All Users</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium" style={{ background: 'var(--accent-green)', color: 'white' }}>
              <HelpCircle size={12} /> Need Help?
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-0" style={{ borderBottom: '1px solid var(--card-border)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors"
              style={{
                color: activeTab === tab.key ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: activeTab === tab.key ? 'var(--sidebar-active)' : 'transparent',
                borderBottom: activeTab === tab.key ? '2px solid var(--accent-blue)' : '2px solid transparent',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="p-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[250px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by mac address, name, ip, username, email"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full py-2 pl-9 pr-3 text-sm rounded outline-none"
              style={{
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <select
            value={routerFilter}
            onChange={(e) => { setRouterFilter(e.target.value); setCurrentPage(1); }}
            className="text-sm rounded px-3 py-2 outline-none"
            style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }}
          >
            {uniqueRouters.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="text-sm rounded px-2 py-1.5 outline-none"
              style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>entries</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Link
              to="/customers/import"
              className="flex items-center gap-1 px-3 py-2 rounded text-xs font-medium no-underline"
              style={{ background: 'var(--accent-blue)', color: 'white' }}
            >
              <Download size={12} /> Import Users
            </Link>
            <Link
              to="/customers/add"
              className="flex items-center gap-1 px-3 py-2 rounded text-xs font-medium no-underline"
              style={{ background: 'var(--accent-blue)', color: 'white' }}
            >
              <UserPlus size={12} /> Add New Contact
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Balance</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Package</th>
                <th>Service Type</th>
                <th>Created On</th>
                <th>IP Address</th>
                <th>MAC Address</th>
                <th>Router</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer, index) => (
                <tr key={customer.id}>
                  <td style={{ color: 'var(--text-muted)' }}>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                  <td style={{ color: 'var(--text-primary)' }}>{customer.username}</td>
                  <td style={{ color: 'var(--text-primary)' }}>{customer.fullName}</td>
                  <td>
                    <span style={{ color: 'var(--text-primary)' }}>{customer.balance}</span>
                    <button className="ml-1 text-xs" style={{ color: 'var(--accent-blue)' }}>Edit</button>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{customer.phone}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{customer.email || '—'}</td>
                  <td>
                    {customer.package ? (
                      <span className="badge" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>{customer.package}</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>—</span>
                    )}
                  </td>
                  <td>
                    <span className="badge" style={{
                      background: customer.serviceType === 'Hotspot' ? 'rgba(245,158,11,0.15)' :
                        customer.serviceType === 'Static' ? 'rgba(59,130,246,0.15)' :
                          customer.serviceType === 'PPPoE' ? 'rgba(139,92,246,0.15)' :
                            'rgba(107,114,128,0.15)',
                      color: customer.serviceType === 'Hotspot' ? '#f59e0b' :
                        customer.serviceType === 'Static' ? '#3b82f6' :
                          customer.serviceType === 'PPPoE' ? '#8b5cf6' : '#6b7280',
                    }}>
                      {customer.serviceType}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{customer.createdOn}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{customer.ipAddress || '—'}</td>
                  <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '11px' }}>{customer.macAddress || '—'}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{customer.router || '—'}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Link to={`/customers/view/${customer.id}`} className="btn-action btn-view no-underline">View</Link>
                      <Link to={`/customers/recharge/${customer.id}`} className="btn-action btn-recharge no-underline">Recharge</Link>
                      <Link to={`/customers/edit/${customer.id}`} className="btn-action btn-edit no-underline">Edit</Link>
                      <button className="btn-action btn-delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedCustomers.length === 0 && (
                <tr>
                  <td colSpan={13} className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-between">
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, filteredCustomers.length)} of {filteredCustomers.length} entries
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded text-xs disabled:opacity-30"
              style={{ background: 'var(--card-border)', color: 'var(--text-secondary)' }}
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className="px-2.5 py-1 rounded text-xs font-medium"
                style={{
                  background: currentPage === page ? 'var(--accent-blue)' : 'var(--card-border)',
                  color: currentPage === page ? 'white' : 'var(--text-secondary)',
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded text-xs disabled:opacity-30"
              style={{ background: 'var(--card-border)', color: 'var(--text-secondary)' }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
