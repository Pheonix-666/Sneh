import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service | Sneh Enterprises',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A110B] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 text-sm text-[#4A3B32] space-y-6 leading-relaxed">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A110B]">
          Terms of <em>Atelier Service</em>
        </h1>
        <div className="gold-rule"></div>

        <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1A110B]">1. Intellectual Property &amp; Fan Tribute Art</h2>
          <p>
            Our anime woodcraft pieces are artisan fan tributes and sculptural interpretations engineered through layered laser craftsmanship and woodworking. All anime character motifs are respectful homages celebrating pop culture art.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1A110B]">2. Pricing &amp; Orders</h2>
          <p>
            All listed prices are denominated in Indian Rupees (INR) and are inclusive of GST. Sneh Enterprises reserves the right to modify prices or discontinue bespoke models without prior notice.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1A110B]">3. Governing Law</h2>
          <p>
            Any disputes arising in connection with orders from Sneh Enterprises shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra, India.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
