'use client';

import Link from 'next/link';
import { useAuthStore, useCartStore } from '@/stores';

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { itemCount } = useCartStore();

  return (
    <nav className="fixed w-full z-50 bg-charcoal/80 backdrop-blur-md border-b border-white/5 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="font-heading font-medium text-2xl tracking-[0.2em] text-muted-gold"
            >
              AURUM & OAK
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex space-x-10 items-center">
            <Link 
              href="/products?category=new" 
              className="text-xs uppercase tracking-[0.2em] text-ivory hover:text-muted-gold transition-colors duration-300"
            >
              New Arrivals
            </Link>
            <Link 
              href="/products?category=women" 
              className="text-xs uppercase tracking-[0.2em] text-ivory hover:text-muted-gold transition-colors duration-300"
            >
              Women
            </Link>
            <Link 
              href="/products?category=men" 
              className="text-xs uppercase tracking-[0.2em] text-ivory hover:text-muted-gold transition-colors duration-300"
            >
              Men
            </Link>
            <Link 
              href="/products?category=accessories" 
              className="text-xs uppercase tracking-[0.2em] text-ivory hover:text-muted-gold transition-colors duration-300"
            >
              Accessories
            </Link>
            <Link 
              href="/try-on" 
              className="text-xs uppercase tracking-[0.2em] text-muted-gold hover:text-white transition-colors duration-300 flex items-center gap-2 border-b border-muted-gold/30 pb-0.5 hover:border-white"
            >
              <span className="material-icons text-sm">view_in_ar</span>
              Thử trang phục ảo với AI
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-8">
            {/* Search */}
            <button className="text-ivory hover:text-muted-gold transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* User Menu */}
            <div className="relative group h-full flex items-center cursor-pointer">
              <button className="flex items-center space-x-2 text-xs uppercase tracking-widest hover:text-muted-gold transition-colors duration-300 focus:outline-none text-ivory">
                {isAuthenticated && user ? (
                  <span className="hidden sm:inline-block font-medium">{user.fullName.split(' ')[0]}</span>
                ) : null}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute right-0 top-16 w-56 bg-[#1A1A1A] border border-white/5 shadow-2xl rounded-sm py-2 z-50 transition-all duration-300 transform translate-y-[-8px] group-hover:translate-y-0">
                {isAuthenticated ? (
                  <>
                    <Link 
                      href="/profile" 
                      className="block px-6 py-3 text-xs uppercase tracking-wider text-gray-300 hover:bg-[#252525] hover:text-muted-gold transition-colors"
                    >
                      Thông tin cá nhân
                    </Link>
                    <Link 
                      href="/profile/change-password" 
                      className="block px-6 py-3 text-xs uppercase tracking-wider text-gray-300 hover:bg-[#252525] hover:text-muted-gold transition-colors"
                    >
                      Đổi mật khẩu
                    </Link>
                    <Link 
                      href="/orders" 
                      className="block px-6 py-3 text-xs uppercase tracking-wider text-gray-300 hover:bg-[#252525] hover:text-muted-gold transition-colors"
                    >
                      Lịch sử đơn hàng
                    </Link>
                    <div className="border-t border-white/5 my-1"></div>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-6 py-3 text-xs uppercase tracking-wider text-red-400 hover:bg-[#252525] transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/auth/login" 
                      className="block px-6 py-3 text-xs uppercase tracking-wider text-gray-300 hover:bg-[#252525] hover:text-muted-gold transition-colors"
                    >
                      Đăng nhập
                    </Link>
                    <Link 
                      href="/auth/register" 
                      className="block px-6 py-3 text-xs uppercase tracking-wider text-gray-300 hover:bg-[#252525] hover:text-muted-gold transition-colors"
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Cart */}
            <Link 
              href="/cart" 
              className="text-ivory hover:text-muted-gold transition-colors duration-300 relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-muted-gold rounded-full flex items-center justify-center text-[10px] text-charcoal font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
