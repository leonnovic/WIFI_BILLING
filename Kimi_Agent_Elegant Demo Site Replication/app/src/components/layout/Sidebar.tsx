import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Star, Users, Zap, BarChart3, Wifi, Ticket, Bell,
  Network, MapPin, List, Globe, FileText, Settings, Gift, HelpCircle,
  Trash2, ChevronRight, ChevronDown, Sparkles, WifiIcon, Router,
  CreditCard, MessageSquare, Radio, Monitor, Server, Plug,
  ScrollText, Heart, Package, LogOut
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  badge?: string;
  children?: { label: string; path: string; icon?: React.ReactNode }[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard size={16} />, path: '/' },
  { label: 'Favorites', icon: <Star size={16} />, badge: 'New' },
  {
    label: 'Customers',
    icon: <Users size={16} />,
    children: [
      { label: 'Add New User', path: '/customers/add' },
      { label: 'Users', path: '/customers' },
      { label: "User's Location", path: '/customers/map' },
    ],
  },
  { label: 'Activation', icon: <Zap size={16} /> },
  { label: 'Data Usage', icon: <BarChart3 size={16} /> },
  { label: 'Hotspot Vouchers', icon: <Ticket size={16} /> },
  {
    label: 'Hotspot Binding',
    icon: <Wifi size={16} />,
    children: [
      { label: 'All Bindings', path: '/ipbindings' },
      { label: 'Active Bindings', path: '/ipbindings/active' },
      { label: 'Expired Bindings', path: '/ipbindings/expired' },
      { label: 'Bind a User/Device', path: '/ipbindings/bind' },
      { label: 'Create Binding Speeds', path: '/ipbindings/speeds' },
    ],
  },
  { label: 'Packages/Plans', icon: <Package size={16} /> },
  { label: 'Transactions', icon: <CreditCard size={16} /> },
  { label: 'Support Ticket', icon: <MessageSquare size={16} />, path: '/tickets' },
  { label: 'Notifications', icon: <Bell size={16} /> },
  {
    label: 'Network',
    icon: <Network size={16} />,
  },
  { label: 'Network Discovery', icon: <MapPin size={16} /> },
  {
    label: 'Bulk Actions',
    icon: <List size={16} />,
  },
  {
    label: 'Radius',
    icon: <Radio size={16} />,
  },
  {
    label: 'Static Pages',
    icon: <FileText size={16} />,
  },
  { label: 'TR069 ACS', icon: <Monitor size={16} /> },
  {
    label: 'Device Access',
    icon: <Server size={16} />,
  },
  {
    label: 'Access Points',
    icon: <WifiIcon size={16} />,
  },
  {
    label: 'Settings',
    icon: <Settings size={16} />,
    badge: 'New',
    children: [
      { label: 'PPPoE Settings', path: '/settings/pppoe' },
      { label: 'Hotspot Settings', path: '/settings/hotspot' },
      { label: 'Page Builder', path: '/settings/pagebuilder' },
      { label: 'Loyalty Points', path: '/settings/loyalty' },
      { label: 'Extras', path: '/settings/extras' },
      { label: 'Inventory & Expenses', path: '/settings/inventory' },
      { label: 'Uisp', path: '/settings/uisp' },
      { label: 'Logs', path: '/settings/logs' },
      { label: 'Social Spot/Support', path: '/settings/social' },
      { label: 'Fix Hotspot', path: '/settings/fixhotspot' },
      { label: 'Recycle Bin', path: '/settings/recycle' },
    ],
  },
  {
    label: 'PPPoE Settings',
    icon: <Plug size={16} />,
    badge: 'New',
  },
  { label: 'Hotspot Settings', icon: <Wifi size={16} /> },
  { label: 'Page Builder', icon: <LayoutDashboard size={16} /> },
  { label: 'Loyalty Points', icon: <Heart size={16} /> },
  { label: 'Extras', icon: <Gift size={16} /> },
  { label: 'Inventory & Expenses', icon: <ScrollText size={16} /> },
  { label: 'Uisp', icon: <Globe size={16} /> },
  { label: 'Logs', icon: <ScrollText size={16} /> },
  { label: 'Social Spot/Support', icon: <HelpCircle size={16} /> },
  { label: 'Fix Hotspot', icon: <Wifi size={16} />, badge: 'New' },
  { label: 'Recycle Bin', icon: <Trash2 size={16} /> },
];

export default function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'Customers': true,
    'Hotspot Binding': true,
    'Settings': false,
  });

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col overflow-y-auto"
      style={{
        width: 'var(--sidebar-width)',
        background: 'var(--sidebar-bg)',
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2 px-4 shrink-0"
        style={{
          height: 'var(--header-height)',
          borderBottom: '1px solid var(--card-border)',
        }}
      >
        <Sparkles size={20} className="text-blue-400" />
        <Link to="/" className="text-white font-semibold text-lg tracking-wide no-underline">
          WANTECH
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2 px-2">
        {navItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems[item.label];

          return (
            <div key={item.label}>
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="nav-item w-full text-left"
                    style={{
                      background: isExpanded ? 'var(--sidebar-active)' : 'transparent',
                    }}
                  >
                    {item.icon}
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="badge badge-new mr-2">{item.badge}</span>
                    )}
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                  {isExpanded && item.children && (
                    <div className="ml-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.path || child.label}
                          to={child.path || '#'}
                          className={`nav-item ${isActive(child.path) ? 'active' : ''}`}
                        >
                          {child.icon || <Router size={14} />}
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path || '#'}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  style={{
                    borderLeft: isActive(item.path) ? '3px solid var(--accent-blue)' : '3px solid transparent',
                  }}
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {item.badge && <span className="badge badge-new">{item.badge}</span>}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 shrink-0" style={{ borderTop: '1px solid var(--card-border)' }}>
        <button className="nav-item w-full text-left text-red-400 hover:text-red-300">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
