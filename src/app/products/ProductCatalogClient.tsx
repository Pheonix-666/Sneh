'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, CATEGORIES } from '@/lib/data';

export default function ProductCatalogClient() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<'featured' | 'low-to-high' | 'high-to-low' | 'rating'>('featured');
  const [selectedWood, setSelectedWood] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Wood filter
        if (selectedWood !== 'all' && !p.wood_type.toLowerCase().includes(selectedWood.toLowerCase())) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.subtitle.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.wood_type.toLowerCase().includes(q);
          if (!matches) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'low-to-high') return a.price - b.price;
        if (sortBy === 'high-to-low') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
        return 0; // featured
      });
  }, [selectedCategory, selectedWood, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A110B] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb & Header */}
        <div className="border-b border-[#E8E2D9] pb-6 mb-6">
          <div className="text-xs font-sans uppercase tracking-widest text-[#8F8075] mb-2 font-bold">
            <span className="text-[#B88E28]">Sneh Enterprises</span> / Store Catalog / {selectedCategory.toUpperCase()}
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A110B]">
            All Artisan Woodcraft ({filteredProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5E55] mt-1.5 max-w-2xl">
            Multi-layered anime manga dioramas, sacred deity altars, and personalized desk accessories with complimentary laser engraving.
          </p>
        </div>

        {/* Filter Controls Bar (E-Commerce Style) */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-[#E8E2D9] shadow-sm">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by deity, anime, wood type..."
              className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-lg px-3.5 py-2 text-xs text-[#1A110B] placeholder-[#8F8075] focus:outline-none focus:border-[#B88E28]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F8075] hover:text-[#1A110B] text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Category Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#8F8075] font-semibold">Category:</span>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="bg-white border border-[#D5CBC0] rounded-lg px-3 py-1.5 text-[#1A110B] font-medium focus:outline-none focus:border-[#B88E28]"
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Wood Species Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#8F8075] font-semibold">Wood:</span>
              <select
                value={selectedWood}
                onChange={e => setSelectedWood(e.target.value)}
                className="bg-white border border-[#D5CBC0] rounded-lg px-3 py-1.5 text-[#1A110B] font-medium focus:outline-none focus:border-[#B88E28]"
              >
                <option value="all">All Woods</option>
                <option value="walnut">American Walnut</option>
                <option value="birch">Baltic Birch</option>
                <option value="teak">Burma Teak</option>
                <option value="sheesham">Indian Rosewood</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#8F8075] font-semibold">Sort By:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-white border border-[#D5CBC0] rounded-lg px-3 py-1.5 text-[#1A110B] font-medium focus:outline-none focus:border-[#B88E28]"
              >
                <option value="featured">Featured Curations</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-[#8F8075] mb-6">
          <span>Showing {filteredProducts.length} handcrafted wooden pieces</span>
          {(selectedCategory !== 'all' || selectedWood !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedWood('all');
                setSearchQuery('');
              }}
              className="text-[#B88E28] font-bold hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center border border-[#E8E2D9] rounded-xl bg-white p-8 space-y-3">
            <h3 className="font-serif text-2xl text-[#1A110B] font-bold">No products found</h3>
            <p className="text-xs text-[#8F8075]">
              Try searching with different keywords or clearing your active filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedWood('all');
                setSearchQuery('');
              }}
              className="mt-3 px-5 py-2.5 rounded-md text-xs gold-btn uppercase tracking-wider font-bold"
            >
              Reset Filters &amp; View All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
