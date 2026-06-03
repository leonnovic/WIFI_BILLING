import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import IPBindings from './pages/IPBindings';
import SupportTickets from './pages/SupportTickets';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/add" element={<Customers />} />
        <Route path="/customers/:id" element={<Customers />} />
        <Route path="/ipbindings" element={<IPBindings />} />
        <Route path="/ipbindings/active" element={<IPBindings />} />
        <Route path="/ipbindings/expired" element={<IPBindings />} />
        <Route path="/tickets" element={<SupportTickets />} />
        <Route path="/tickets/:id" element={<SupportTickets />} />
      </Route>
    </Routes>
  );
}
