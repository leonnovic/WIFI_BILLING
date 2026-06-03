import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Search, Eye, Inbox, Clock, AlertTriangle,
  CheckCircle, XCircle, ChevronLeft, ChevronRight, Filter
} from 'lucide-react';
import { supportTickets } from '@/data/mockData';

type StatusFilter = 'all' | 'open' | 'in_progress' | 'escalated' | 'resolved' | 'closed';
type PriorityFilter = 'all' | 'High' | 'Medium' | 'Low';

const statusFilters: { key: StatusFilter; label: string; icon: React.ReactNode; count: number }[] = [
  { key: 'all', label: 'All', icon: <Inbox size={12} />, count: 12 },
  { key: 'open', label: 'Open', icon: <Clock size={12} />, count: 3 },
  { key: 'in_progress', label: 'In Progress', icon: <Clock size={12} />, count: 4 },
  { key: 'escalated', label: 'Escalated', icon: <AlertTriangle size={12} />, count: 0 },
  { key: 'resolved', label: 'Resolved', icon: <CheckCircle size={12} />, count: 1 },
  { key: 'closed', label: 'Closed', icon: <XCircle size={12} />, count: 4 },
];

const priorityFilters: { key: PriorityFilter; label: string; color: string; count: number }[] = [
  { key: 'all', label: 'All', color: '#8b949e', count: 12 },
  { key: 'High', label: 'High', color: '#ef4444', count: 5 },
  { key: 'Medium', label: 'Medium', color: '#f59e0b', count: 2 },
  { key: 'Low', label: 'Low', color: '#3b82f6', count: 5 },
];

export default function SupportTickets() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const filtered = useMemo(() => {
    let result = supportTickets;

    if (statusFilter !== 'all') {
      result = result.filter((t) => t.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.id.toLowerCase().includes(s) ||
          t.subject.toLowerCase().includes(s) ||
          t.customer.toLowerCase().includes(s) ||
          t.assignedTo.toLowerCase().includes(s)
      );
    }

    return result;
  }, [statusFilter, priorityFilter, search]);

  const totalPages = Math.ceil(filtered.length / entriesPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Support Ticket</h1>
          <div className="flex items-center gap-1 text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            <Link to="/" className="no-underline hover:underline" style={{ color: 'var(--accent-blue)' }}>Dashboard</Link>
            <span>&gt;</span>
            <span>Support Ticket</span>
          </div>
        </div>
        <button className="flex items-center gap-1 px-4 py-2 rounded text-xs font-medium" style={{ background: 'var(--accent-blue)', color: 'white' }}>
          <Plus size={14} /> Create Ticket
        </button>
      </div>

      <div className="flex gap-4">
        {/* Filters Sidebar */}
        <div className="w-[250px] shrink-0 space-y-4">
          {/* Status */}
          <div className="card-dark p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Status</span>
              <Filter size={14} style={{ color: 'var(--text-muted)' }} />
            </div>
            <div className="space-y-0.5">
              {statusFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => { setStatusFilter(filter.key); setCurrentPage(1); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs transition-colors"
                  style={{
                    background: statusFilter === filter.key ? 'var(--sidebar-active)' : 'transparent',
                    color: statusFilter === filter.key ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>{filter.icon}</span>
                  <span className="flex-1 text-left">{filter.label}</span>
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
                    style={{
                      background: filter.count > 0 ? 'var(--card-border)' : 'transparent',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="card-dark p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Priority</span>
              <Filter size={14} style={{ color: 'var(--text-muted)' }} />
            </div>
            <div className="space-y-0.5">
              {priorityFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => { setPriorityFilter(filter.key); setCurrentPage(1); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs transition-colors"
                  style={{
                    background: priorityFilter === filter.key ? 'var(--sidebar-active)' : 'transparent',
                    color: priorityFilter === filter.key ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  <span style={{ color: filter.color }}>●</span>
                  <span className="flex-1 text-left">{filter.label}</span>
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
                    style={{
                      background: filter.count > 0 ? 'var(--card-border)' : 'transparent',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--card-border)' }}>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs" style={{ color: 'var(--text-muted)' }}>
                <Inbox size={12} /> Unread
                <span className="ml-auto text-[10px]">0</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="flex-1 card-dark">
          <div className="section-header-bar">
            <h3>Tickets List</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search Tickets"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="py-1.5 pl-8 pr-3 text-xs rounded outline-none"
                  style={{
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--text-primary)',
                    width: '180px',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Total: {filtered.length}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 rounded text-xs disabled:opacity-30"
                  style={{ background: 'var(--card-border)', color: 'var(--text-secondary)' }}
                >
                  <ChevronLeft size={12} />
                </button>
                {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1).slice(0, 5).map((page) => (
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
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>TICKET ID</th>
                    <th>SUBJECT</th>
                    <th>CUSTOMER</th>
                    <th>PRIORITY</th>
                    <th>STATUS</th>
                    <th>ASSIGNED TO</th>
                    <th>SLA</th>
                    <th>CREATED</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>
                        <Link
                          to={`/tickets/${ticket.id}`}
                          className="no-underline font-medium"
                          style={{ color: 'var(--accent-blue)' }}
                        >
                          {ticket.id}
                        </Link>
                      </td>
                      <td style={{ color: 'var(--text-primary)' }}>
                        <div>{ticket.subject}</div>
                        <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Technical Team</div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>
                        {ticket.customer ? (
                          <Link to={`/customers/${ticket.customer}`} className="no-underline" style={{ color: 'var(--accent-blue)' }}>
                            {ticket.customer}
                          </Link>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>
                        <span className={`badge badge-priority-${ticket.priority.toLowerCase()}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-status-${ticket.status}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{ticket.assignedTo}</td>
                      <td>
                        {ticket.sla === 'Response Overdue' ? (
                          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--accent-red)' }}>
                            <AlertTriangle size={10} /> Response Overdue
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--accent-green)' }}>
                            <CheckCircle size={10} /> On Track
                          </span>
                        )}
                      </td>
                      <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{ticket.created}</td>
                      <td>
                        <Link
                          to={`/tickets/${ticket.id}`}
                          className="btn-action btn-view flex items-center gap-1 no-underline"
                        >
                          <Eye size={10} /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={9} className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
                        No tickets found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs" style={{ color: 'var(--footer-text)' }}>
        Support Ticket | Ver: 2.0 | by: FreeIspRadius
      </div>
    </div>
  );
}
