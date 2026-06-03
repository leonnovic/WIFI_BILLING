export interface Router {
  id: string;
  name: string;
  model: string;
  status: 'online' | 'offline';
  onlineUsers: number;
  activeUsers: number;
  expiredUsers: number;
}

export interface Customer {
  id: number;
  username: string;
  fullName: string;
  balance: string;
  phone: string;
  email: string;
  package: string;
  serviceType: 'Static' | 'Hotspot' | 'PPPoE' | 'Others';
  createdOn: string;
  ipAddress: string;
  macAddress: string;
  router: string;
}

export interface IPBinding {
  id: number;
  name: string;
  username: string;
  ip: string;
  mac: string;
  plan: string;
  created: string;
  expires: string;
  router: string;
  status: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  customer: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'open' | 'closed' | 'in_progress' | 'resolved';
  assignedTo: string;
  sla: string;
  created: string;
}

export interface StatCard {
  title: string;
  value: string;
  subtitle: string;
  link: string;
  linkText: string;
  gradient: string;
  icon: string;
}

export interface Transaction {
  username: string;
  amount: number;
  date: string;
}

export interface ServiceType {
  type: string;
  users: number;
  percentage: string;
}

export interface ActivityLog {
  time: string;
  message: string;
}

export interface ExpiringUser {
  username: string;
  createdOn: string;
  expiresOn: string;
}

export interface NavItem {
  label: string;
  icon: string;
  path?: string;
  badge?: string;
  children?: NavItem[];
}
