'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products, Product } from '@/lib/data';
import { formatINR } from '@/lib/pricing';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setResults(products.slice(0, 6)); // default suggestions
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(products.slice(0, 6));
      return;
    }
    const q = query.toLowerCase();
    const filtered = products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.wood_type.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickTags = ['Anime', 'Ram Mandir', 'Zoro', 'Shiva', 'Desk Organizer', 'Katana', 'Ganesha', 'Trophy'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-white border border-[#E8E2D9] rounded-xl shadow-2xl overflow-hidden text-[#1A110B]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-[#EBE5DC] p-4 flex items-center gap-3 bg-[#FAF8F5]">
          <svg className="w-5 h-5 text-[#B88E28] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search anime wood art, sacred deities, walnut desk caddies..."
            className="w-full bg-transparent text-[#1A110B] placeholder-[#8F8075] focus:outline-none text-base font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8F8075] hover:text-[#1A110B] text-xs px-2 py-1 rounded bg-[#F0EAE1]"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[#8F8075] hover:text-[#1A110B] p-1 text-sm rounded ml-1"
            aria-label="Close search"
          >
            ✕
          </button>
        </div>

        {/* Quick Filter Tag Chips */}
        <div className="px-4 py-2.5 bg-white border-b border-[#F0EAE1] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#8F8075] text-[11px] font-bold shrink-0">Popular:</span>
          {quickTags.map(tag => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[#4A3B32] hover:border-[#B88E28] hover:text-[#B88E28] transition-colors whitespace-nowrap text-[11px] font-medium"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-[#F0EAE1] bg-white">
          {results.length === 0 ? (
            <div className="py-12 text-center text-[#8F8075]">
              <p className="font-serif text-lg text-[#1A110B]">No wooden artifacts found</p>
              <p className="text-xs mt-1">Try searching for &quot;Zoro&quot;, &quot;Mandir&quot;, &quot;Katana&quot; or &quot;Organizer&quot;</p>
            </div>
          ) : (
            results.map(item => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                onClick={onClose}
                className="py-3 flex items-center gap-4 group hover:bg-[#FAF8F5] px-2 rounded-lg transition-colors"
              >
                <div className="relative w-14 h-14 rounded-md overflow-hidden border border-[#E8E2D9] bg-[#FAF8F5] shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-wider uppercase font-bold px-1.5 py-0.2 rounded bg-[#FCF8EC] border border-[#EAD79E] text-[#B88E28]">
                      {item.category}
                    </span>
                    {item.tag && (
                      <span className="text-[9px] uppercase tracking-wider text-[#8F8075]">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-[#1A110B] group-hover:text-[#B88E28] transition-colors text-sm sm:text-base font-bold truncate mt-0.5">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#8F8075] truncate">{item.subtitle}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-serif text-[#1A110B] font-bold text-sm">
                    {formatINR(item.price)}
                  </span>
                  {item.original_price && (
                    <span className="block text-[11px] text-[#8F8075] line-through">
                      {formatINR(item.original_price)}
                    </span>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
