import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | Sneh Enterprises',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A110B] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 text-sm text-[#4A3B32] space-y-6 leading-relaxed">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A110B]">
          Privacy &amp; <em>Data Protection</em>
        </h1>
        <div className="gold-rule"></div>

        <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1A110B]">1. Information We Collect</h2>
          <p>
            When placing a commission or ordering a wooden artifact, we collect your name, shipping address, contact phone number, email, and custom laser engraving text solely for workshop fulfillment and delivery dispatch.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1A110B]">2. Absolute Data Confidentiality</h2>
          <p>
            We never sell, lease, or monetize your contact information. Details are shared strictly with verified courier delivery partners (Bluedart, Delhivery) for dispatch execution.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1A110B]">3. Secure Communications</h2>
          <p>
            All website interactions and payment coordination via WhatsApp and UPI adhere to encrypted communications.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
