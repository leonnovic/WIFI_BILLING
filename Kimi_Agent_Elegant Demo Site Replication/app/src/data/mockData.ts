import type { Router, Customer, IPBinding, SupportTicket, Transaction, ServiceType, ActivityLog, ExpiringUser } from '@/types';

export const routers: Router[] = [
  { id: '1', name: 'demo1', model: 'RB4011iGS+', status: 'online', onlineUsers: 0, activeUsers: 0, expiredUsers: 1 },
  { id: '2', name: 'demo12', model: 'RB4011iGS+', status: 'online', onlineUsers: 0, activeUsers: 0, expiredUsers: 0 },
  { id: '3', name: 'demo13', model: 'RB4011iGS+', status: 'online', onlineUsers: 0, activeUsers: 0, expiredUsers: 0 },
  { id: '4', name: 'demo14', model: 'hAP lite', status: 'online', onlineUsers: 0, activeUsers: 0, expiredUsers: 0 },
  { id: '5', name: 'demo15', model: 'RB951Ui-2HnD', status: 'online', onlineUsers: 0, activeUsers: 0, expiredUsers: 0 },
  { id: '6', name: 'demo16', model: '', status: 'online', onlineUsers: 0, activeUsers: 0, expiredUsers: 0 },
  { id: '7', name: 'demo17', model: '', status: 'online', onlineUsers: 0, activeUsers: 0, expiredUsers: 0 },
];

export const customers: Customer[] = [
  { id: 1, username: 'richardo', fullName: 'Richardo electical', balance: 'KES 0', phone: '254722521187', email: '', package: '', serviceType: 'Static', createdOn: '02 Jun 2026 10:32', ipAddress: '192.168.0.154', macAddress: '', router: 'demo1' },
  { id: 2, username: '254791235319-9:88', fullName: '254791235319', balance: 'KES 0', phone: '254791235319', email: '254791235319@gmail.com', package: '', serviceType: 'Hotspot', createdOn: '02 Jun 2026 08:54', ipAddress: '', macAddress: 'D6:8C:A5:03:39:88', router: 'demo16' },
  { id: 3, username: '254791235319-6:90', fullName: '254791235319', balance: 'KES 0', phone: '254791235319', email: '254791235319@gmail.com', package: '', serviceType: 'Hotspot', createdOn: '02 Jun 2026 08:36', ipAddress: '', macAddress: '66:24:40:D1:96:90', router: 'demo16' },
  { id: 4, username: 'Sally', fullName: 'Happy Ochoki', balance: 'KES 0', phone: '254712345678', email: '', package: '', serviceType: 'PPPoE', createdOn: '02 Jun 2026 08:28', ipAddress: '', macAddress: '', router: 'demo12' },
  { id: 5, username: '0742909117', fullName: 'Benson Mwanthi', balance: 'KES 0', phone: '0742909117', email: 'bmwanthi7@gmail.com', package: '', serviceType: 'Others', createdOn: '02 Jun 2026 04:23', ipAddress: '', macAddress: '', router: '' },
  { id: 6, username: 'tori1', fullName: 'tori example', balance: 'KES 0', phone: '254701232123', email: '', package: 'PPPOE1', serviceType: 'PPPoE', createdOn: '01 Jun 2026 19:33', ipAddress: '', macAddress: '', router: 'demo1' },
  { id: 7, username: '254116170397-4:55', fullName: '254116170397', balance: 'KES 0', phone: '254116170397', email: '254116170397@gmail.com', package: '', serviceType: 'Hotspot', createdOn: '28 May 2026 04:48', ipAddress: '', macAddress: '00:11:22:33:44:55', router: 'demo13' },
  { id: 8, username: '254114558240-4:55', fullName: '254114558240', balance: 'KES 0', phone: '254114558240', email: '254114558240@gmail.com', package: '', serviceType: 'Hotspot', createdOn: '26 May 2026 21:21', ipAddress: '', macAddress: '00:11:22:33:44:55', router: 'demo13' },
  { id: 9, username: '254712345678-4:55', fullName: '254712345678', balance: 'KES 0', phone: '254712345678', email: '254712345678@gmail.com', package: '', serviceType: 'Hotspot', createdOn: '26 May 2026 21:19', ipAddress: '', macAddress: '00:11:22:33:44:55', router: 'demo13' },
  { id: 10, username: '0725794814', fullName: 'Elly Rotich', balance: 'KES 0', phone: '0725794814', email: 'ellyrotich44@gmail.com', package: '', serviceType: 'Others', createdOn: '24 May 2026 21:23', ipAddress: '', macAddress: '', router: '' },
  { id: 11, username: 'tori', fullName: 'tori example', balance: 'KES 0', phone: '254701232123', email: '', package: 'PPPOE1', serviceType: 'PPPoE', createdOn: '20 May 2026 15:10', ipAddress: '', macAddress: '', router: 'demo1' },
  { id: 12, username: 'admin', fullName: 'System Admin', balance: 'KES 0', phone: '254700000000', email: 'admin@wantech.com', package: 'ADMIN', serviceType: 'Static', createdOn: '15 May 2026 09:00', ipAddress: '192.168.0.1', macAddress: '', router: 'demo1' },
  { id: 13, username: 'testuser1', fullName: 'Test User One', balance: 'KES 0', phone: '254711111111', email: 'test1@mail.com', package: 'BASIC', serviceType: 'Hotspot', createdOn: '10 May 2026 14:30', ipAddress: '', macAddress: 'AA:BB:CC:DD:EE:01', router: 'demo14' },
  { id: 14, username: 'testuser2', fullName: 'Test User Two', balance: 'KES 0', phone: '254722222222', email: 'test2@mail.com', package: 'STANDARD', serviceType: 'PPPoE', createdOn: '05 May 2026 11:20', ipAddress: '', macAddress: '', router: 'demo15' },
  { id: 15, username: 'testuser3', fullName: 'Test User Three', balance: 'KES 0', phone: '254733333333', email: 'test3@mail.com', package: 'PREMIUM', serviceType: 'Static', createdOn: '01 May 2026 08:45', ipAddress: '192.168.0.50', macAddress: '', router: 'demo12' },
  { id: 16, username: '254744444444', fullName: 'User Four', balance: 'KES 0', phone: '254744444444', email: '', package: '', serviceType: 'Hotspot', createdOn: '25 Apr 2026 16:00', ipAddress: '', macAddress: 'AA:BB:CC:DD:EE:02', router: 'demo16' },
  { id: 17, username: '254755555555', fullName: 'User Five', balance: 'KES 0', phone: '254755555555', email: '', package: '', serviceType: 'Hotspot', createdOn: '20 Apr 2026 10:15', ipAddress: '', macAddress: 'AA:BB:CC:DD:EE:03', router: 'demo17' },
  { id: 18, username: '254766666666', fullName: 'User Six', balance: 'KES 0', phone: '254766666666', email: '', package: '', serviceType: 'Others', createdOn: '15 Apr 2026 09:30', ipAddress: '', macAddress: '', router: '' },
  { id: 19, username: '254777777777', fullName: 'User Seven', balance: 'KES 0', phone: '254777777777', email: '', package: '', serviceType: 'PPPoE', createdOn: '10 Apr 2026 13:45', ipAddress: '', macAddress: '', router: 'demo13' },
  { id: 20, username: '254788888888', fullName: 'User Eight', balance: 'KES 0', phone: '254788888888', email: '', package: '', serviceType: 'Hotspot', createdOn: '05 Apr 2026 07:20', ipAddress: '', macAddress: 'AA:BB:CC:DD:EE:04', router: 'demo14' },
];

