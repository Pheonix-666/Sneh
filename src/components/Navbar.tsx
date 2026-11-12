'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import SearchModal from './SearchModal';
import ShortlistDrawer from './ShortlistDrawer';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shortlistOpen, setShortlistOpen] = useState(false);

  const pathname = usePathname();
  const { cartCount, shortlistCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global search shortcut Cmd+K or /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919137773967';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Sneh Enterprises, I would like to inquire about handcrafted wooden gifts and custom laser engraving.'
  )}`;

  return (
    <>
      {/* Top Warm Wood Announcement Ticker */}
      <div className="bg-[#3D2214] text-[#F3E5D4] text-xs py-2 px-4 text-center font-sans tracking-wide flex items-center justify-center gap-3 border-b border-[#5C321E]">
        <span className="hidden sm:inline">✨ <strong>FESTIVE SALE:</strong> Use Code <span className="underline font-bold text-[#EAD79E]">WOOD10</span> for 10% OFF</span>
        <span className="hidden md:inline text-[#8A4F2E]">|</span>
        <span>🚚 Free Express Crated Delivery Pan-India Over ₹999</span>
        <span className="hidden sm:inline text-[#8A4F2E]">|</span>
        <span className="hidden sm:inline">⚡ Complimentary Custom Laser Engraving</span>
      </div>

      {/* Main E-Commerce Header with Warm Wood Undertones */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white border-b border-[#E2D6C8] ${
          scrolled ? 'shadow-md py-2.5' : 'py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Bar: Logo, Search Bar, Wishlist/Bag */}
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            
            {/* Brand Logo with Rich Wood Emblem */}
            <Link href="/" className="group flex items-center gap-2.5 shrink-0">
              <div className="w-10 h-10 rounded-lg border border-[#8A4F2E]/40 bg-[#3D2214] flex items-center justify-center shadow-sm group-hover:bg-[#5C321E] transition-colors">
                <span className="text-[#EAD79E] font-serif text-2xl font-bold">S</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#24140B] group-hover:text-[#6E3C22] transition-colors">
                  Sneh Enterprises
                </span>
                <span className="block text-[9px] tracking-widest uppercase text-[#8A4F2E] font-sans font-bold">
                  Artisan Woodcraft &amp; Gifts
                </span>
              </div>
            </Link>

            {/* E-Commerce Search Bar in Center (Prominent) */}
            <div className="hidden md:flex flex-1 max-w-lg">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="w-full flex items-center justify-between bg-[#FAF6F0] hover:bg-[#F2EAE1] border border-[#D8C2B0] rounded-full px-4 py-2 text-xs text-[#7A6253] transition-all shadow-inner"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#8A4F2E]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search anime 3D panels, Ram Mandir altars, desk organizers...</span>
                </div>
                <kbd className="hidden lg:inline bg-white border border-[#DEC5B1] px-1.5 py-0.5 rounded text-[10px] text-[#5C321E] font-mono">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3 sm:gap-5">
              
              {/* Mobile Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden p-2 text-[#4A2818] hover:text-[#8A4F2E]"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* WhatsApp Concierge */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 text-xs text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-1.5 rounded-full font-semibold hover:bg-[#DCFCE7] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span>WhatsApp Help</span>
              </a>

              {/* Wishlist Button */}
              <button
                onClick={() => setShortlistOpen(true)}
                className="relative p-2 text-[#4A2818] hover:text-[#6E3C22] transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Wishlist / Quote Shortlist"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="hidden sm:inline">Wishlist</span>
                {shortlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#6E3C22] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {shortlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button (Rich Walnut Brown) */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 bg-[#3D2214] hover:bg-[#5C321E] text-white px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Bag</span>
                <span className="bg-[#B88E28] text-white text-[10px] font-bold rounded-full px-1.5 py-0.2">
                  {cartCount}
                </span>
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#4A2818] hover:text-[#6E3C22]"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* E-Commerce Category Subnav Bar (with warm wood styling) */}
          <nav className="hidden lg:flex items-center justify-center gap-7 pt-2.5 mt-2 border-t border-[#EFE7DE] text-xs font-sans tracking-wide">
            <Link
              href="/"
              className={`hover:text-[#6E3C22] transition-colors py-1 ${
                pathname === '/' ? 'text-[#6E3C22] font-bold border-b-2 border-[#6E3C22]' : 'text-[#4A2818] font-medium'
              }`}
            >
              All Categories
            </Link>
            <Link
              href="/products?category=anime"
              className={`hover:text-[#6E3C22] transition-colors py-1 flex items-center gap-1.5 ${
                pathname.includes('category=anime') ? 'text-[#6E3C22] font-bold border-b-2 border-[#6E3C22]' : 'text-[#4A2818] font-medium'
              }`}
            >
              <span>Anime Wooden Art</span>
              <span className="bg-[#F7EFE7] text-[#6E3C22] border border-[#DEC5B1] text-[9px] font-bold px-1.5 py-0.2 rounded">
                HOT
              </span>
            </Link>
            <Link
              href="/products?category=gods"
              className={`hover:text-[#6E3C22] transition-colors py-1 ${
                pathname.includes('category=gods') ? 'text-[#6E3C22] font-bold border-b-2 border-[#6E3C22]' : 'text-[#4A2818] font-medium'
              }`}
            >
              Sacred Deities &amp; Temples
            </Link>
            <Link
              href="/products?category=desk"
              className={`hover:text-[#6E3C22] transition-colors py-1 ${
                pathname.includes('category=desk') ? 'text-[#6E3C22] font-bold border-b-2 border-[#6E3C22]' : 'text-[#4A2818] font-medium'
              }`}
            >
              Executive Desk Organizers
            </Link>
            <Link
              href="/products?category=trophies"
              className={`hover:text-[#6E3C22] transition-colors py-1 ${
                pathname.includes('category=trophies') ? 'text-[#6E3C22] font-bold border-b-2 border-[#6E3C22]' : 'text-[#4A2818] font-medium'
              }`}
            >
              Trophies &amp; Awards
            </Link>
            <Link
              href="/products"
              className={`hover:text-[#6E3C22] transition-colors py-1 ${
                pathname === '/products' && !pathname.includes('category') ? 'text-[#6E3C22] font-bold border-b-2 border-[#6E3C22]' : 'text-[#4A2818] font-medium'
              }`}
            >
              All 24 Creations
            </Link>
            <Link
              href="/about"
              className="text-[#8A4F2E] hover:text-[#3D2214] transition-colors py-1 font-medium ml-auto"
            >
              Our Craft &amp; Story
            </Link>
          </nav>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E2D6C8] px-4 pt-3 pb-6 animate-slide-in shadow-xl">
            <div className="flex flex-col gap-3 font-sans text-sm">
              <Link href="/" className="py-2 text-[#24140B] font-bold border-b border-gray-100">
                Home / All Categories
              </Link>
              <Link href="/products?category=anime" className="py-2 text-[#4A2818] font-semibold border-b border-gray-100 flex items-center justify-between">
                <span>Anime Wooden Art</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F7EFE7] text-[#6E3C22] font-bold border border-[#DEC5B1]">HOT</span>
              </Link>
              <Link href="/products?category=gods" className="py-2 text-[#4A2818] font-semibold border-b border-gray-100">
                Sacred Deities &amp; Mandir Altars
              </Link>
              <Link href="/products?category=desk" className="py-2 text-[#4A2818] font-semibold border-b border-gray-100">
                Desk Organizers &amp; Docks
              </Link>
              <Link href="/products?category=trophies" className="py-2 text-[#4A2818] font-semibold border-b border-gray-100">
                Trophies &amp; Plaques
              </Link>
              <Link href="/products" className="py-2 text-[#4A2818] font-semibold border-b border-gray-100">
                Explore All Products
              </Link>
              <Link href="/about" className="py-2 text-[#8A4F2E] border-b border-gray-100">
                About Workshop &amp; Guarantee
              </Link>
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block bg-[#25D366] text-white py-2.5 rounded-lg font-bold text-xs"
                >
                  Chat with Woodsmith on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ShortlistDrawer isOpen={shortlistOpen} onClose={() => setShortlistOpen(false)} />
    </>
  );
}
