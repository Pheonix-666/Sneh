'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { products } from '@/lib/data';
import { formatINR } from '@/lib/pricing';

interface ShortlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortlistDrawer({ isOpen, onClose }: ShortlistDrawerProps) {
  const { shortlist, toggleShortlist, clearShortlist, addToCart } = useCart();

  if (!isOpen) return null;

  const shortlistedItems = products.filter(p => shortlist.includes(p.id));
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919137773967';

  const generateWhatsAppMessage = () => {
    if (shortlistedItems.length === 0) return '';
    let msg = `Hello Sneh Enterprises! I am interested in these handcrafted wooden items from your catalog:\n\n`;
    shortlistedItems.forEach((item, index) => {
      msg += `${index + 1}. ${item.name} (${formatINR(item.price)})\n   - Material: ${item.wood_type}\n`;
    });
    msg += `\nPlease let me know about bulk pricing, custom laser engraving, and delivery timeline. Thank you!`;
    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex justify-end">
      <div
        className="w-full max-w-md bg-white border-l border-[#E8E2D9] h-full shadow-2xl flex flex-col text-[#1A110B]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#EBE5DC] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#B88E28]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="font-serif text-lg font-bold text-[#1A110B]">Wishlist &amp; Quote Shortlist</h3>
            <span className="text-xs bg-[#B88E28] text-white font-bold px-2 py-0.5 rounded-full">
              {shortlistedItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#8F8075] hover:text-[#1A110B] text-lg p-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
          {shortlistedItems.length === 0 ? (
            <div className="py-20 text-center text-[#8F8075] space-y-3">
              <div className="w-12 h-12 rounded-full border border-[#D5CBC0] flex items-center justify-center mx-auto text-[#B88E28]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="font-serif text-base text-[#1A110B] font-bold">Your wishlist is empty</h4>
              <p className="text-xs text-[#8F8075] max-w-xs mx-auto">
                Click the heart icon on any anime or deity wooden piece to save items for comparison or WhatsApp quotation.
              </p>
              <Link
                href="/products"
                onClick={onClose}
                className="inline-block mt-2 px-5 py-2.5 rounded-md text-xs gold-btn uppercase tracking-wider font-bold"
              >
                Browse Creations
              </Link>
            </div>
          ) : (
            shortlistedItems.map(item => (
              <div
                key={item.id}
                className="p-3 rounded-lg border border-[#E8E2D9] bg-[#FAF8F5] flex items-center gap-3 group relative"
              >
                <div className="relative w-16 h-16 rounded-md overflow-hidden border border-[#E8E2D9] bg-white shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <h5 className="font-serif text-sm font-bold text-[#1A110B] truncate group-hover:text-[#B88E28] transition-colors">
                    {item.name}
                  </h5>
                  <p className="text-[11px] text-[#8F8075] truncate">{item.wood_type}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-serif text-[#1A110B] font-bold text-sm">{formatINR(item.price)}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="text-[11px] text-[#B88E28] font-bold hover:underline"
                    >
                      + Move to Bag
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => toggleShortlist(item.id)}
                  className="absolute top-2 right-2 text-[#8F8075] hover:text-[#DC2626] p-1"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {shortlistedItems.length > 0 && (
          <div className="p-4 border-t border-[#EBE5DC] bg-[#FAF8F5] space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-sans font-bold py-3 px-4 rounded-md text-sm transition-all shadow-sm"
            >
              <span>Instant WhatsApp Quote ({shortlistedItems.length} items)</span>
            </a>

            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                onClick={clearShortlist}
                className="text-[#8F8075] hover:text-[#DC2626] transition-colors"
              >
                Clear Wishlist
              </button>
              <Link
                href="/cart"
                onClick={onClose}
                className="text-[#B88E28] font-bold hover:underline"
              >
                View Shopping Bag →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