export const ipBindings: IPBinding[] = [
  { id: 1, name: 'richardo', username: 'richardo', ip: '192.168.0.154', mac: '', plan: 'STATIC-PLAN', created: '02 Jun 2026', expires: '02 Jul 2026', router: 'demo1', status: 'Active' },
  { id: 2, name: '254791235319', username: '254791235319', ip: '192.168.1.100', mac: 'D6:8C:A5:03:39:88', plan: 'HOTSPOT-1D', created: '02 Jun 2026', expires: '03 Jun 2026', router: 'demo16', status: 'Active' },
  { id: 3, name: 'tori1', username: 'tori1', ip: '192.168.0.50', mac: '', plan: 'PPPOE1', created: '01 Jun 2026', expires: '01 Jul 2026', router: 'demo1', status: 'Active' },
  { id: 4, name: 'Sally', username: 'Sally', ip: '192.168.2.30', mac: '', plan: 'PPPOE-STANDARD', created: '02 Jun 2026', expires: '02 Jul 2026', router: 'demo12', status: 'Active' },
  { id: 5, name: 'testuser2', username: 'testuser2', ip: '192.168.3.45', mac: '', plan: 'STANDARD', created: '05 May 2026', expires: '05 Jun 2026', router: 'demo15', status: 'Expired' },
  { id: 6, name: 'admin', username: 'admin', ip: '192.168.0.1', mac: '', plan: 'ADMIN-PLAN', created: '15 May 2026', expires: 'Never', router: 'demo1', status: 'Active' },
];

