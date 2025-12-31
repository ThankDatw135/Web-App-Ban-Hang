'use client';

import Link from 'next/link';
import { UserLayout } from '@/components/layout';
import { useCartStore } from '@/stores';
import { useEffect } from 'react';

export default function CartPage() {
  const { 
    items, 
    subtotal, 
    shipping, 
    tax, 
    total, 
    itemCount,
    isLoading,
    fetchCart,
    updateItemQuantity,
    removeItem 
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Mock cart data for UI display (will be replaced by real data)
  const mockItems = [
    {
      id: '1',
      name: 'Silk Cashmere Blazer',
      color: 'Emerald Green',
      size: 'M',
      price: 1200,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80',
    },
    {
      id: '2',
      name: 'Leather Tote Bag',
      color: 'Saddle Brown',
      size: null,
      price: 850,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
    },
    {
      id: '3',
      name: 'Cashmere Scarf',
      color: 'Cream',
      size: null,
      price: 450,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&q=80',
    },
  ];

  const displayItems = items.length > 0 ? items : mockItems;
  const displaySubtotal = subtotal || displayItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const displayShipping = shipping || 0;
  const displayTax = tax || Math.round(displaySubtotal * 0.084);
  const displayTotal = total || displaySubtotal + displayShipping + displayTax;

  return (
    <UserLayout>
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto w-full min-h-screen">
        <h1 className="font-heading text-5xl md:text-6xl mb-12 text-ivory">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Cart Items */}
          <div className="flex-1 bg-[#1A1A1D] rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl border border-white/5">
            {displayItems.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-400 mb-6">Your cart is empty</p>
                <Link 
                  href="/products" 
                  className="inline-block bg-muted-gold text-charcoal px-8 py-3 uppercase text-xs tracking-[0.2em] font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              displayItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`flex flex-col sm:flex-row gap-8 pb-8 ${
                    index < displayItems.length - 1 ? 'border-b border-[#2E2E33]' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-40 h-48 bg-ivory rounded-lg overflow-hidden flex-shrink-0 relative flex items-center justify-center">
                    <div 
                      className="w-full h-full bg-cover bg-center mix-blend-multiply"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-heading text-2xl md:text-3xl text-ivory">{item.name}</h3>
                      <span className="font-heading text-2xl text-ivory">${item.price.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-6 font-light tracking-wide">
                      {item.color}{item.size ? ` | Size: ${item.size}` : ''}
                    </p>
                    
                    <div className="mt-auto flex items-end justify-between">
                      {/* Quantity Controls */}
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-gray-400 font-light">Quantity: {item.quantity}</span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => item.quantity > 1 && updateItemQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-muted-gold"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-muted-gold hover:text-[#e0cba0]"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-6 text-sm">
                        <button className="text-muted-gold hover:text-ivory underline decoration-muted-gold/40 underline-offset-4 transition-colors">
                          Edit
                        </button>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-muted-gold hover:text-ivory underline decoration-muted-gold/40 underline-offset-4 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[420px] flex-shrink-0 flex flex-col gap-10">
            <div className="bg-[#1A1A1D] rounded-2xl p-8 shadow-2xl border border-white/5">
              <h2 className="font-heading text-3xl text-ivory mb-8">Order Summary</h2>
              
              <div className="space-y-5 mb-8 border-b border-white/10 pb-8">
                <div className="flex justify-between text-gray-400 font-light tracking-wide text-lg">
                  <span>Subtotal:</span>
                  <span className="text-ivory">${displaySubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-light tracking-wide text-lg">
                  <span>Shipping:</span>
                  <span className="text-ivory">{displayShipping === 0 ? 'Complimentary' : `$${displayShipping}`}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-light tracking-wide text-lg">
                  <span>Tax (estimated):</span>
                  <span className="text-ivory">${displayTax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="font-heading text-3xl text-ivory">Total:</span>
                <span className="font-heading text-3xl text-ivory">${displayTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout/shipping"
              className="w-full py-4 px-6 border border-muted-gold/40 bg-[#1A1A1D]/50 text-ivory rounded-full transition-all duration-300 text-base tracking-widest uppercase text-center hover:border-muted-gold hover:text-muted-gold relative overflow-hidden group block"
            >
              <span className="relative z-10">Proceed to Checkout</span>
              <div className="absolute inset-0 bg-muted-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>

            {/* Newsletter */}
            <div className="mt-4">
              <h3 className="font-heading text-3xl text-ivory mb-6">Receive updates</h3>
              <div className="flex overflow-hidden">
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="bg-transparent border border-white/20 text-ivory px-5 py-3 flex-grow focus:ring-1 focus:ring-muted-gold focus:border-muted-gold placeholder-gray-500 font-light rounded-l-md outline-none transition-colors"
                />
                <button className="bg-muted-gold text-charcoal px-8 py-3 font-medium hover:bg-[#bca671] transition-colors rounded-r-md tracking-wide">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </UserLayout>
  );
}
