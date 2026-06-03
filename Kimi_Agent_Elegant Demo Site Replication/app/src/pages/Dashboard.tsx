import { Link } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, BarChart3, User, Users, Wifi,
  Plug, Radio, CheckCircle, XCircle, Circle, Eye, ArrowRight,
  ChevronDown, Activity, X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { routers, transactions, serviceTypes, activityLogs, expiringUsers, monthlyCustomerData, monthlySalesData, bestSellingPackages, transactionsPerRouter } from '@/data/mockData';

function StatCard({ value, subtitle, link, linkText, gradientClass, icon }: {
  title: string; value: string; subtitle: string; link: string; linkText: string;
  gradientClass: string; icon: React.ReactNode;
}) {
  return (
    <div className={`stat-card-gradient ${gradientClass}`}>
      <div className="stat-icon">{icon}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-xs font-medium uppercase tracking-wider opacity-90 mb-1 flex items-center gap-1">
        {subtitle} <Eye size={12} className="opacity-60" />
      </div>
      <div className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
        <Link to={link} className="text-xs opacity-80 hover:opacity-100 flex items-center gap-1 no-underline" style={{ color: 'white' }}>
          {linkText} <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

function SectionHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="section-header-bar">
      <div className="flex items-center gap-2">
        <LayoutDashboard size={16} className="text-white/70" />
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const onlineRouters = routers.filter((r) => r.status === 'online').length;
  const offlineRouters = routers.filter((r) => r.status === 'offline').length;

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>

      {/* Router View */}
      <div className="card-dark">
        <SectionHeader title="Router View">
          <select
            className="text-sm rounded px-3 py-1.5 outline-none"
            style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }}
          >
            <option>All Routers - System Wide</option>
            {routers.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name} ({r.onlineUsers} online, {r.activeUsers} active)
              </option>
            ))}
          </select>
        </SectionHeader>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {routers.map((router) => (
            <div
              key={router.id}
              className="rounded-lg p-3 transition-colors hover:bg-white/5"
              style={{ background: 'var(--content-bg)', border: '1px solid var(--card-border)' }}
            >
              <Link
                to={`/routers/${router.id}`}
                className="text-sm font-medium no-underline block mb-2"
                style={{ color: 'var(--accent-blue)' }}
              >
                {router.name}
              </Link>
              <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="flex items-center gap-1">
                  <Circle size={8} className="text-green-500 fill-green-500" /> {router.onlineUsers}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle size={8} className="text-blue-400" /> {router.activeUsers}
                </span>
                <span className="flex items-center gap-1">
                  <XCircle size={8} className="text-red-400" /> {router.expiredUsers}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stat Cards Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Income Today"
          value="KES 0"
          subtitle="INCOME TODAY"
          link="/reports/by-date"
          linkText="View Reports"
          gradientClass="gradient-blue"
          icon={<ShoppingBag size={22} className="text-white/60" />}
        />
        <StatCard
          title="Income This Month"
          value="KES 9"
          subtitle="INCOME THIS MONTH"
          link="/reports/by-period"
          linkText="View Reports"
          gradientClass="gradient-green"
          icon={<BarChart3 size={22} className="text-white/60" />}
        />
        <StatCard
          title="Active/Expired"
          value="0/1"
          subtitle="ACTIVE/EXPIRED"
          link="/customers"
          linkText="View All"
          gradientClass="gradient-orange"
          icon={<User size={22} className="text-white/60" />}
        />
        <StatCard
          title="Total Users"
          value="39"
          subtitle="TOTAL USERS"
          link="/customers"
          linkText="View All"
          gradientClass="gradient-red"
          icon={<Users size={22} className="text-white/60" />}
        />
      </div>

      {/* Stat Cards Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Hotspot Online Users"
          value="0"
          subtitle="HOTSPOT ONLINE USERS"
          link="/online/hotspot"
          linkText="View All"
          gradientClass="gradient-teal"
          icon={<Wifi size={22} className="text-white/60" />}
        />
        <StatCard
          title="PPPoE Online Users"
          value="0"
          subtitle="PPPOE ONLINE USERS"
          link="/online/pppoe"
          linkText="View All"
          gradientClass="gradient-purple"
          icon={<Plug size={22} className="text-white/60" />}
        />
        <StatCard
          title="Static Online Users"
          value="0"
          subtitle="STATIC ONLINE USERS"
          link="/online/static"
          linkText="View All"
          gradientClass="gradient-cyan"
          icon={<Radio size={22} className="text-white/60" />}
        />
        <StatCard
          title="Total Online Users"
          value="0"
          subtitle="TOTAL ONLINE USERS"
          link="/online"
          linkText="View All"
          gradientClass="gradient-orange"
          icon={<Users size={22} className="text-white/60" />}
        />
      </div>

      {/* Router Status */}
      <div className="card-dark">
        <SectionHeader title="Router Status">
          <div className="flex items-center gap-2">
            <span className="badge badge-status-online">
              <CheckCircle size={10} /> {onlineRouters} Online
            </span>
            <span className="badge" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>
              <XCircle size={10} /> {offlineRouters} Offline
            </span>
          </div>
        </SectionHeader>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {routers.map((router) => (
            <div
              key={router.id}
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{
                background: 'var(--content-bg)',
                border: '1px solid var(--card-border)',
                borderLeft: `3px solid ${router.status === 'online' ? 'var(--status-online)' : 'var(--status-offline)'}`,
              }}
            >
              <CheckCircle
                size={18}
                className={router.status === 'online' ? 'text-green-500' : 'text-red-500'}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                  {router.name}
                </div>
                <div className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>
                  {router.status}
                </div>
              </div>
              {router.model && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded"
                  style={{ background: 'var(--card-border)', color: 'var(--text-muted)' }}
                >
                  {router.model}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Registered Customers */}
        <div className="card-dark">
          <SectionHeader title="Monthly Registered Customers">
            <div className="flex items-center gap-1">
              <button className="p-1 rounded hover:bg-white/10 text-white/60">
                <ChevronDown size={14} className="rotate-180" />
              </button>
              <button className="p-1 rounded hover:bg-white/10 text-white/60">
                <X size={14} />
              </button>
            </div>
          </SectionHeader>
          <div className="p-4" style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyCustomerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
                <YAxis tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
                <Tooltip
                  contentStyle={{
                    background: '#161b22',
                    border: '1px solid #21262d',
                    borderRadius: '6px',
                    color: '#e6edf3',
                  }}
                />
                <Bar dataKey="customers" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Monthly Sales */}
        <div className="card-dark">
          <div className="section-header-bar">
            <div>
              <h3>Total Monthly Sales</h3>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Payment Gateway: BankStkPush</div>
            </div>
          </div>
          <div className="p-4" style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
                <YAxis tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
                <Tooltip
                  contentStyle={{
                    background: '#161b22',
                    border: '1px solid #21262d',
                    borderRadius: '6px',
                    color: '#e6edf3',
                  }}
                />
                <Area type="monotone" dataKey="sales" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Usage & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today's Data Usage */}
        <div className="card-dark">
          <SectionHeader title="Today's Data Usage" />
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg" style={{ background: 'var(--content-bg)' }}>
                <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Upload</div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>0 B</div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ background: 'var(--content-bg)' }}>
                <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Download</div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>0 B</div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ background: 'var(--content-bg)' }}>
                <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Total</div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>0 B</div>
              </div>
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Date: 2026-06-03</div>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1 rounded" style={{ background: 'var(--accent-blue)', color: 'white' }}>Weekly</button>
              <button className="text-xs px-3 py-1 rounded" style={{ background: 'var(--card-border)', color: 'var(--text-secondary)' }}>Monthly</button>
            </div>
          </div>
        </div>

        {/* All Users Insights */}
        <div className="card-dark lg:col-span-2">
          <SectionHeader title="All Users Insights" />
          <div className="p-4 space-y-4">
            {/* Best Selling Packages */}
            <div>
              <h4 className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>Best Selling Packages Per Month</h4>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Package</th>
                    <th>Price</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSellingPackages.map((pkg, i) => (
                    <tr key={i}>
                      <td style={{ color: 'var(--text-primary)' }}>{pkg.package}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{pkg.price}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{pkg.sales}</td>
                      <td style={{ color: 'var(--text-primary)' }}>{pkg.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Transactions per Router */}
            <div>
              <h4 className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>Transactions per Router</h4>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Router</th>
                    <th>Transactions</th>
                    <th>Percentage</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsPerRouter.map((t, i) => (
                    <tr key={i}>
                      <td style={{ color: 'var(--text-primary)' }}>{t.router}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{t.transactions}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{t.percentage}</td>
                      <td style={{ color: 'var(--text-primary)' }}>{t.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Last 5 Transactions */}
            <div>
              <h4 className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>Last 5 Transactions</h4>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, i) => (
                    <tr key={i}>
                      <td style={{ color: 'var(--text-primary)' }}>{t.username}</td>
                      <td style={{ color: 'var(--text-primary)' }}>{t.amount}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Users by Service Type */}
            <div>
              <h4 className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>Users by Service Type</h4>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Service Type</th>
                    <th>Users</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceTypes.map((st, i) => (
                    <tr key={i}>
                      <td style={{ color: 'var(--text-primary)' }}>{st.type}</td>
                      <td style={{ color: 'var(--text-primary)' }}>{st.users}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{st.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Users Expiring Today */}
      <div className="card-dark">
        <SectionHeader title="Users Expiring Today" />
        <div className="p-4">
          <table className="data-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Created On</th>
                <th>Expires On</th>
              </tr>
            </thead>
            <tbody>
              {expiringUsers.map((u, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/customers/${u.username}`} className="no-underline" style={{ color: 'var(--accent-blue)' }}>
                      {u.username}
                    </Link>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{u.createdOn}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{u.expiresOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-3">
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Showing 1 to 1 of 1 entries</div>
            <div className="flex gap-1">
              <button className="px-2 py-1 rounded text-xs" style={{ background: 'var(--card-border)', color: 'var(--text-muted)' }} disabled>Previous</button>
              <button className="px-2 py-1 rounded text-xs" style={{ background: 'var(--accent-blue)', color: 'white' }}>1</button>
              <button className="px-2 py-1 rounded text-xs" style={{ background: 'var(--card-border)', color: 'var(--text-muted)' }} disabled>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="card-dark">
        <div className="section-header-bar">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-white/70" />
            <h3>Activity Log</h3>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {activityLogs.map((log, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="shrink-0 text-xs" style={{ color: 'var(--accent-blue)' }}>{log.time}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs" style={{ color: 'var(--footer-text)' }}>
        Billing Software by{' '}
        <a href="https://FreeIspRadius.com" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: 'var(--accent-blue)' }}>
          FreeIspRadius
        </a>
        , Theme by{' '}
        <a href="https://adminlte.io/" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: 'var(--accent-blue)' }}>
          AdminLTE
        </a>
      </div>
    </div>
  );
}