export const supportTickets: SupportTicket[] = [
  { id: '287234044', subject: 'Mlos', customer: 'Peter Gitonga', priority: 'High', status: 'open', assignedTo: 'DANIEL PAUL MUWONGE', sla: 'Response Overdue', created: 'Thu, 14 May 2026 07:18 PM' },
  { id: '737955187', subject: 'H', customer: 'TABARAK BLOG', priority: 'Low', status: 'closed', assignedTo: 'James Kephasho', sla: 'On Track', created: 'Thu, 26 Mar 2026 08:28 PM' },
  { id: '665251906', subject: 'LOS', customer: 'S M Ratul Islam', priority: 'Medium', status: 'in_progress', assignedTo: 'Unassigned', sla: 'On Track', created: 'Sat, 21 Feb 2026 01:47 PM' },
  { id: '696253604', subject: 'test', customer: '', priority: 'Low', status: 'open', assignedTo: 'Unassigned', sla: 'On Track', created: 'Wed, 23 Jul 2025 07:30 PM' },
  { id: '001078630', subject: 'cds', customer: '', priority: 'Low', status: 'resolved', assignedTo: 'Unassigned', sla: 'On Track', created: 'Fri, 13 Jun 2025 06:27 PM' },
  { id: '668026863', subject: 'I CANT BUY BALANCE', customer: '', priority: 'High', status: 'in_progress', assignedTo: 'Unassigned', sla: 'On Track', created: 'Wed, 23 Apr 2025 08:07 PM' },
  { id: '611179324', subject: 'network down', customer: '', priority: 'High', status: 'in_progress', assignedTo: 'Unassigned', sla: 'On Track', created: 'Sat, 25 Jan 2025 12:55 PM' },
  { id: '822117265', subject: 'Gianluca', customer: '', priority: 'Low', status: 'closed', assignedTo: 'Unassigned', sla: 'On Track', created: 'Thu, 23 Jan 2025 09:41 AM' },
  { id: '459448987', subject: 'not able to install cpanel', customer: '', priority: 'Low', status: 'open', assignedTo: 'Unassigned', sla: 'On Track', created: 'Sun, 08 Dec 2024 04:40 PM' },
  { id: '519732718', subject: 'TEST', customer: '', priority: 'High', status: 'closed', assignedTo: 'Unassigned', sla: 'On Track', created: 'Thu, 21 Nov 2024 07:49 AM' },
  { id: '123456789', subject: 'Internet slow', customer: 'John Doe', priority: 'Medium', status: 'open', assignedTo: 'Unassigned', sla: 'On Track', created: 'Mon, 01 Jun 2026 10:00 AM' },
  { id: '987654321', subject: 'Cannot connect', customer: 'Jane Smith', priority: 'High', status: 'in_progress', assignedTo: 'DANIEL PAUL MUWONGE', sla: 'Response Overdue', created: 'Sun, 31 May 2026 03:30 PM' },
];

export const transactions: Transaction[] = [
  { username: 'tori1', amount: 2, date: '2026-06-01' },
  { username: 'tori1', amount: 2, date: '2026-06-01' },
  { username: 'tori1', amount: 2, date: '2026-06-01' },
  { username: 'tori1', amount: 1, date: '2026-06-01' },
  { username: 'tori', amount: 1, date: '2026-06-01' },
];

export const serviceTypes: ServiceType[] = [
  { type: 'PPPoE', users: 9, percentage: '23.08%' },
  { type: 'Static', users: 2, percentage: '5.13%' },
  { type: 'Hotspot', users: 16, percentage: '41.03%' },
  { type: 'Others', users: 12, percentage: '30.77%' },
];

export const activityLogs: ActivityLog[] = [
  { time: '1 hour, 48 minutes, 37 seconds ago', message: 'Pool deleted: expired_pppoe_pool (192.168.178.5-192.168.178.254) on demo36' },
  { time: '3 hours, 25 seconds ago', message: '[admin]: Page Builder - Updated global settings on theme #16 (fields: page_template, business_name, phone, instagram_url, facebook_url, tiktok_url, fonts, colors, spacing, package_tabs_enabled)' },
  { time: '3 hours, 25 seconds ago', message: '[admin]: Page Builder - Reset all block styles on theme #16 (template: sport_energy)' },
  { time: '4 hours, 39 minutes, 4 seconds ago', message: 'Pool deleted: expired_pppoe_pool (192.168.178.5-192.168.178.254) on demo22' },
  { time: '4 hours, 44 minutes, 15 seconds ago', message: 'Pool deleted: expired_pppoe_pool (192.168.178.5-192.168.178.254) on demo5' },
];

export const expiringUsers: ExpiringUser[] = [
  { username: 'tori1', createdOn: '01 Jun 2026 22:33', expiresOn: '01 Jun 2026 22:39' },
];

export const monthlyCustomerData = [
  { month: 'Jan', customers: 5 },
  { month: 'Feb', customers: 8 },
  { month: 'Mar', customers: 12 },
  { month: 'Apr', customers: 15 },
  { month: 'May', customers: 18 },
  { month: 'Jun', customers: 39 },
];

export const monthlySalesData = [
  { month: 'Jan', sales: 0 },
  { month: 'Feb', sales: 0 },
  { month: 'Mar', sales: 0 },
  { month: 'Apr', sales: 0 },
  { month: 'May', sales: 2 },
  { month: 'Jun', sales: 9 },
];

export const bestSellingPackages = [
  { package: 'PPPOE1', price: 'KES 2.00', sales: 1, revenue: 'KES 2.00' },
];

export const transactionsPerRouter = [
  { router: 'demo1', transactions: 1, percentage: '100%', amount: 'KES 2.00' },
];
