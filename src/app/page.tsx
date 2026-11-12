'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import EngravingStudio from '@/components/EngravingStudio';
import { products, CATEGORIES } from '@/lib/data';
import { formatINR } from '@/lib/pricing';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919137773967';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Sneh Enterprises, I would like to inquire about handcrafted wooden gifts and bespoke commissions.'
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1F140E] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        
        {/* E-COMMERCE HERO BANNER SECTION (White with Warm Timber Undertones) */}
        <section className="relative bg-white border-b border-[#E2D6C8] py-12 sm:py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Value Prop & CTAs */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Social Proof Badge in Warm Wood Tint */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7EFE7] border border-[#DEC5B1] text-xs font-bold text-[#5C321E]">
                  <span className="flex text-[#D97706]">{'★'.repeat(5)}</span>
                  <span>Rated 4.9/5 by 1,200+ Woodcraft Patrons</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1A100A] leading-[1.12]">
                  Handcrafted Wooden Gifts for <span className="text-[#6E3C22]">Anime Connoisseurs</span> &amp; Sacred Temples
                </h1>

                <p className="text-sm sm:text-base text-[#6E584B] max-w-xl font-normal leading-relaxed">
                  Multi-layered 3D manga shadowboxes, Ayodhya Ram Mandir altars, and bespoke laser-carved executive desk accessories. Sculpted from genuine seasoned hardwoods.
                </p>

                {/* E-Commerce CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#catalog"
                    className="px-7 py-3.5 rounded-lg text-xs sm:text-sm font-sans uppercase font-bold tracking-wider gold-btn flex items-center gap-2"
                  >
                    <span>Shop All 24 Collections</span>
                    <span>→</span>
                  </a>
                  <Link
                    href="/products?category=anime"
                    className="px-5 py-3.5 rounded-lg text-xs sm:text-sm font-sans font-bold text-[#3D2214] bg-[#F7EFE7] hover:bg-[#EFE3D5] border border-[#D8C2B0] transition-colors"
                  >
                    Anime 3D Art
                  </Link>
                  <Link
                    href="/products?category=gods"
                    className="px-5 py-3.5 rounded-lg text-xs sm:text-sm font-sans font-bold text-[#3D2214] bg-[#F7EFE7] hover:bg-[#EFE3D5] border border-[#D8C2B0] transition-colors"
                  >
                    Sacred Deities
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="pt-6 border-t border-[#EFE7DE] grid grid-cols-3 gap-4 text-xs">
                  <div className="space-y-0.5">
                    <span className="block font-bold text-[#24140B]">🚚 Free Crated Delivery</span>
                    <span className="text-[11px] text-[#8F796C]">Pan-India over ₹999</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block font-bold text-[#24140B]">✦ Free Laser Inscription</span>
                    <span className="text-[11px] text-[#8F8075]">Quotes &amp; Mantras</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block font-bold text-[#24140B]">🛡️ 100% Solid Timber</span>
                    <span className="text-[11px] text-[#8F796C]">No fake veneers</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Featured Product Card with Warm Wood Border */}
              <div className="lg:col-span-5">
                <div className="bg-white border-2 border-[#8A4F2E]/40 rounded-2xl p-5 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-4 right-4 z-10 bg-[#DC2626] text-white text-xs font-bold px-2.5 py-1 rounded shadow">
                    SAVE 29%
                  </div>

                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF6F0] border border-[#E2D6C8]">
                    <Image
                      src="/catalog/Frame1.jpeg"
                      alt="Zoro Asura 3D Manga Panel"
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#6E3C22] bg-[#F7EFE7] px-2.5 py-0.5 rounded border border-[#DEC5B1]">
                        ✦ Masterpiece Drop
                      </span>
                      <span className="text-[#16A34A] font-semibold text-xs">⚡ Ready for 24h Dispatch</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#24140B]">
                      Roronoa Zoro &ldquo;Asura&rdquo; 7-Layer 3D Wooden Manga Box
                    </h3>

                    <p className="text-xs text-[#6E584B] line-clamp-2">
                      Museum-grade Baltic Birch &amp; smoked walnut tiers with anti-reflective UV acrylic.
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="font-serif text-2xl font-bold text-[#24140B]">₹2,499</span>
                        <span className="text-xs text-[#8F796C] line-through ml-2">₹3,499</span>
                      </div>
                      <Link
                        href="/products/anime-1"
                        className="px-4 py-2 rounded-lg text-xs uppercase font-bold tracking-wider gold-btn"
                      >
                        View &amp; Customize
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4 REASONS TO SHOP WITH US (With Warm Wood Brown Icons) */}
        <section className="bg-[#FAF6F0] py-8 border-b border-[#E2D6C8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#E2D6C8] shadow-sm">
                <span className="text-2xl text-[#6E3C22]">🪵</span>
                <div>
                  <h4 className="text-xs font-bold text-[#24140B]">Seasoned Hardwood</h4>
                  <p className="text-[11px] text-[#8F796C]">Teak, Birch &amp; Walnut</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#E2D6C8] shadow-sm">
                <span className="text-2xl text-[#6E3C22]">🎯</span>
                <div>
                  <h4 className="text-xs font-bold text-[#24140B]">Micro-Laser Accuracy</h4>
                  <p className="text-[11px] text-[#8F796C]">0.05mm contour scoring</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#E2D6C8] shadow-sm">
                <span className="text-2xl text-[#6E3C22]">✍️</span>
                <div>
                  <h4 className="text-xs font-bold text-[#24140B]">Free Custom Engraving</h4>
                  <p className="text-[11px] text-[#8F796C]">Add names &amp; slokas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#E2D6C8] shadow-sm">
                <span className="text-2xl text-[#6E3C22]">📦</span>
                <div>
                  <h4 className="text-xs font-bold text-[#24140B]">Safe Crated Transit</h4>
                  <p className="text-[11px] text-[#8F796C]">Zero breakage guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TWO PROMINENT CATEGORY TILES (with Warm Wood Brown Headers) */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Anime Woodcraft Banner */}
            <div className="bg-white rounded-2xl border border-[#E2D6C8] p-8 shadow-sm flex flex-col justify-between group hover:border-[#8A4F2E] transition-all">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E3C22] bg-[#F7EFE7] border border-[#DEC5B1] px-2.5 py-0.5 rounded-md">
                  Anime Collector Line
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#24140B] mt-3">
                  3D Manga Panels &amp; Katana Displays
                </h3>
                <p className="text-xs sm:text-sm text-[#6E584B] mt-2 max-w-md">
                  One Piece, Demon Slayer, Jujutsu Kaisen, and Attack on Titan recreated across stepped architectural wooden tiers.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/products?category=anime"
                  className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#6E3C22] hover:text-[#3D2214]"
                >
                  <span>Explore Anime Series (8 Products)</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Sacred Deities Banner */}
            <div className="bg-white rounded-2xl border border-[#E2D6C8] p-8 shadow-sm flex flex-col justify-between group hover:border-[#8A4F2E] transition-all">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E3C22] bg-[#F7EFE7] border border-[#DEC5B1] px-2.5 py-0.5 rounded-md">
                  Divine Heritage Line
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#24140B] mt-3">
                  Ayodhya Ram Mandir &amp; Sacred Deities
                </h3>
                <p className="text-xs sm:text-sm text-[#6E584B] mt-2 max-w-md">
                  Vedic temple sanctums, 9-tier architectural altars with warm indirect lighting, Nataraja cosmic dance frames, and Ganesha reliefs.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/products?category=gods"
                  className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#6E3C22] hover:text-[#3D2214]"
                >
                  <span>Explore Sacred Deities (6 Products)</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* MAIN PRODUCT CATALOG (White Cards, Warm Wood Highlights) */}
        <section id="catalog" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#E2D6C8] gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#6E3C22]">
                Boutique Collection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#24140B] mt-1">
                Explore Signature Woodcraft
              </h2>
            </div>

            {/* Category Filter Chips with Warm Wood Active State */}
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeCategory === cat.value
                      ? 'bg-[#3D2214] text-white shadow-sm'
                      : 'bg-white text-[#4A2818] border border-[#D8C2B0] hover:border-[#6E3C22]'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </section>

        {/* INTERACTIVE ENGRAVING STUDIO */}
        <EngravingStudio />

        {/* COLLECTOR TESTIMONIALS */}
        <section className="py-16 bg-[#FAF6F0] border-t border-[#E2D6C8] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#6E3C22]">
                Customer Love
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#24140B] mt-1">
                What Collectors Are Saying
              </h2>
              <div className="gold-rule"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-[#E2D6C8] bg-white shadow-sm space-y-3">
                <div className="text-[#D97706] text-sm tracking-widest">★★★★★</div>
                <p className="text-xs text-[#4A2818] leading-relaxed italic font-serif">
                  &ldquo;The Ayodhya Ram Mandir 9-tier altar arrived in custom foam crating. When the warm backlight is illuminated in our home mandir, the depth is astonishing.&rdquo;
                </p>
                <div className="pt-2 border-t border-[#EFE7DE] text-xs">
                  <span className="font-bold text-[#24140B] block">Aditya Sharma</span>
                  <span className="text-[10px] text-[#8F796C]">Verified Buyer · Lucknow</span>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-[#E2D6C8] bg-white shadow-sm space-y-3">
                <div className="text-[#D97706] text-sm tracking-widest">★★★★★</div>
                <p className="text-xs text-[#4A2818] leading-relaxed italic font-serif">
                  &ldquo;The Zoro Asura 7-layer shadowbox is the centerpiece of my manga room. The contrast between birch and dark walnut is genuine heirloom quality.&rdquo;
                </p>
                <div className="pt-2 border-t border-[#EFE7DE] text-xs">
                  <span className="font-bold text-[#24140B] block">Kavita Menon</span>
                  <span className="text-[10px] text-[#8F796C]">Anime Collector · Bengaluru</span>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-[#E2D6C8] bg-white shadow-sm space-y-3">
                <div className="text-[#D97706] text-sm tracking-widest">★★★★★</div>
                <p className="text-xs text-[#4A2818] leading-relaxed italic font-serif">
                  &ldquo;We ordered 40 Five-Star Royal Shield trophies for our annual corporate leadership summit. The laser engraving of our company logo and citations was crisp and flawless.&rdquo;
                </p>
                <div className="pt-2 border-t border-[#EFE7DE] text-xs">
                  <span className="font-bold text-[#24140B] block">Rajiv Oberoi</span>
                  <span className="text-[10px] text-[#8F796C]">VP HR · Mumbai</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INSTANT WHATSAPP COMMISSION BANNER */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="rounded-2xl border-2 border-[#8A4F2E]/30 p-8 sm:p-12 bg-white text-center space-y-4 shadow-lg">
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#24140B]">
              Need a Custom Anime Scene or Temple Specification?
            </h3>
            <p className="text-xs sm:text-sm text-[#6E584B] max-w-xl mx-auto">
              Our lead craftsman can design and cut custom dimensions, personalized family crests, or corporate batch trophies. Connect with us on WhatsApp for instant 3D design renders and bulk estimates.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg text-xs uppercase font-bold tracking-wider bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Chat with Craftsman on WhatsApp (+91 91377 73967)</span>
              </a>
              <Link
                href="/products"
                className="px-6 py-3 rounded-lg text-xs uppercase font-bold tracking-wider wood-btn"
              >
                Explore Full Catalog
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
