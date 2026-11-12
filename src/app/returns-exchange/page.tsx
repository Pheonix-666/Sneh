import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Returns & Replacement Guarantee | Sneh Enterprises',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A110B] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 text-sm text-[#4A3B32] space-y-6 leading-relaxed">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A110B]">
          Artisan Warranty &amp; <em>Replacements</em>
        </h1>
        <div className="gold-rule"></div>

        <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1A110B]">1. Transit Damage Guarantee</h2>
          <p>
            In the rare event that your wooden diorama or framed plaque sustains damage during transit, we provide a <strong>100% free expedited replacement</strong>. Simply record a brief unboxing video or take photographs and message our WhatsApp concierge at +91 91377 73967 within 48 hours of delivery.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1A110B]">2. Natural Wood Grain Character</h2>
          <p>
            Please note that solid hardwoods (Baltic Birch, American Walnut, Teak) exhibit unique grain patterns, medullary rays, and subtle color gradations. These natural organic variations are the hallmark of authentic timber and are celebrated as unique artistic signatures.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1A110B]">3. Personalized Inscriptions</h2>
          <p>
            Because custom laser-engraved artifacts are permanently etched with your specific names or dedication quotes, they cannot be returned for change of mind once production has completed. If our team ever makes an orthographic mistake contrary to your entered text, we re-make and ship a fresh piece immediately at no cost.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
