'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ordersService } from '@/services';

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Mock order data
  const mockOrder = {
    id: orderId,
    customer: { name: 'John Doe', email: 'john@example.com', phone: '+84 123 456 789' },
    date: '2024-01-15 14:32',
    status: 'Processing',
    items: [
      { id: '1', name: 'Silk Cashmere Blazer', price: 1200, quantity: 1, color: 'Emerald Green', size: 'M', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&q=80' },
      { id: '2', name: 'Leather Tote Bag', price: 850, quantity: 1, color: 'Saddle Brown', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&q=80' },
    ],
    subtotal: 2050,
    shipping: 25,
    tax: 172,
    total: 2247,
    shippingAddress: {
      street: '123 Luxury Street',
      city: 'Ho Chi Minh City',
      state: 'District 1',
      postalCode: '70000',
      country: 'Vietnam',
    },
    paymentMethod: 'Credit Card',
    paymentLast4: '4242',
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await ordersService.getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const displayOrder = order || mockOrder;

  const handleStatusChange = async (newStatus: string) => {
    setUpdatingStatus(true);
    try {
      await ordersService.updateStatus(orderId, { status: newStatus as any });
      setOrder(prev => prev ? { ...prev, status: newStatus } : null);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'shipped': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'processing': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'pending': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-white/5 rounded w-48"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#14141a] rounded-xl p-6 h-96"></div>
            <div className="bg-[#14141a] rounded-xl p-6 h-96"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Link href="/admin/orders" className="text-blue-400 text-sm hover:text-blue-300 mb-2 inline-block">
              ← Back to Orders
            </Link>
            <h1 className="text-2xl font-bold text-white">Order #{displayOrder.id}</h1>
            <p className="text-gray-500 text-sm mt-1">Placed on {displayOrder.date}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(displayOrder.status)}`}>
              {displayOrder.status}
            </span>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors">
              Print Invoice
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-[#14141a] rounded-xl border border-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <h2 className="text-lg font-semibold text-white">Order Items</h2>
              </div>
              <div className="p-6 space-y-4">
                {displayOrder.items.map((item: any) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white/[0.02] rounded-lg">
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {item.color}{item.size ? ` | Size: ${item.size}` : ''} | Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-white font-medium">${item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-white/5 space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${displayOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>${displayOrder.shipping}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span>${displayOrder.tax}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-white/5">
                  <span>Total</span>
                  <span>${displayOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Update Status */}
            <div className="bg-[#14141a] rounded-xl p-6 border border-white/5">
              <h2 className="text-lg font-semibold text-white mb-4">Update Order Status</h2>
              <div className="flex flex-wrap gap-3">
                {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={updatingStatus || displayOrder.status === status}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                      displayOrder.status === status
                        ? getStatusColor(status)
                        : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                    } disabled:opacity-50`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-[#14141a] rounded-xl p-6 border border-white/5">
              <h2 className="text-lg font-semibold text-white mb-4">Customer</h2>
              <div className="space-y-3">
                <p className="text-white font-medium">{displayOrder.customer.name}</p>
                <p className="text-gray-400 text-sm">{displayOrder.customer.email}</p>
                <p className="text-gray-400 text-sm">{displayOrder.customer.phone}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-[#14141a] rounded-xl p-6 border border-white/5">
              <h2 className="text-lg font-semibold text-white mb-4">Shipping Address</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {displayOrder.shippingAddress.street}<br />
                {displayOrder.shippingAddress.state}, {displayOrder.shippingAddress.city}<br />
                {displayOrder.shippingAddress.country}, {displayOrder.shippingAddress.postalCode}
              </p>
            </div>

            {/* Payment Info */}
            <div className="bg-[#14141a] rounded-xl p-6 border border-white/5">
              <h2 className="text-lg font-semibold text-white mb-4">Payment</h2>
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{displayOrder.paymentMethod}</p>
                  <p className="text-gray-500 text-xs">**** {displayOrder.paymentLast4}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
