'use client';

import { useState } from 'react';
import { UserLayout } from '@/components/layout';
import { useAuthStore } from '@/stores';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+84 123 456 789',
    address: '123 Luxury Street, District 1',
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    // TODO: Call API to update profile
    setIsEditing(false);
  };

  // Mock orders
  const orders = [
    { id: 'AO-001234', date: '2024-01-15', status: 'Delivered', total: 2247, items: 2 },
    { id: 'AO-001189', date: '2023-12-28', status: 'Delivered', total: 1290, items: 1 },
    { id: 'AO-001145', date: '2023-12-10', status: 'Delivered', total: 3560, items: 3 },
  ];

  if (!isAuthenticated) {
    return (
      <UserLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-heading text-3xl text-white mb-4">Please Sign In</h2>
            <p className="text-gray-400 mb-8">You need to be logged in to view your profile.</p>
            <Link 
              href="/auth/login"
              className="inline-block bg-muted-gold text-charcoal px-8 py-3 uppercase text-xs tracking-[0.2em] font-bold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <main className="pt-32 pb-20 px-4 md:px-12 max-w-[1200px] mx-auto min-h-screen">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">My Account</h1>
          <p className="text-gray-400">Manage your profile and view your order history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1A1A1D] rounded-xl p-6 border border-white/5">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-muted-gold/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-muted-gold font-heading text-2xl">
                    {formData.fullName.charAt(0)}
                  </span>
                </div>
                <h3 className="text-white font-medium">{formData.fullName}</h3>
                <p className="text-gray-500 text-sm">{formData.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-muted-gold/10 text-muted-gold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-muted-gold/10 text-muted-gold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Order History
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeTab === 'addresses' 
                      ? 'bg-muted-gold/10 text-muted-gold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Addresses
                </button>
                <Link 
                  href="/profile/change-password"
                  className="block w-full text-left px-4 py-3 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Change Password
                </Link>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-[#1A1A1D] rounded-xl p-8 border border-white/5">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-heading text-2xl text-white">Personal Information</h2>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="text-muted-gold text-sm hover:text-white transition-colors"
                    >
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="text-gray-400 text-sm hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        className="text-muted-gold text-sm hover:text-white transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full bg-[#27272A] border border-white/10 rounded-lg px-4 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:border-muted-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full bg-[#27272A] border border-white/10 rounded-lg px-4 py-3 text-white opacity-50 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full bg-[#27272A] border border-white/10 rounded-lg px-4 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:border-muted-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full bg-[#27272A] border border-white/10 rounded-lg px-4 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:border-muted-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-[#1A1A1D] rounded-xl p-8 border border-white/5">
                <h2 className="font-heading text-2xl text-white mb-8">Order History</h2>
                
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Link 
                      href={`/orders/${order.id}`}
                      key={order.id}
                      className="block p-6 bg-[#27272A] rounded-lg hover:bg-[#2f2f34] transition-colors"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div>
                          <p className="text-white font-medium">{order.id}</p>
                          <p className="text-gray-500 text-sm mt-1">{order.date} • {order.items} items</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">${order.total.toLocaleString()}</p>
                          <span className="inline-block mt-1 px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-[#1A1A1D] rounded-xl p-8 border border-white/5">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-heading text-2xl text-white">Saved Addresses</h2>
                  <button className="text-muted-gold text-sm hover:text-white transition-colors">
                    + Add New
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="p-6 bg-[#27272A] rounded-lg border border-muted-gold/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white font-medium">Home</span>
                          <span className="px-2 py-0.5 bg-muted-gold/10 text-muted-gold text-xs rounded">Default</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          123 Luxury Street<br />
                          District 1, Ho Chi Minh City<br />
                          Vietnam, 70000
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </UserLayout>
  );
}
