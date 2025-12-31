'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { productsService } from '@/services';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock products data
  const mockProducts = [
    { id: '1', name: 'Silk Cashmere Blazer', sku: 'AO-BLZ-001', category: 'Women', price: 1290, stock: 45, status: 'Active', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&q=80' },
    { id: '2', name: 'Leather Tote Bag', sku: 'AO-BAG-002', category: 'Accessories', price: 850, stock: 32, status: 'Active', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&q=80' },
    { id: '3', name: 'Classic Wool Coat', sku: 'AO-COT-003', category: 'Women', price: 1850, stock: 18, status: 'Active', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=100&q=80' },
    { id: '4', name: 'Silk Evening Gown', sku: 'AO-DRS-004', category: 'Women', price: 2400, stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&q=80' },
    { id: '5', name: 'Tailored Suit', sku: 'AO-SUT-005', category: 'Men', price: 2800, stock: 24, status: 'Active', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&q=80' },
    { id: '6', name: 'Designer Watch', sku: 'AO-WTC-006', category: 'Accessories', price: 4250, stock: 8, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsService.getAll({});
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const displayProducts = products.length > 0 ? products : mockProducts;

  const filteredProducts = displayProducts.filter((product: any) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.sku?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status?.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === 'all' || product.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-500/10 text-green-400';
      case 'out of stock': return 'bg-red-500/10 text-red-400';
      case 'low stock': return 'bg-yellow-500/10 text-yellow-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productsService.delete(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Products</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your product inventory</p>
          </div>
          <Link 
            href="/admin/products/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 bg-[#14141a] rounded-xl p-4 border border-white/5">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50"
          >
            <option value="all">All Categories</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="accessories">Accessories</option>
          </select>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="out of stock">Out of Stock</option>
            <option value="low stock">Low Stock</option>
          </select>
        </div>

        {/* Products Table */}
        <div className="bg-[#14141a] rounded-xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">SKU</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Stock</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-white/5">
                      <td className="p-4"><div className="h-10 bg-white/5 rounded w-48"></div></td>
                      <td className="p-4"><div className="h-4 bg-white/5 rounded w-24"></div></td>
                      <td className="p-4"><div className="h-4 bg-white/5 rounded w-20"></div></td>
                      <td className="p-4"><div className="h-4 bg-white/5 rounded w-16"></div></td>
                      <td className="p-4"><div className="h-4 bg-white/5 rounded w-12"></div></td>
                      <td className="p-4"><div className="h-6 bg-white/5 rounded w-20"></div></td>
                      <td className="p-4"><div className="h-8 bg-white/5 rounded w-20 ml-auto"></div></td>
                    </tr>
                  ))
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product: any) => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 rounded-lg overflow-hidden bg-gray-800">
                            <div 
                              className="w-full h-full bg-cover bg-center"
                              style={{ backgroundImage: `url(${product.image || product.images?.[0]})` }}
                            />
                          </div>
                          <span className="text-white font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400 font-mono text-sm">{product.sku || '-'}</td>
                      <td className="p-4 text-gray-400">{product.category || '-'}</td>
                      <td className="p-4 text-white font-medium">${(product.price || 0).toLocaleString()}</td>
                      <td className="p-4 text-gray-400">{product.stock ?? '-'}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status || 'Active')}`}>
                          {product.status || 'Active'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-white/5">
            <p className="text-gray-500 text-sm">Showing {filteredProducts.length} products</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm font-medium">1</button>
              <button className="px-3 py-1 rounded bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition-colors">2</button>
              <button className="px-3 py-1 rounded bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition-colors">3</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
