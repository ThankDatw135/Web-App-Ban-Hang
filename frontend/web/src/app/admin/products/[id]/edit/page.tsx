'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { productsService } from '@/services';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    sku: '',
    stock: '',
    sizes: [] as string[],
    colors: [] as string[],
    material: '',
    care: '',
    images: [] as string[],
  });

  const categories = ['Women', 'Men', 'Accessories', 'Shoes'];
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableColors = ['Black', 'White', 'Navy', 'Emerald Green', 'Burgundy', 'Ivory', 'Camel'];

  // Mock product for demo
  const mockProduct = {
    name: 'Silk Cashmere Blazer',
    description: 'Crafted from the finest silk-cashmere blend, this blazer exemplifies understated luxury.',
    price: '1290',
    category: 'Women',
    sku: 'AO-BLZ-001',
    stock: '45',
    sizes: ['S', 'M', 'L'],
    colors: ['Emerald Green', 'Navy'],
    material: '70% Silk, 30% Cashmere',
    care: 'Dry clean only',
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80'],
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productsService.getById(productId);
        setFormData({
          name: data.name || '',
          description: data.description || '',
          price: String(data.price || ''),
          category: data.category || '',
          sku: '',
          stock: '',
          sizes: [],
          colors: [],
          material: '',
          care: '',
          images: data.images || [],
        });
      } catch (error) {
        console.error('Failed to fetch product:', error);
        // Use mock data for demo
        setFormData(mockProduct);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleToggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleToggleColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color) 
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await productsService.update(productId, {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        images: formData.images,
      });
      router.push('/admin/products');
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto animate-pulse space-y-6">
          <div className="h-8 bg-white/5 rounded w-48"></div>
          <div className="bg-[#14141a] rounded-xl p-6 border border-white/5 space-y-4">
            <div className="h-10 bg-white/5 rounded"></div>
            <div className="h-24 bg-white/5 rounded"></div>
            <div className="h-10 bg-white/5 rounded w-1/2"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/products" className="text-blue-400 text-sm hover:text-blue-300 mb-4 inline-block">
            ← Back to Products
          </Link>
          <h1 className="text-2xl font-bold text-white">Edit Product</h1>
          <p className="text-gray-500 text-sm mt-1">Update product details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-[#14141a] rounded-xl p-6 border border-white/5">
            <h2 className="text-lg font-semibold text-white mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">SKU</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-[#14141a] rounded-xl p-6 border border-white/5">
            <h2 className="text-lg font-semibold text-white mb-6">Pricing & Inventory</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Price (USD) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    min="0"
                    step="0.01"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Stock Quantity</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  min="0"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-[#14141a] rounded-xl p-6 border border-white/5">
            <h2 className="text-lg font-semibold text-white mb-6">Variants</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm mb-3">Available Sizes</label>
                <div className="flex flex-wrap gap-3">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleToggleSize(size)}
                      className={`w-12 h-12 rounded-lg text-sm font-medium transition-all ${
                        formData.sizes.includes(size)
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-3">Available Colors</label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleToggleColor(color)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.colors.includes(color)
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Link
              href="/admin/products"
              className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
