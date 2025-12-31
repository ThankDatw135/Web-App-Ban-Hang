'use client';

import Link from 'next/link';
import { UserLayout } from '@/components/layout';

export default function AboutPage() {
  return (
    <UserLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-12 min-h-[60vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center opacity-30"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/90 to-charcoal"></div>
        </div>
        
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <p className="text-xs uppercase tracking-[0.4em] mb-6 text-muted-gold font-medium">
            Our Story
          </p>
          <h1 className="font-heading text-5xl md:text-7xl text-white mb-8 tracking-wide leading-tight">
            AURUM & OAK
          </h1>
          <p className="text-xl text-gray-300/80 font-light font-heading max-w-2xl mx-auto tracking-wide leading-relaxed">
            "Where timeless craftsmanship meets contemporary elegance. A legacy of luxury, refined for the modern connoisseur."
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 px-6 sm:px-12 bg-charcoal">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="font-heading text-4xl text-white mb-6 tracking-wide">
                Our Heritage
              </h2>
              <div className="w-16 h-px bg-muted-gold/50 mb-8"></div>
              <p className="text-gray-400 font-light leading-relaxed mb-6">
                Founded in 2010, Aurum & Oak was born from a vision to create luxury fashion that transcends fleeting trends. Our name draws inspiration from gold (Aurum) – representing the timeless value of exceptional quality, and Oak – symbolizing the strength and endurance of traditional craftsmanship.
              </p>
              <p className="text-gray-400 font-light leading-relaxed mb-6">
                Every piece in our collection tells a story of meticulous attention to detail, sourced from the finest materials and crafted by master artisans in renowned ateliers across Italy, France, and Japan.
              </p>
              <p className="text-gray-400 font-light leading-relaxed">
                We believe that true luxury lies not in excess, but in the thoughtful curation of pieces that become cherished companions through life's journey.
              </p>
            </div>
            <div className="relative">
              <div 
                className="w-full h-[500px] bg-cover bg-center rounded-sm"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80)',
                }}
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-muted-gold/10 rounded-sm"></div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
            <div className="text-center p-8 border border-white/5 rounded-sm hover:border-muted-gold/30 transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-muted-gold/30 rounded-full">
                <svg className="w-8 h-8 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-white mb-4">Excellence</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                We pursue perfection in every stitch, every seam, every detail. Compromise is never an option.
              </p>
            </div>
            
            <div className="text-center p-8 border border-white/5 rounded-sm hover:border-muted-gold/30 transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-muted-gold/30 rounded-full">
                <svg className="w-8 h-8 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-white mb-4">Timelessness</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Our designs transcend seasons and trends, becoming enduring pieces in your wardrobe.
              </p>
            </div>
            
            <div className="text-center p-8 border border-white/5 rounded-sm hover:border-muted-gold/30 transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-muted-gold/30 rounded-full">
                <svg className="w-8 h-8 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-white mb-4">Sustainability</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Committed to ethical practices and sustainable luxury that respects our planet.
              </p>
            </div>
          </div>

          {/* Craftsmanship Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div 
                className="w-full h-[400px] bg-cover bg-center rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80)',
                }}
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-4xl text-white mb-6 tracking-wide">
                The Art of Making
              </h2>
              <div className="w-16 h-px bg-muted-gold/50 mb-8"></div>
              <p className="text-gray-400 font-light leading-relaxed mb-6">
                Our atelier partners in Florence, Milan, and Paris house generations of expertise. Each artisan brings decades of mastery to their craft, using techniques passed down through centuries yet refined for modern sensibilities.
              </p>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                From the selection of raw materials to the final quality inspection, every piece passes through countless hours of careful attention. This is not fast fashion – this is fashion that lasts.
              </p>
              <Link 
                href="/products" 
                className="inline-block border border-muted-gold/50 text-muted-gold px-8 py-3 uppercase text-xs tracking-[0.2em] hover:bg-muted-gold hover:text-charcoal transition-all duration-300"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 sm:px-12 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-6">
            Experience Aurum & Oak
          </h2>
          <p className="text-gray-400 font-light mb-8">
            Visit our flagship boutiques or contact our personal styling team for a curated experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-block bg-muted-gold text-charcoal px-8 py-3 uppercase text-xs tracking-[0.2em] font-medium hover:bg-muted-gold/90 transition-colors"
            >
              Contact Us
            </Link>
            <Link 
              href="/products" 
              className="inline-block border border-white/30 text-white px-8 py-3 uppercase text-xs tracking-[0.2em] hover:border-muted-gold hover:text-muted-gold transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </UserLayout>
  );
}
