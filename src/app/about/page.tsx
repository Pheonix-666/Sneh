import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Our Heritage & Craft | Sneh Enterprises',
  description: 'Learn how Sneh Enterprises combines ancient Indian woodcarving heritage with Japanese pop-culture anime art through precision laser craft.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A110B] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCF8EC] border border-[#EAD79E] text-[#96721A] text-xs uppercase font-bold tracking-widest">
            The Atelier Story
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1A110B]">
            Where Sacred Devotion Meets <em>Anime Precision</em>
          </h1>
          <div className="gold-rule"></div>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-[#4A3B32] font-normal leading-relaxed">
          <div className="p-8 rounded-2xl border border-[#E8E2D9] bg-white shadow-sm space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1A110B]">The Genesis of Sneh Enterprises</h2>
            <p>
              Founded with a reverent passion for natural hardwood and modern iconography, Sneh Enterprises was born from a singular realization: true devotion—whether to eternal spiritual deities or epic fictional worlds—deserves more than printed plastic or disposable posters.
            </p>
            <p>
              It deserves to be anchored in the immutable warmth of solid grain, sculpted across physical architectural layers, and preserved with organic beeswax for generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-2">
              <span className="text-[#B88E28] font-serif text-xl block font-bold">01. Sacred Vedic Heritage</span>
              <p className="text-xs text-[#6B5E55] leading-relaxed">
                Our Hindu deity temple sanctums and mandalas follow sacred geometry proportions. From the spires of the Ayodhya Ram Mandir to the cosmic ring of Nataraja Shiva, every contour evokes peace and spiritual elevation.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-2">
              <span className="text-[#B88E28] font-serif text-xl block font-bold">02. Japanese Manga Reverence</span>
              <p className="text-xs text-[#6B5E55] leading-relaxed">
                We translate dynamic anime manga panels into physical 3D dioramas. By separating line work across 7 to 12 laser tiers, we achieve a genuine physical parallax effect that breathes life into iconic heroes and moments.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl border border-[#E8E2D9] bg-white shadow-sm space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1A110B]">The Master Woodsmith Guarantee</h2>
            <p className="text-xs sm:text-sm text-[#4A3B32]">
              We hand-select every slab of Baltic Birch, American Walnut, and Burma Teak. Our workshop rejects synthetic varnishes in favor of pure non-toxic Italian matte lacquers and organic hardwax oils that allow the natural wood pores to breathe.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#B88E28]">
              <span>✦ 100% Seasoned Hardwoods</span>
              <span>✦ 0.05mm Micro-Laser Scoring</span>
              <span>✦ Hand-Inspected in Mumbai</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
