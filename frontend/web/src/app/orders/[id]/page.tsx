'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { UserLayout } from '@/components/layout';
import { ordersService } from '@/services';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock order data
  const mockOrder = {
    id: orderId,
    orderNumber: `#AO-${orderId}`,
    date: '2024-01-15',
    status: 'Delivered',
    items: [
      { id: '1', name: 'Silk Cashmere Blazer', price: 1200, quantity: 1, color: 'Emerald Green', size: 'M', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&q=80' },
      { id: '2', name: 'Leather Tote Bag', price: 850, quantity: 1, color: 'Saddle Brown', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80' },
    ],
    subtotal: 2050,
    shipping: 25,
    tax: 172,
    total: 2247,
    shippingAddress: {
      name: 'John Doe',
      street: '123 Luxury Street',
      city: 'Ho Chi Minh City',
      state: 'District 1',
      postalCode: '70000',
      country: 'Vietnam',
    },
    paymentMethod: 'Credit Card ending in ****4242',
    trackingNumber: 'VN1234567890',
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
    <UserLayout>
      <main className="pt-32 pb-20 px-4 md:px-12 max-w-[1000px] mx-auto min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <Link href="/profile" className="text-muted-gold text-sm hover:text-white transition-colors mb-2 inline-block">
              ← Back to Orders
            </Link>
            <h1 className="font-heading text-4xl text-white">Order {displayOrder.orderNumber}</h1>
            <p className="text-gray-500 mt-2">Placed on {displayOrder.date}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(displayOrder.status)}`}>
            {displayOrder.status}
          </span>
        </div>

        <div className="space-y-8">
          {/* Order Items */}
          <div className="bg-[#1A1A1D] rounded-xl p-6 md:p-8 border border-white/5">
            <h2 className="font-heading text-2xl text-white mb-6">Order Items</h2>
            <div className="space-y-6">
              {displayOrder.items.map((item: any) => (
                <div key={item.id} className="flex gap-6 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {item.color}{item.size ? ` | Size: ${item.size}` : ''} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-white font-medium">${item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
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
              <div className="flex justify-between text-xl font-heading text-white pt-4 border-t border-white/10">
                <span>Total</span>
                <span>${displayOrder.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1A1A1D] rounded-xl p-6 border border-white/5">
              <h3 className="font-heading text-lg text-white mb-4">Shipping Address</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {displayOrder.shippingAddress.name}<br />
                {displayOrder.shippingAddress.street}<br />
                {displayOrder.shippingAddress.state}, {displayOrder.shippingAddress.city}<br />
                {displayOrder.shippingAddress.country}, {displayOrder.shippingAddress.postalCode}
              </p>
            </div>
            <div className="bg-[#1A1A1D] rounded-xl p-6 border border-white/5">
              <h3 className="font-heading text-lg text-white mb-4">Payment Method</h3>
              <p className="text-gray-400 text-sm">{displayOrder.paymentMethod}</p>
              {displayOrder.trackingNumber && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-gray-500 text-xs mb-1">Tracking Number</p>
                  <p className="text-muted-gold font-medium">{displayOrder.trackingNumber}</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 border border-white/20 text-white py-3 rounded-lg uppercase text-xs tracking-[0.15em] hover:border-muted-gold hover:text-muted-gold transition-colors">
              Track Order
            </button>
            <button className="flex-1 border border-white/20 text-white py-3 rounded-lg uppercase text-xs tracking-[0.15em] hover:border-muted-gold hover:text-muted-gold transition-colors">
              Download Invoice
            </button>
            <Link 
              href="/products"
              className="flex-1 bg-muted-gold text-charcoal py-3 rounded-lg uppercase text-xs tracking-[0.15em] font-bold text-center hover:bg-[#d4c08a] transition-colors"
            >
              Shop Again
            </Link>
          </div>
        </div>
      </main>
    </UserLayout>
  );
}
