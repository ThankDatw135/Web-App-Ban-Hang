'use client';

import Link from 'next/link';
import Image from 'next/image';
import { UserLayout } from '@/components/layout';
import { useEffect, useState } from 'react';
import { productsService } from '@/services';
import { Product } from '@/types';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const products = await productsService.getFeatured();
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
        // Use mock data for now
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <UserLayout>
      {/* Hero Section */}
      <header className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center opacity-60 scale-105"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl px-4 mt-20 animate-fade-in">
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] mb-6 text-muted-gold font-medium">
            Timeless pieces for the modern connoisseur
          </p>
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white mb-8 tracking-wide leading-none">
            THE NEW ELEGANCE
          </h1>
          <div className="flex flex-col items-center gap-8">
            <p className="text-lg text-gray-300/80 font-light italic font-heading max-w-xl mx-auto tracking-wide">
              "Where heritage meets contemporary vision."
            </p>
            <Link 
              href="/products" 
              className="inline-block border border-white/30 text-white px-10 py-4 uppercase text-[10px] md:text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
            >
              Discover Collection
            </Link>
          </div>
        </div>
      </header>

      {/* Curated Collections Section */}
      <section className="py-24 px-6 sm:px-12 max-w-[1400px] mx-auto bg-charcoal">
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl md:text-5xl text-white tracking-wide">
            Curated Collections
          </h2>
          <div className="w-16 h-px bg-muted-gold/50 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[800px]">
          {/* Women's Collection */}
          <Link 
            href="/products?category=women" 
            className="group relative overflow-hidden h-[600px] lg:h-full rounded-sm cursor-pointer"
          >
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.08] opacity-90"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h3 className="font-heading text-4xl md:text-5xl text-white mb-3 tracking-wide">
                WOMEN'S<br/>AUTUMN/WINTER
              </h3>
              <p className="text-gray-300 text-xs tracking-[0.3em] uppercase mt-2 font-light">
                Sophisticated Silhouettes
              </p>
            </div>
          </Link>

          {/* Right Column */}
          <div className="flex flex-col gap-8 h-full">
            {/* Men's Tailoring */}
            <Link 
              href="/products?category=men" 
              className="group relative overflow-hidden flex-1 rounded-sm cursor-pointer min-h-[300px]"
            >
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.08] opacity-90"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80)',
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute bottom-8 right-8 text-right">
                <h3 className="font-heading text-3xl text-white mb-2 tracking-wide border-b border-transparent group-hover:border-muted-gold inline-block transition-colors pb-1">
                  MEN'S TAILORING
                </h3>
              </div>
            </Link>

            {/* Fine Leather Goods */}
            <Link 
              href="/products?category=accessories" 
              className="group relative overflow-hidden flex-1 rounded-sm cursor-pointer min-h-[300px]"
            >
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.08] opacity-90"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80)',
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute bottom-8 right-8 text-right">
                <h3 className="font-heading text-3xl text-white mb-2 tracking-wide border-b border-transparent group-hover:border-muted-gold inline-block transition-colors pb-1">
                  FINE LEATHER GOODS
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Pieces Section */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl text-white tracking-wide mb-4">
              Featured Pieces
            </h2>
            <p className="text-gray-400 font-light tracking-widest text-sm uppercase">
              Select pieces for the season
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {/* Product Cards - Using placeholder data since API may not be ready */}
            {[
              { name: 'The Silk Foulard', price: '$460', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80' },
              { name: 'The Silk Watch', price: '$4,250', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
              { name: 'Boot Roots', price: '$850', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
              { name: 'Biccoci Blazer', price: '$1,290', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80' },
            ].map((product, index) => (
              <Link href={`/products/${index + 1}`} key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-[#151515] rounded-sm aspect-[4/5] mb-6">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.08]"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-heading text-xl text-white mb-2 tracking-wide">{product.name}</h3>
                  <p className="text-muted-gold text-sm mb-4">{product.price}</p>
                  <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-gray-400 border-b border-gray-700 hover:border-muted-gold hover:text-muted-gold transition-all pb-1">
                    View Details
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-12 gap-3">
            <div className="w-12 h-0.5 bg-muted-gold"></div>
            <div className="w-2 h-0.5 bg-gray-700"></div>
            <div className="w-2 h-0.5 bg-gray-700"></div>
          </div>
        </div>
      </section>

      {/* The Maison's Journal Section */}
      <section className="py-24 px-6 sm:px-12 max-w-[1200px] mx-auto bg-charcoal">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-white tracking-wide">
            The Maison's Journal
          </h2>
        </div>
        
        <div className="bg-[#121212] p-6 md:p-10 rounded-lg border border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 overflow-hidden rounded-md">
              <div 
                className="w-full h-[350px] bg-cover bg-center grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80)',
                }}
              />
            </div>
            <div className="w-full md:w-1/2 text-left px-4">
              <h3 className="font-heading text-3xl md:text-4xl text-white mb-4 leading-tight">
                THE ART OF<br/>CRAFTSMANSHIP
              </h3>
              <p className="text-gray-400 text-base font-light leading-relaxed mb-8 max-w-md">
                Discover the meticulous process behind our latest collection, where heritage techniques meet contemporary design in our Florence atelier.
              </p>
              <Link 
                href="/about" 
                className="inline-block border-b border-gray-600 pb-1 text-xs uppercase tracking-[0.2em] text-muted-gold hover:text-white hover:border-white transition-colors"
              >
                Read the Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
}
