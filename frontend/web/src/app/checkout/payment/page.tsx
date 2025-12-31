'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserLayout } from '@/components/layout';

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment and create order
    router.push('/checkout/confirmation');
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
            <li className="flex w-full items-center text-muted-gold">
              <span className="shrink-0">Payment</span>
              <div className="w-full h-[2px] bg-[#27272A] ml-6 mr-4"></div>
            </li>
            <li className="flex items-center text-gray-500">
              <span className="shrink-0">Review</span>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 max-w-7xl mx-auto">
          {/* Payment Form */}
          <div className="flex-1 bg-[#18181B] rounded-lg p-8 lg:p-10 shadow-lg border border-white/5">
            <h2 className="font-heading text-3xl mb-10 text-white">Payment Method</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Payment Method Selection */}
              <div className="space-y-3">
                <label 
                  className={`flex items-center justify-between p-4 border rounded cursor-pointer bg-[#27272A] transition ${
                    paymentMethod === 'card' ? 'border-muted-gold/50' : 'border-white/10 hover:border-muted-gold/30'
                  }`}
                >
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="paymentType" 
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-5 w-5 border-gray-600 text-muted-gold focus:ring-muted-gold bg-transparent"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-200">Credit Card</span>
                  </div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </label>

                <label 
                  className={`flex items-center justify-between p-4 border rounded cursor-pointer bg-[#27272A] transition ${
                    paymentMethod === 'paypal' ? 'border-muted-gold/50' : 'border-white/10 hover:border-muted-gold/30'
                  }`}
                >
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="paymentType" 
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-5 w-5 border-gray-600 text-muted-gold focus:ring-muted-gold bg-transparent"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-200">Pay with PayPal</span>
                  </div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </label>
              </div>

              {/* Card Details */}
              {paymentMethod === 'card' && (
                <div className="space-y-6 pt-2">
                  <div>
                    <label className="sr-only">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="Card Number"
                        className="block w-full rounded border border-white/10 bg-[#27272A] text-gray-200 focus:border-muted-gold focus:ring-1 focus:ring-muted-gold py-4 px-5 placeholder-gray-500"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="sr-only">Expiration Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="Expiration Date (MM/YY)"
                        className="block w-full rounded border border-white/10 bg-[#27272A] text-gray-200 focus:border-muted-gold focus:ring-1 focus:ring-muted-gold py-4 px-5 placeholder-gray-500"
                      />
                    </div>
                    <div className="relative">
                      <label className="sr-only">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="CVV"
                        className="block w-full rounded border border-white/10 bg-[#27272A] text-gray-200 focus:border-muted-gold focus:ring-1 focus:ring-muted-gold py-4 px-5 placeholder-gray-500"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="sr-only">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      placeholder="Cardholder Name"
                      className="block w-full rounded border border-white/10 bg-[#27272A] text-gray-200 focus:border-muted-gold focus:ring-1 focus:ring-muted-gold py-4 px-5 placeholder-gray-500"
                    />
                  </div>
                </div>
              )}

              <div className="pt-8 flex gap-4">
                <Link 
                  href="/checkout/shipping"
                  className="flex-1 border border-gray-600 text-gray-300 font-bold py-4 px-4 rounded transition duration-200 text-center hover:border-gray-400"
                >
                  Back
                </Link>
                <button 
                  type="submit"
                  className="flex-1 bg-muted-gold hover:bg-[#B09B6A] text-charcoal font-bold py-4 px-4 rounded transition duration-200 shadow-lg hover:shadow-[0_0_15px_rgba(201,179,126,0.3)]"
                >
                  Place Order
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
