'use client';

import Link from 'next/link';
import { AdminLayout } from '@/components/layout/AdminLayout';

export default function AdminDashboard() {
  // Mock data for dashboard
  const stats = [
    { label: 'Total Revenue', value: '$128,450', change: '+12.5%', positive: true, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'New Orders', value: '284', change: '+8.2%', positive: true, icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { label: 'Active Clients', value: '1,429', change: '+5.1%', positive: true, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Avg. Order Value', value: '$452', change: '-2.3%', positive: false, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  ];

  const recentOrders = [
    { id: '#AO-001234', customer: 'John Doe', date: '2024-01-15', total: 2247, status: 'Delivered' },
    { id: '#AO-001233', customer: 'Jane Smith', date: '2024-01-15', total: 1560, status: 'Shipped' },
    { id: '#AO-001232', customer: 'Mike Johnson', date: '2024-01-14', total: 890, status: 'Processing' },
    { id: '#AO-001231', customer: 'Emily Brown', date: '2024-01-14', total: 3420, status: 'Delivered' },
    { id: '#AO-001230', customer: 'Alex Wilson', date: '2024-01-13', total: 1290, status: 'Shipped' },
  ];

  const topProducts = [
    { name: 'Silk Cashmere Blazer', sales: 124, revenue: '$159,960' },
    { name: 'Leather Tote Bag', sales: 98, revenue: '$83,300' },
    { name: 'Classic Wool Coat', sales: 87, revenue: '$160,950' },
    { name: 'Silk Evening Gown', sales: 76, revenue: '$182,400' },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-500/10 text-green-400';
      case 'shipped': return 'bg-blue-500/10 text-blue-400';
      case 'processing': return 'bg-yellow-500/10 text-yellow-400';
      case 'cancelled': return 'bg-red-500/10 text-red-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#14141a] rounded-xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                  </svg>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.positive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-[#14141a] rounded-xl border border-white/5">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
                <p className="text-gray-500 text-sm">Latest transactions</p>
              </div>
              <Link href="/admin/orders" className="text-blue-400 text-sm hover:text-blue-300">
                View All →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                    <th className="p-4 font-medium">Order ID</th>
                    <th className="p-4 font-medium">Customer</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Total</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="p-4">
                        <Link href={`/admin/orders/${order.id.replace('#', '')}`} className="text-blue-400 hover:text-blue-300 font-medium">
                          {order.id}
                        </Link>
                      </td>
                      <td className="p-4 text-white">{order.customer}</td>
                      <td className="p-4 text-gray-400">{order.date}</td>
                      <td className="p-4 text-white font-medium">${order.total.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-[#14141a] rounded-xl border border-white/5">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-lg font-semibold text-white">Top Products</h2>
              <p className="text-gray-500 text-sm">Best sellers this month</p>
            </div>
            <div className="p-4 space-y-4">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.02]">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{product.name}</p>
                    <p className="text-gray-500 text-xs">{product.sales} sales</p>
                  </div>
                  <p className="text-green-400 font-medium text-sm">{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/admin/products/new"
            className="bg-[#14141a] rounded-xl p-6 border border-white/5 hover:border-blue-500/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Add New Product</h3>
            <p className="text-gray-500 text-sm">Create a new product listing</p>
          </Link>
          
          <Link 
            href="/admin/orders"
            className="bg-[#14141a] rounded-xl p-6 border border-white/5 hover:border-green-500/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Process Orders</h3>
            <p className="text-gray-500 text-sm">Manage pending orders</p>
          </Link>
          
          <Link 
            href="/admin/customers"
            className="bg-[#14141a] rounded-xl p-6 border border-white/5 hover:border-purple-500/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">View Customers</h3>
            <p className="text-gray-500 text-sm">Manage customer accounts</p>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
