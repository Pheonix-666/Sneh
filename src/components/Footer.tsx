import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A110B] text-white border-t border-[#B88E28]/30 relative overflow-hidden font-sans">
      {/* Trust Badges Strip (E-Commerce Highlights) */}
      <div className="border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-2xl text-[#D4AF37]">❖</span>
            <h4 className="font-serif text-sm font-bold text-[#EAD79E]">100% Solid Hardwoods</h4>
            <p className="text-[11px] text-[#A8988C]">Certified Baltic Birch, Burma Teak &amp; Walnut</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl text-[#D4AF37]">✦</span>
            <h4 className="font-serif text-sm font-bold text-[#EAD79E]">0.05mm Laser Precision</h4>
            <p className="text-[11px] text-[#A8988C]">Multi-layer architectural 3D depth</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl text-[#D4AF37]">◈</span>
            <h4 className="font-serif text-sm font-bold text-[#EAD79E]">Free Laser Engraving</h4>
            <p className="text-[11px] text-[#A8988C]">Personalize with quotes, mantras &amp; names</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl text-[#D4AF37]">🚚</span>
            <h4 className="font-serif text-sm font-bold text-[#EAD79E]">Pan-India Crated Shipping</h4>
            <p className="text-[11px] text-[#A8988C]">Zero transit breakage guarantee</p>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded border border-[#B88E28]/40 bg-[#2A1810] flex items-center justify-center shadow-sm">
                <span className="text-[#D4AF37] font-serif text-2xl font-bold">S</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold tracking-wide text-white">
                  Sneh Enterprises
                </span>
                <span className="block text-[10px] tracking-widest uppercase text-[#D4AF37]">
                  Master Woodcraft Atelier · Est. 2026
                </span>
              </div>
            </div>

            <p className="text-xs text-[#C5B7A8] max-w-sm leading-relaxed">
              India&apos;s premier boutique woodcraft atelier. We combine Japanese manga pop-culture iconographies and timeless Indian temple sanctums in seasoned solid timber.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/919137773967"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-[#1A110B] px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-[#1EBE5D] transition-colors"
              >
                <span>WhatsApp Concierge: +91 91377 73967</span>
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#C5B7A8]">
              <li>
                <Link href="/products?category=anime" className="hover:text-white transition-colors">
                  Anime 3D Manga Panels
                </Link>
              </li>
              <li>
                <Link href="/products?category=anime" className="hover:text-white transition-colors">
                  Demon Slayer Katana Displays
                </Link>
              </li>
              <li>
                <Link href="/products?category=gods" className="hover:text-white transition-colors">
                  Ayodhya Ram Mandir Altars
                </Link>
              </li>
              <li>
                <Link href="/products?category=gods" className="hover:text-white transition-colors">
                  Shiva Nataraja Laser Frames
                </Link>
              </li>
              <li>
                <Link href="/products?category=desk" className="hover:text-white transition-colors">
                  Executive Desk Organizers
                </Link>
              </li>
              <li>
                <Link href="/products?category=trophies" className="hover:text-white transition-colors">
                  Corporate Trophies &amp; Awards
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#C5B7A8]">
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors">
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns-exchange" className="hover:text-white transition-colors">
                  Returns &amp; Replacements
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Bespoke Corporate Quotes
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#D4AF37] hover:underline font-semibold">
                  Workshop Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
              100% Secure Payments
            </h4>
            <p className="text-xs text-[#C5B7A8] leading-relaxed mb-3">
              We accept all major payment modes: Instant UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and Cash on Delivery.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-[#2A1810]">
              <span className="bg-white px-2 py-0.5 rounded">UPI</span>
              <span className="bg-white px-2 py-0.5 rounded">GPay</span>
              <span className="bg-white px-2 py-0.5 rounded">PhonePe</span>
              <span className="bg-white px-2 py-0.5 rounded">COD</span>
              <span className="bg-white px-2 py-0.5 rounded">Cards</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8988C] gap-3">
          <p>© {currentYear} Sneh Enterprises. Handcrafted with reverence in India.</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>100% Seasoned Hardwoods</span>
            <span>·</span>
            <span>Safe Transit Crated Packaging</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
