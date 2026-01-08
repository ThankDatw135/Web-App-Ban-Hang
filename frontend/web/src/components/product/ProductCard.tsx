'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link href={`/products/${product.id}`} className="group block">
        <div className="relative overflow-hidden bg-dark-surface rounded-sm">
          {/* Product Image */}
          <div className="aspect-product relative overflow-hidden">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-slow ease-elegant group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-dark-bg animate-pulse" />
            )}
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-medium" />
            
            {/* Discount badge */}
            {discount > 0 && (
              <span className="absolute top-3 left-3 px-2 py-1 bg-muted-gold text-charcoal text-xs font-medium">
                -{discount}%
              </span>
            )}
            
            {/* Quick view button */}
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-medium ease-elegant">
              <button className="w-full py-2 bg-ivory text-charcoal text-sm font-medium hover:bg-warm-white transition-colors">
                Quick View
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <p className="text-xs text-soft-gray uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <h3 className="font-serif text-lg text-ivory group-hover:text-muted-gold transition-colors line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-ivory font-medium">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-soft-gray text-sm line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
