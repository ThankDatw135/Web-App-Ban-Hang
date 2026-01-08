'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  ShoppingBagIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'New Arrivals', href: '/products?new=true' },
  { name: 'Clothing', href: '/products?category=clothing' },
  { name: 'Accessories', href: '/products?category=accessories' },
  { name: 'Virtual Try-On', href: '/ai-tryon' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-ivory/5">
      <nav className="container-luxury">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl lg:text-2xl text-ivory">
            Luxury<span className="text-muted-gold">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-sans text-warm-white/70 hover:text-ivory transition-colors link-underline"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-warm-white/70 hover:text-ivory transition-colors">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
            <Link 
              href="/profile" 
              className="p-2 text-warm-white/70 hover:text-ivory transition-colors hidden lg:block"
            >
              <UserIcon className="w-5 h-5" />
            </Link>
            <Link 
              href="/cart" 
              className="p-2 text-warm-white/70 hover:text-ivory transition-colors relative"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-muted-gold text-charcoal text-[10px] font-medium rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="p-2 lg:hidden text-warm-white/70 hover:text-ivory"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-dark-surface z-50 lg:hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-serif text-xl text-ivory">Menu</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-warm-white/70"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <nav className="space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-2 text-lg text-warm-white/70 hover:text-ivory transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <hr className="border-ivory/10 my-4" />
                  <Link
                    href="/login"
                    className="block py-2 text-lg text-warm-white/70 hover:text-ivory"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block py-2 text-lg text-warm-white/70 hover:text-ivory"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
