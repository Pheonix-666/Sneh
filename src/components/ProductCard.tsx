'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { getProductPricing, formatINR } from '@/lib/pricing';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { addToCart, isInShortlist, toggleShortlist } = useCart();
  const { showToast } = useToast();

  const pricing = getProductPricing(product);
  const isShortlisted = isInShortlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showToast(`Added "${product.name}" to your bag.`, 'success');
  };

  const handleToggleShortlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleShortlist(product.id);
    showToast(
      isShortlisted
        ? `Removed from wishlist.`
        : `Added "${product.name}" to wishlist.`,
      'info'
    );
  };

  return (
    <>
      <div className="group relative bg-white border border-[#E2D6C8] rounded-xl hover:border-[#8A4F2E] transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1">
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          {pricing.discountPercent > 0 && (
            <span className="text-[10px] font-sans font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#DC2626] text-white shadow-sm">
              {pricing.discountPercent}% OFF
            </span>
          )}
          {product.tag && (
            <span className="text-[10px] font-sans font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-[#3D2214] text-[#F3E5D4] shadow-sm border border-[#6E3C22]">
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleShortlist}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm border transition-all ${
            isShortlisted
              ? 'bg-[#6E3C22] text-white border-[#6E3C22]'
              : 'bg-white/95 text-[#8A4F2E] border-[#DEC5B1] hover:text-[#DC2626] hover:border-[#DC2626] shadow-sm'
          }`}
          title={isShortlisted ? 'In wishlist' : 'Add to wishlist'}
          aria-label="Wishlist"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {/* Product Image Stage */}
        <div className="relative aspect-square w-full bg-[#FAF6F0] overflow-hidden border-b border-[#EFE7DE]">
          <Link href={`/products/${product.id}`} className="block w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>

          {/* Quick View Button on Hover */}
          <div className="absolute inset-x-0 bottom-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
            <button
              onClick={() => setQuickViewOpen(true)}
              className="w-full py-2 rounded-lg bg-white/95 backdrop-blur-sm border border-[#DEC5B1] text-[#3D2214] text-xs font-sans font-bold tracking-wide hover:bg-[#3D2214] hover:text-white transition-all shadow-md"
            >
              Quick View
            </button>
          </div>
        </div>

        {/* Details Area */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Category & Wood Species Badge */}
            <div className="flex items-center justify-between text-[11px] mb-1.5 gap-2">
              <span className="uppercase tracking-widest text-[#8A4F2E] font-bold">
                {product.category}
              </span>
              <span className="wood-pill text-[10px] px-2 py-0.5 rounded truncate max-w-[150px]">
                {product.wood_type}
              </span>
            </div>

            {/* Product Title */}
            <Link href={`/products/${product.id}`} className="block">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#24140B] group-hover:text-[#6E3C22] transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <div className="flex text-[#D97706]">
                {'★'.repeat(5)}
              </div>
              <span className="text-[11px] font-bold text-[#24140B]">{product.rating || 4.9}</span>
              <span className="text-[11px] text-[#8F796C]">({product.reviews_count || 32})</span>
            </div>

            {/* Delivery Promise */}
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#16A34A] font-semibold">
              <span>🚚 Free Express Delivery</span>
            </div>
          </div>

          {/* Price & Action Row */}
          <div className="pt-3 border-t border-[#EFE7DE] flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl font-bold text-[#24140B]">
                  {formatINR(pricing.discountedPrice)}
                </span>
                {pricing.originalPrice > pricing.discountedPrice && (
                  <span className="text-xs text-[#8F796C] line-through">
                    {formatINR(pricing.originalPrice)}
                  </span>
                )}
              </div>
              {pricing.savings > 0 && (
                <span className="block text-[10px] text-[#16A34A] font-bold">
                  Save {formatINR(pricing.savings)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="px-3.5 py-2 rounded-lg text-xs font-sans font-bold bg-[#3D2214] text-white hover:bg-[#6E3C22] transition-colors shadow-sm whitespace-nowrap"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>

      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
