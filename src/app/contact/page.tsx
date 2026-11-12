'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Anime Commission');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to our lead woodsmith.', 'success');
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919137773967';

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A110B] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCF8EC] border border-[#EAD79E] text-[#96721A] text-xs uppercase font-bold tracking-widest">
            Direct Concierge
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1A110B]">
            Connect with Our <em>Atelier Studio</em>
          </h1>
          <div className="gold-rule"></div>
          <p className="text-xs sm:text-sm text-[#6B5E55] max-w-lg mx-auto">
            Discuss bespoke commissions, custom corporate gifting batches, or tailored sacred deity altars with our artisans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Workshop Details */}
          <div className="md:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#1A110B]">Atelier Headquarters</h3>

            <div className="space-y-4 text-xs text-[#4A3B32]">
              <div>
                <span className="block text-[#8F8075] font-bold uppercase tracking-wider text-[10px]">
                  Workshop Location:
                </span>
                <p className="text-[#1A110B] font-medium mt-1">
                  Sneh Enterprises Woodcraft Studio<br />
                  Industrial Estate, Andheri East<br />
                  Mumbai, Maharashtra 400069<br />
                  India
                </p>
              </div>

              <div>
                <span className="block text-[#8F8075] font-bold uppercase tracking-wider text-[10px]">
                  WhatsApp Direct Concierge:
                </span>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#16A34A] hover:underline block text-sm font-bold mt-1"
                >
                  +91 91377 73967
                </a>
              </div>

              <div>
                <span className="block text-[#8F8075] font-bold uppercase tracking-wider text-[10px]">
                  Workshop Hours:
                </span>
                <p className="text-[#1A110B] mt-1 font-medium">Monday through Saturday: 9:30 AM – 7:30 PM IST</p>
              </div>

              <div className="pt-4 border-t border-[#F0EAE1]">
                <span className="text-[#B88E28] block font-serif text-sm font-bold mb-1">
                  Custom Corporate &amp; Bulk Orders
                </span>
                <p className="text-[11px] text-[#6B5E55] leading-relaxed">
                  We supply custom engraved trophies, awards, and commemorative desk gifts for tech conferences, universities, and corporate galas with sample dispatch in 48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D9] shadow-sm">
            {submitted ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#F0FDF4] border border-[#16A34A] flex items-center justify-center mx-auto text-[#16A34A] font-bold">
                  ✓
                </div>
                <h4 className="font-serif text-2xl text-[#1A110B] font-bold">Inquiry Received</h4>
                <p className="text-xs text-[#6B5E55] max-w-sm mx-auto">
                  Our woodcraft consultant will review your specifications and contact you via WhatsApp/Email with visual concepts and estimates within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#6B5E55] mb-1 font-semibold">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2.5 text-[#1A110B] focus:outline-none focus:border-[#B88E28]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#6B5E55] mb-1 font-semibold">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2.5 text-[#1A110B] focus:outline-none focus:border-[#B88E28]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6B5E55] mb-1 font-semibold">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2.5 text-[#1A110B] focus:outline-none focus:border-[#B88E28]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#6B5E55] mb-1 font-semibold">Category of Inquiry</label>
                  <select
                    value={interest}
                    onChange={e => setInterest(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2.5 text-[#1A110B] focus:outline-none focus:border-[#B88E28] font-sans font-medium"
                  >
                    <option value="Anime Commission">Custom Anime 3D Shadowbox Commission</option>
                    <option value="Sacred Temple Altar">Sacred Deity Temple / Mandir Backdrop</option>
                    <option value="Corporate Trophies">Corporate Awards &amp; Bulk Trophies</option>
                    <option value="Executive Desk Valet">Personalized Desk Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#6B5E55] mb-1 font-semibold">Project Details / Inscription Vision *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us about the dimensions, reference characters, quotes, or deadline..."
                    className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2.5 text-[#1A110B] focus:outline-none focus:border-[#B88E28] font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-md text-xs uppercase font-bold tracking-wider gold-btn"
                >
                  Send Inquiry to Workshop
                </button>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
