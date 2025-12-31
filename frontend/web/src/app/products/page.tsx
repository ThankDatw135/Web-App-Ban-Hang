'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { UserLayout } from '@/components/layout';
import { productsService } from '@/services';
import { Product } from '@/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock products for UI display
  const mockProducts = [
    { id: '1', name: 'Silk Evening Gown', price: 2400, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80', category: 'Women' },
    { id: '2', name: 'Cashmere Blazer', price: 1290, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80', category: 'Women' },
    { id: '3', name: 'Leather Tote Bag', price: 850, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80', category: 'Accessories' },
    { id: '4', name: 'Classic Wool Coat', price: 1850, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80', category: 'Women' },
    { id: '5', name: 'Italian Leather Boots', price: 980, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', category: 'Shoes' },
    { id: '6', name: 'Silk Scarf', price: 320, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&q=80', category: 'Accessories' },
    { id: '7', name: 'Tailored Suit', price: 2800, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80', category: 'Men' },
    { id: '8', name: 'Designer Watch', price: 4250, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', category: 'Accessories' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsService.getAll({ 
          category: category !== 'all' ? category : undefined,
          sort: sortBy as any 
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, sortBy]);

  const displayProducts = products.length > 0 ? products : mockProducts;

  const filteredProducts = displayProducts.filter(product => {
    const matchesCategory = category === 'all' || (product as any).category?.toLowerCase() === category.toLowerCase();
    const matchesSearch = (product as any).name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <UserLayout>
      <main className="pt-32 pb-20 px-4 md:px-12 max-w-[1600px] mx-auto min-h-screen">
        {/* Page Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] mb-4 text-muted-gold">Discover</p>
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-4">Our Collection</h1>
          <p className="text-gray-400 font-light max-w-lg mx-auto">
            Explore our curated selection of luxury pieces, crafted with exceptional attention to detail.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 pb-8 border-b border-white/10">
          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {['all', 'women', 'men', 'accessories', 'shoes'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                  category === cat
                    ? 'bg-muted-gold text-charcoal font-semibold'
                    : 'border border-white/20 text-gray-300 hover:border-muted-gold/50 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Products' : cat}
              </button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 lg:flex-initial">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-64 bg-[#1A1A1D] border border-white/10 rounded-lg px-4 py-2.5 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-muted-gold/50 transition-colors"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1A1A1D] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-muted-gold/50 transition-colors cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-400 mb-8">
          Showing <span className="text-white">{filteredProducts.length}</span> products
        </p>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-[#1A1A1D] aspect-[3/4] rounded-lg mb-4"></div>
                <div className="h-4 bg-[#1A1A1D] rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-[#1A1A1D] rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400 mb-6">No products found matching your criteria.</p>
            <button 
              onClick={() => { setCategory('all'); setSearchQuery(''); }}
              className="text-muted-gold hover:text-white transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map((product: any) => (
              <Link 
                href={`/products/${product.id}`} 
                key={product.id} 
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden bg-[#151515] rounded-lg aspect-[3/4] mb-5">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${product.image || product.images?.[0]})` }}
                  />
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <button className="bg-white text-charcoal px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Quick View
                    </button>
                  </div>
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-sm text-[10px] uppercase tracking-wider text-gray-300 px-3 py-1 rounded-full">
                    {product.category || 'Collection'}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="font-heading text-lg text-white mb-2 group-hover:text-muted-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-gold font-medium">
                    ${(product.price || 0).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-16 gap-2">
          <button className="w-10 h-10 rounded-full bg-muted-gold text-charcoal font-bold">1</button>
          <button className="w-10 h-10 rounded-full border border-white/20 text-gray-400 hover:border-muted-gold hover:text-muted-gold transition-colors">2</button>
          <button className="w-10 h-10 rounded-full border border-white/20 text-gray-400 hover:border-muted-gold hover:text-muted-gold transition-colors">3</button>
          <button className="w-10 h-10 rounded-full border border-white/20 text-gray-400 hover:border-muted-gold hover:text-muted-gold transition-colors">
            <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>
    </UserLayout>
  );
}
