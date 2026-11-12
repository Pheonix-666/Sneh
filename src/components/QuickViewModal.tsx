'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/data';
import { getProductPricing, formatINR } from '@/lib/pricing';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [engravingText, setEngravingText] = useState('');
  const [woodFinish, setWoodFinish] = useState('Natural Birch & Walnut');
  const [giftBox, setGiftBox] = useState(false);
  const [qty, setQty] = useState(1);

  const { addToCart, toggleShortlist, isInShortlist } = useCart();
  const { showToast } = useToast();
  const pricing = getProductPricing(product);
  const isShortlisted = isInShortlist(product.id);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addToCart(product, {
      woodFinish,
      customEngraving: engravingText,
      giftBox,
      qty,
    });
    showToast(`Added ${qty}x "${product.name}" to cart.`, 'success');
    onClose();
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919137773967';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Sneh Enterprises! I would like to order: ${product.name} (${formatINR(pricing.discountedPrice)})\n` +
      `- Wood Finish: ${woodFinish}\n` +
      `- Custom Engraving: ${engravingText || 'None'}\n` +
      `- Quantity: ${qty}\n` +
      `Please confirm stock and dispatch schedule.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-[#E8E2D9] rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white border border-[#E8E2D9] text-[#6B5E55] hover:text-[#1A110B] flex items-center justify-center shadow-sm"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Left Column: Product Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col bg-[#FAF8F5] border-b md:border-b-0 md:border-r border-[#EBE5DC]">
          <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-[#E8E2D9] bg-white shadow-sm">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {pricing.discountPercent > 0 && (
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[11px] font-bold tracking-wider bg-[#DC2626] text-white shadow-sm">
                {pricing.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-14 h-14 rounded-md overflow-hidden border-2 transition-all bg-white ${
                    selectedImage === img ? 'border-[#B88E28] scale-105 shadow-sm' : 'border-[#E8E2D9] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          )}

          {/* Specs Mini Strip */}
          <div className="mt-4 pt-3 border-t border-[#E8E2D9] grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[#8F8075] block text-[10px] uppercase font-bold tracking-wider">Dimensions</span>
              <span className="text-[#1A110B] font-semibold">{product.dimensions}</span>
            </div>
            <div>
              <span className="text-[#8F8075] block text-[10px] uppercase font-bold tracking-wider">Wood Species</span>
              <span className="text-[#1A110B] font-semibold">{product.wood_type}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Customization & Actions */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4 bg-white text-[#1A110B]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-widest uppercase text-[#B88E28] font-bold font-sans px-2 py-0.5 rounded bg-[#FCF8EC] border border-[#EAD79E]">
                {product.category}
              </span>
              <span className="text-xs text-[#16A34A] flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span> In Stock · Handcrafted
              </span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#1A110B] mt-2 leading-tight">
              {product.name}
            </h2>
            <p className="text-xs text-[#8F8075] mt-1">{product.subtitle}</p>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 mt-3 p-3 bg-[#FAF8F5] rounded-lg border border-[#EBE5DC]">
              <span className="font-serif text-2xl font-bold text-[#1A110B]">
                {formatINR(pricing.discountedPrice)}
              </span>
              {pricing.originalPrice > pricing.discountedPrice && (
                <span className="text-sm text-[#8F8075] line-through">
                  {formatINR(pricing.originalPrice)}
                </span>
              )}
              {pricing.discountPercent > 0 && (
                <span className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
                  Save {formatINR(pricing.savings)}
                </span>
              )}
            </div>

            <p className="text-xs text-[#4A3B32] mt-3 leading-relaxed border-t border-[#F0EAE1] pt-3">
              {product.description}
            </p>

            {/* Wood Finish Options */}
            <div className="mt-4">
              <label className="block text-xs font-sans text-[#1A110B] mb-1.5 font-bold uppercase tracking-wider text-[10px]">
                Select Wood Finish &amp; Tone:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Natural Birch & Walnut', 'Smoked Teakwood', 'Espresso Hardwood'].map(finish => (
                  <button
                    key={finish}
                    onClick={() => setWoodFinish(finish)}
                    className={`py-2 px-3 rounded-md text-left border transition-all ${
                      woodFinish === finish
                        ? 'border-[#B88E28] bg-[#FCF8EC] text-[#96721A] font-bold shadow-sm'
                        : 'border-[#E8E2D9] bg-white text-[#4A3B32] hover:border-[#B88E28]'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Engraving */}
            {product.personalization_allowed && (
              <div className="mt-4 bg-[#FAF8F5] p-3 rounded-lg border border-[#EBE5DC]">
                <label className="block text-xs font-sans text-[#1A110B] font-bold flex items-center justify-between">
                  <span>Custom Laser Engraving:</span>
                  <span className="text-[10px] text-[#16A34A] font-semibold">FREE</span>
                </label>
                <input
                  type="text"
                  maxLength={40}
                  value={engravingText}
                  onChange={e => setEngravingText(e.target.value)}
                  placeholder="e.g. 'To Arjun · Shinzou wo Sasageyo' or Mantra"
                  className="mt-1.5 w-full bg-white border border-[#D5CBC0] rounded-md px-3 py-1.5 text-xs text-[#1A110B] placeholder-[#8F8075] focus:outline-none focus:border-[#B88E28]"
                />
                {engravingText && (
                  <div className="mt-2 text-[11px] text-[#4A3B32] p-2 rounded bg-white border border-[#EAD79E] font-serif italic text-center">
                    Preview: &ldquo;{engravingText}&rdquo;
                  </div>
                )}
              </div>
            )}

            {/* Gift Box */}
            <div className="mt-3 flex items-center gap-2 text-xs text-[#4A3B32]">
              <input
                type="checkbox"
                id={`gift-box-${product.id}`}
                checked={giftBox}
                onChange={e => setGiftBox(e.target.checked)}
                className="rounded border-[#D5CBC0] text-[#B88E28] focus:ring-0"
              />
              <label htmlFor={`gift-box-${product.id}`} className="cursor-pointer">
                Add Premium Solid Pine Keepsake Gift Box (+₹350)
              </label>
            </div>
          </div>

          {/* CTA Row */}
          <div className="pt-4 border-t border-[#F0EAE1] space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#D5CBC0] rounded-md bg-white">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-2.5 py-1 text-[#4A3B32] hover:text-[#B88E28]"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-[#1A110B]">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-2.5 py-1 text-[#4A3B32] hover:text-[#B88E28]">
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-2.5 rounded-md text-xs uppercase font-sans font-bold tracking-wider gold-btn"
              >
                Add to Bag · {formatINR((pricing.discountedPrice + (giftBox ? 350 : 0)) * qty)}
              </button>

              <button
                onClick={() => toggleShortlist(product.id)}
                className={`p-2.5 rounded-md border ${
                  isShortlisted ? 'bg-[#B88E28] text-white border-[#B88E28]' : 'border-[#E8E2D9] text-[#4A3B32] hover:text-[#B88E28]'
                }`}
                title="Wishlist"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16A34A] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Order via WhatsApp Direct →</span>
              </a>
              <Link
                href={`/products/${product.id}`}
                onClick={onClose}
                className="text-[#8F8075] hover:text-[#B88E28] underline underline-offset-2"
              >
                Full Product Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
