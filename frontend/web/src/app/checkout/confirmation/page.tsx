'use client';

import Link from 'next/link';
import { UserLayout } from '@/components/layout';

export default function CheckoutConfirmationPage() {
  const orderNumber = `#AO-${Date.now().toString().slice(-6)}`;

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-32 min-h-screen">
        {/* Success Section */}
        <div className="text-center mb-16">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/10 flex items-center justify-center">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            Your order has been placed successfully.
          </p>
          <p className="text-muted-gold text-lg font-medium">
            Order Number: {orderNumber}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#18181B] rounded-lg p-8 shadow-lg border border-white/5 mb-8">
          <h2 className="font-heading text-2xl text-white mb-6">Order Summary</h2>
          
          <div className="space-y-6 border-b border-white/10 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded bg-white">
                <div 
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&q=80)' }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">Silk Cashmere Blazer</h3>
                <p className="text-sm text-gray-400">Emerald Green | Size: M | Qty: 1</p>
              </div>
              <p className="text-white">$1,200.00</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded bg-white">
                <div 
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&q=80)' }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">Leather Tote Bag</h3>
                <p className="text-sm text-gray-400">Saddle Brown | Qty: 1</p>
              </div>
              <p className="text-white">$850.00</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>$2,050.00</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span>$25.00</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Tax</span>
              <span>$172.00</span>
            </div>
            <div className="flex justify-between text-xl font-heading text-white pt-4 border-t border-white/10">
              <span>Total</span>
              <span>$2,247.00</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#18181B] rounded-lg p-6 border border-white/5">
            <h3 className="font-heading text-lg text-white mb-4">Shipping Address</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              John Doe<br />
              123 Luxury Street<br />
              District 1, Ho Chi Minh City<br />
              Vietnam, 70000
            </p>
          </div>
          <div className="bg-[#18181B] rounded-lg p-6 border border-white/5">
            <h3 className="font-heading text-lg text-white mb-4">Payment Method</h3>
            <p className="text-gray-400 text-sm">
              Credit Card ending in ****4242
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Payment processed securely
            </p>
          </div>
        </div>

        {/* What's Next */}
        <div className="text-center mb-12">
          <h3 className="font-heading text-2xl text-white mb-4">What's Next?</h3>
          <p className="text-gray-400 mb-2">
            You will receive an email confirmation at <span className="text-muted-gold">john@example.com</span>
          </p>
          <p className="text-gray-400">
            Estimated delivery: 5-7 business days
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/orders"
            className="inline-block bg-muted-gold text-charcoal px-8 py-3 uppercase text-xs tracking-[0.2em] font-bold text-center hover:bg-[#B09B6A] transition-colors"
          >
            View Order Status
          </Link>
          <Link 
            href="/products"
            className="inline-block border border-white/30 text-white px-8 py-3 uppercase text-xs tracking-[0.2em] text-center hover:border-muted-gold hover:text-muted-gold transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </UserLayout>
  );
}
