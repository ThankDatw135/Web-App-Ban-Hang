'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserLayout } from '@/components/layout';

export default function CheckoutShippingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Vietnam',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store shipping info and proceed to payment
    localStorage.setItem('shippingInfo', JSON.stringify(formData));
    router.push('/checkout/payment');
  };

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-32">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-heading text-3xl md:text-4xl tracking-widest text-ivory uppercase">
            Aurum & Oak
          </h1>
        </header>

        {/* Progress Steps */}
        <nav className="max-w-5xl mx-auto mb-20 px-4">
          <ol className="flex items-center w-full text-xs font-bold tracking-[0.15em] uppercase">
            <li className="flex w-full items-center text-muted-gold">
              <span className="shrink-0">Shipping</span>
              <div className="w-full h-[2px] bg-muted-gold ml-6 mr-4"></div>
            </li>
            <li className="flex w-full items-center text-gray-500">
              <span className="shrink-0">Payment</span>
              <div className="w-full h-[2px] bg-[#27272A] ml-6 mr-4"></div>
            </li>
            <li className="flex items-center text-gray-500">
              <span className="shrink-0">Review</span>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 max-w-7xl mx-auto">
          {/* Shipping Form */}
          <div className="flex-1 bg-[#18181B] rounded-lg p-8 lg:p-10 shadow-lg border border-white/5">
            <h2 className="font-heading text-3xl mb-10 text-white">Shipping Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded border border-white/10 bg-[#27272A] text-gray-200 focus:border-muted-gold focus:ring-1 focus:ring-muted-gold py-4 px-5 placeholder-gray-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded border border-white/10 bg-[#27272A] text-gray-200 focus:border-muted-gold focus:ring-1 focus:ring-muted-gold py-4 px-5 placeholder-gray-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded border border-white/10 bg-[#27272A] text-gray-200 focus:border-muted-gold focus:ring-1 focus:ring-muted-gold py-4 px-5 placeholder-gray-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded border border-white/10 bg-[#27272A] text-gray-200 focus:border-muted-gold focus:ring-1 focus:ring-muted-gold py-4 px-5 placeholder-gray-500"
                  placeholder="+84 123 456 789"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded border border-white/10 bg-[#27272A] text-gray-200 focus:border-muted-gold focus:ring-1 focus:ring-muted-gold py-4 px-5 placeholder-gray-500"
                  placeholder="123 Luxury Street"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded border border-white/10 bg-[#27272A] text-gray-200 focus:border-muted-gold focus:ring-1 focus:ring-muted-gold py-4 px-5 placeholder-gray-500"
                    placeholder="Ho Chi Minh"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">State/Province</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="block w-full rounded border border-white/10 bg-[#27272A] text-gray-200 focus:border-muted-gold focus:ring-1 focus:ring-muted-gold py-4 px-5 placeholder-gray-500"
                    placeholder="District 1"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded border border-white/10 bg-[#27272A] text-gray-200 focus:border-muted-gold focus:ring-1 focus:ring-muted-gold py-4 px-5 placeholder-gray-500"
                    placeholder="70000"
                  />
                </div>
              </div>

              <div className="pt-8">
                <button 
                  type="submit"
                  className="w-full bg-muted-gold hover:bg-[#B09B6A] text-charcoal font-bold py-4 px-4 rounded transition duration-200 shadow-lg hover:shadow-[0_0_15px_rgba(201,179,126,0.3)]"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[420px]">
            <div className="bg-[#18181B] rounded-lg p-8 lg:p-10 shadow-lg border border-white/5 sticky top-6">
              <h2 className="font-heading text-3xl mb-8 text-white">Your Order</h2>
              
              <ul className="space-y-6 mb-8">
                <li className="flex">
                  <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded border border-white/10 bg-white">
                    <div 
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&q=80)' }}
                    />
                  </div>
                  <div className="ml-6 flex flex-1 flex-col justify-center">
                    <div className="flex justify-between text-base font-medium text-white">
                      <h3 className="font-heading text-lg leading-tight">Silk Cashmere Blazer</h3>
                      <p className="ml-4">$1,200.00</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-400">Emerald Green | Size: M</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded border border-white/10 bg-white">
                    <div 
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&q=80)' }}
                    />
                  </div>
                  <div className="ml-6 flex flex-1 flex-col justify-center">
                    <div className="flex justify-between text-base font-medium text-white">
                      <h3 className="font-heading text-lg leading-tight">Leather Tote Bag</h3>
                      <p className="ml-4">$850.00</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-400">Saddle Brown</p>
                  </div>
                </li>
              </ul>

              <div className="border-t border-white/10 pt-8 space-y-4">
                <div className="flex justify-between text-sm text-gray-300">
                  <p>Subtotal</p>
                  <p className="font-medium">$2,050.00</p>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <p>Shipping</p>
                  <p className="font-medium">$25.00</p>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <p>Tax</p>
                  <p className="font-medium">$172.00</p>
                </div>
                <div className="flex justify-between text-xl font-heading text-white pt-6 mt-4">
                  <p>Total</p>
                  <p>$2,247.00</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center items-center text-gray-500 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
