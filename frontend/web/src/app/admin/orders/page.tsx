'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ordersService } from '@/services';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock orders data
  const mockOrders = [
    { id: 'AO-001234', customer: 'John Doe', email: 'john@example.com', date: '2024-01-15', total: 2247, items: 2, status: 'Delivered' },
    { id: 'AO-001233', customer: 'Jane Smith', email: 'jane@example.com', date: '2024-01-15', total: 1560, items: 1, status: 'Shipped' },
    { id: 'AO-001232', customer: 'Mike Johnson', email: 'mike@example.com', date: '2024-01-14', total: 890, items: 3, status: 'Processing' },
    { id: 'AO-001231', customer: 'Emily Brown', email: 'emily@example.com', date: '2024-01-14', total: 3420, items: 2, status: 'Delivered' },
    { id: 'AO-001230', customer: 'Alex Wilson', email: 'alex@example.com', date: '2024-01-13', total: 1290, items: 1, status: 'Shipped' },
    { id: 'AO-001229', customer: 'Sarah Davis', email: 'sarah@example.com', date: '2024-01-13', total: 4560, items: 4, status: 'Pending' },
    { id: 'AO-001228', customer: 'Chris Lee', email: 'chris@example.com', date: '2024-01-12', total: 760, items: 1, status: 'Cancelled' },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await ordersService.getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const displayOrders = orders.length > 0 ? orders : mockOrders;

  const filteredOrders = displayOrders.filter((order: any) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-500/10 text-green-400';
      case 'shipped': return 'bg-blue-500/10 text-blue-400';
      case 'processing': return 'bg-yellow-500/10 text-yellow-400';
      case 'pending': return 'bg-orange-500/10 text-orange-400';
      case 'cancelled': return 'bg-red-500/10 text-red-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await ordersService.updateStatus(orderId, { status: newStatus as any });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Orders</h1>
            <p className="text-gray-500 text-sm mt-1">Manage customer orders</p>
          </div>
          <button className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export Orders
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'All Orders', count: displayOrders.length, color: 'bg-gray-500/10 text-gray-400' },
            { label: 'Pending', count: displayOrders.filter(o => o.status === 'Pending').length, color: 'bg-orange-500/10 text-orange-400' },
            { label: 'Processing', count: displayOrders.filter(o => o.status === 'Processing').length, color: 'bg-yellow-500/10 text-yellow-400' },
            { label: 'Shipped', count: displayOrders.filter(o => o.status === 'Shipped').length, color: 'bg-blue-500/10 text-blue-400' },
            { label: 'Delivered', count: displayOrders.filter(o => o.status === 'Delivered').length, color: 'bg-green-500/10 text-green-400' },
          ].map((stat, i) => (
            <button
              key={i}
              onClick={() => setStatusFilter(stat.label === 'All Orders' ? 'all' : stat.label.toLowerCase())}
              className={`p-4 rounded-xl border border-white/5 text-left transition-all hover:border-white/20 ${
                (statusFilter === 'all' && stat.label === 'All Orders') || 
                statusFilter === stat.label.toLowerCase() 
                  ? 'bg-[#1a1a22] border-blue-500/50' 
                  : 'bg-[#14141a]'
              }`}
            >
              <p className={`text-2xl font-bold ${stat.color.split(' ')[1]}`}>{stat.count}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 bg-[#14141a] rounded-xl p-4 border border-white/5">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by order ID, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#14141a] rounded-xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Items</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-white/5">
                      <td className="p-4"><div className="h-4 bg-white/5 rounded w-24"></div></td>
                      <td className="p-4"><div className="h-4 bg-white/5 rounded w-32"></div></td>
                      <td className="p-4"><div className="h-4 bg-white/5 rounded w-20"></div></td>
                      <td className="p-4"><div className="h-4 bg-white/5 rounded w-8"></div></td>
                      <td className="p-4"><div className="h-4 bg-white/5 rounded w-16"></div></td>
                      <td className="p-4"><div className="h-6 bg-white/5 rounded w-20"></div></td>
                      <td className="p-4"><div className="h-8 bg-white/5 rounded w-24 ml-auto"></div></td>
                    </tr>
                  ))
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order: any) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="p-4">
                        <Link href={`/admin/orders/${order.id}`} className="text-blue-400 hover:text-blue-300 font-medium">
                          #{order.id}
                        </Link>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">{order.customer}</p>
                          <p className="text-gray-500 text-sm">{order.email}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400">{order.date}</td>
                      <td className="p-4 text-gray-400">{order.items}</td>
                      <td className="p-4 text-white font-medium">${order.total.toLocaleString()}</td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(order.status)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="px-3 py-1 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg hover:border-white/30 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-white/5">
            <p className="text-gray-500 text-sm">Showing {filteredOrders.length} orders</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm font-medium">1</button>
              <button className="px-3 py-1 rounded bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition-colors">2</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
