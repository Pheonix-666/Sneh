import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Shipping & White-Glove Crated Delivery | Sneh Enterprises',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A110B] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 text-sm text-[#4A3B32] space-y-6 leading-relaxed">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A110B]">
          White-Glove <em>Shipping &amp; Crating Policy</em>
        </h1>
        <div className="gold-rule"></div>

        <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1A110B]">1. Production &amp; Dispatch Timeline</h2>
          <p>
            Because each piece involves hand-inspected hardwood slabs and high-precision laser ablation followed by custom hand-buffing with beeswax, orders dispatch within <strong>24 to 48 business hours</strong>.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1A110B]">2. Shockproof Crated Packaging</h2>
          <p>
            Every multi-layered anime diorama and delicate temple sanctum is cocooned in high-density EVA shock-absorbing foam, secured between dual-ply corrugated buffer walls or wooden corner-guarded crates. Transit damage is virtually eliminated.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1A110B]">3. Delivery Timelines Across India</h2>
          <p>
            • Metro Cities (Mumbai, Delhi-NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune): 2 to 4 business days.<br />
            • Tier-2 and Regional Pin Codes: 3 to 6 business days via Bluedart, Delhivery, or DTDC Express with live SMS &amp; WhatsApp tracking.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1A110B]">4. Free Shipping Threshold</h2>
          <p>
            All retail orders exceeding ₹999 qualify for complimentary insured courier delivery across India.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
