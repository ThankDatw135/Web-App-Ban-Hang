'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { UserLayout } from '@/components/layout';
import { productsService } from '@/services';
import { useCartStore } from '@/stores';
import { Product } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCartStore();

  // Mock product data for UI display
  const mockProduct = {
    id: productId,
    name: 'Silk Cashmere Blazer',
    price: 1290,
    description: 'Crafted from the finest silk-cashmere blend, this blazer exemplifies understated luxury. The relaxed silhouette and impeccable tailoring make it perfect for both formal occasions and elevated casual wear.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
    ],
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Emerald Green', 'Midnight Black', 'Ivory'],
    material: '70% Silk, 30% Cashmere',
    care: 'Dry clean only',
    sku: 'AO-BLZ-001',
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productsService.getById(productId);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const displayProduct = product || mockProduct;

  const handleAddToCart = async () => {
    await addItem(displayProduct.id, quantity, selectedSize, selectedColor);
    // Show success toast
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="pt-32 pb-20 px-4 md:px-12 max-w-[1400px] mx-auto min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-[3/4] bg-[#1A1A1D] rounded-lg"></div>
            <div className="space-y-6">
              <div className="h-8 bg-[#1A1A1D] rounded w-3/4"></div>
              <div className="h-6 bg-[#1A1A1D] rounded w-1/4"></div>
              <div className="h-24 bg-[#1A1A1D] rounded"></div>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <main className="pt-32 pb-20 px-4 md:px-12 max-w-[1400px] mx-auto min-h-screen">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-muted-gold transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/products" className="hover:text-muted-gold transition-colors">Products</Link></li>
            <li>/</li>
            <li className="text-white">{displayProduct.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[3/4] bg-[#151515] rounded-lg overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${(displayProduct as any).images?.[activeImage] || mockProduct.images[activeImage]})` }}
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {mockProduct.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImage === i ? 'border-muted-gold' : 'border-transparent hover:border-white/30'
                  }`}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title & Price */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-gold mb-3">
                {displayProduct.category || mockProduct.category}
              </p>
              <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">
                {displayProduct.name}
              </h1>
              <p className="text-2xl text-muted-gold font-heading">
                ${(displayProduct.price || mockProduct.price).toLocaleString()}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-400 font-light leading-relaxed">
              {displayProduct.description || mockProduct.description}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="text-white text-sm font-medium mb-3">Color: <span className="text-gray-400">{selectedColor || mockProduct.colors[0]}</span></h3>
              <div className="flex gap-3">
                {mockProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      (selectedColor || mockProduct.colors[0]) === color
                        ? 'bg-muted-gold text-charcoal font-medium'
                        : 'border border-white/20 text-gray-300 hover:border-muted-gold/50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white text-sm font-medium">Size: <span className="text-gray-400">{selectedSize}</span></h3>
                <button className="text-muted-gold text-xs hover:text-white transition-colors">Size Guide</button>
              </div>
              <div className="flex gap-3">
                {mockProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-muted-gold text-charcoal'
                        : 'border border-white/20 text-gray-300 hover:border-muted-gold/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-white text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-gray-400 hover:border-muted-gold hover:text-muted-gold transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-white text-lg font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-gray-400 hover:border-muted-gold hover:text-muted-gold transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-muted-gold text-charcoal py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-[#d4c08a] transition-colors"
              >
                Add to Bag
              </button>
              <button className="w-14 h-14 rounded-lg border border-white/20 flex items-center justify-center text-gray-400 hover:border-muted-gold hover:text-muted-gold transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-white/10 pt-8 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">SKU</span>
                <span className="text-white">{mockProduct.sku}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Material</span>
                <span className="text-white">{mockProduct.material}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Care</span>
                <span className="text-white">{mockProduct.care}</span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-[#1A1A1D] rounded-lg p-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span className="text-gray-300">Complimentary shipping on orders over $500</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-gray-300">30-day returns and exchanges</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </UserLayout>
  );
}
