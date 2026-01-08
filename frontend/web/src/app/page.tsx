import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-luxury" />
        
        {/* Content */}
        <div className="container-luxury relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block mb-6 text-muted-gold font-sans text-sm tracking-[0.2em] uppercase">
              New Collection 2026
            </span>
            
            <h1 className="font-serif text-display-1 text-ivory mb-8 animate-fade-in">
              Quiet Luxury.
              <br />
              <span className="text-muted-gold">Timeless Elegance.</span>
            </h1>
            
            <p className="text-body-lg text-warm-white/70 mb-12 max-w-xl animate-slide-up animation-delay-200">
              Discover our curated collection of refined pieces designed 
              for the discerning individual who appreciates understated sophistication.
            </p>
            
            <div className="flex gap-4 animate-slide-up animation-delay-300">
              <Link href="/products" className="btn-primary">
                Explore Collection
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/ai-tryon" className="btn-secondary">
                Virtual Try-On
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-ivory/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section bg-dark-surface">
        <div className="container-luxury">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-muted-gold font-sans text-sm tracking-[0.15em] uppercase">
                Curated Selection
              </span>
              <h2 className="font-serif text-heading-1 text-ivory mt-2">
                Featured Pieces
              </h2>
            </div>
            <Link href="/products" className="link-underline text-ivory/70 hover:text-ivory">
              View All
            </Link>
          </div>

          {/* Product Grid Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="product-card card card-hover">
                <div className="aspect-product bg-dark-bg animate-pulse" />
                <div className="p-4">
                  <div className="h-4 bg-dark-bg rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-4 bg-dark-bg rounded w-1/4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="section">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-muted-gold font-sans text-sm tracking-[0.15em] uppercase">
                Our Philosophy
              </span>
              <h2 className="font-serif text-heading-1 text-ivory mt-2 mb-6">
                The Art of Understated Elegance
              </h2>
              <p className="text-body text-warm-white/70 mb-6">
                We believe in the power of restraint. Each piece in our collection 
                is thoughtfully designed to transcend seasons and trends, becoming 
                a lasting part of your personal style narrative.
              </p>
              <p className="text-body text-warm-white/70 mb-8">
                Quality over quantity. Substance over spectacle. 
                This is the essence of quiet luxury.
              </p>
              <Link href="/about" className="btn-ghost">
                Discover Our Story
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="aspect-product bg-dark-surface rounded-sm overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-dark-surface to-charcoal animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* AI Try-On CTA */}
      <section className="section bg-gradient-luxury">
        <div className="container-luxury text-center">
          <span className="text-muted-gold font-sans text-sm tracking-[0.15em] uppercase">
            Experience Innovation
          </span>
          <h2 className="font-serif text-heading-1 text-ivory mt-2 mb-6">
            Virtual Try-On
          </h2>
          <p className="text-body text-warm-white/70 mb-8 max-w-2xl mx-auto">
            Experience our collection like never before. Use our AI-powered 
            virtual try-on to see how our pieces look on you.
          </p>
          <Link href="/ai-tryon" className="btn-gold">
            Try Now
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-ivory/10">
        <div className="container-luxury">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-serif text-xl text-ivory mb-4">Luxury Fashion</h3>
              <p className="text-body-sm text-warm-white/60">
                Quiet Luxury. Timeless Elegance.
              </p>
            </div>
            <div>
              <h4 className="font-sans text-sm font-medium text-ivory mb-4 uppercase tracking-wider">Shop</h4>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-warm-white/60 hover:text-ivory transition-colors">All Products</Link></li>
                <li><Link href="/products?category=clothing" className="text-warm-white/60 hover:text-ivory transition-colors">Clothing</Link></li>
                <li><Link href="/products?category=accessories" className="text-warm-white/60 hover:text-ivory transition-colors">Accessories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-sm font-medium text-ivory mb-4 uppercase tracking-wider">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-warm-white/60 hover:text-ivory transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="text-warm-white/60 hover:text-ivory transition-colors">FAQ</Link></li>
                <li><Link href="/shipping" className="text-warm-white/60 hover:text-ivory transition-colors">Shipping</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-sm font-medium text-ivory mb-4 uppercase tracking-wider">Account</h4>
              <ul className="space-y-2">
                <li><Link href="/login" className="text-warm-white/60 hover:text-ivory transition-colors">Sign In</Link></li>
                <li><Link href="/register" className="text-warm-white/60 hover:text-ivory transition-colors">Register</Link></li>
                <li><Link href="/orders" className="text-warm-white/60 hover:text-ivory transition-colors">Orders</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-ivory/10 text-center">
            <p className="text-body-sm text-warm-white/40">
              © 2026 Luxury Fashion. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
