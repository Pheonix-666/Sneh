'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { formatINR } from '@/lib/pricing';

export default function EngravingStudio() {
  const [engravingText, setEngravingText] = useState('ॐ नमः शिवाय · Om Namah Shivaya');
  const [woodSpecies, setWoodSpecies] = useState<'walnut' | 'teak' | 'birch'>('walnut');
  const [fontChoice, setFontChoice] = useState<'serif' | 'devnagari' | 'brush' | 'modern'>('serif');
  const [frameSize, setFrameSize] = useState<'desk' | 'mantel' | 'wall'>('desk');

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const getPrice = () => {
    switch (frameSize) {
      case 'mantel':
        return 1999;
      case 'wall':
        return 2799;
      default:
        return 1499;
    }
  };

  const getWoodBackground = () => {
    switch (woodSpecies) {
      case 'teak':
        return 'linear-gradient(135deg, #8A4E1B 0%, #5E320F 50%, #7A4518 100%)';
      case 'birch':
        return 'linear-gradient(135deg, #F3E5D0 0%, #D8C3A5 50%, #E6D0B3 100%)';
      default:
        return 'linear-gradient(135deg, #2D1A10 0%, #1A0D07 50%, #3D2214 100%)';
    }
  };

  const getTextColor = () => {
    if (woodSpecies === 'birch') {
      return '#2A1810';
    }
    return '#EAD79E';
  };

  const getFontFamily = () => {
    switch (fontChoice) {
      case 'modern':
        return 'var(--font-sans)';
      default:
        return 'var(--font-serif)';
    }
  };

  const handleOrderCustomPlaque = () => {
    if (!engravingText.trim()) {
      showToast('Please type your personalized text first.', 'error');
      return;
    }

    addToCart(
      {
        id: `bespoke-${Date.now()}`,
        name: `Bespoke Laser-Engraved ${woodSpecies.toUpperCase()} Plaque`,
        subtitle: `Custom: "${engravingText.slice(0, 30)}..."`,
        price: getPrice(),
        image: '/catalog/Frame1.jpeg',
      },
      {
        woodFinish: `${woodSpecies.toUpperCase()} - ${fontChoice.toUpperCase()} FONT`,
        customEngraving: engravingText,
        giftBox: true,
      }
    );

    showToast('Bespoke engraved plaque added to your bag!', 'success');
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-[#EBE5DC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCF8EC] border border-[#EAD79E] text-[#96721A] text-xs font-sans uppercase font-bold tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#B88E28]"></span>
            Personalization Studio
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A110B] leading-tight">
            Design Your <em>Custom Laser Plaque</em>
          </h2>
          <div className="gold-rule"></div>
          <p className="text-xs sm:text-sm text-[#6B5E55]">
            Type your favorite anime battle cry, sacred Sanskrit sloka, or family anniversary date to preview live laser scoring on seasoned timber.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6 bg-[#FAF8F5] p-6 sm:p-8 rounded-xl border border-[#E0D7CB] shadow-sm">
            
            {/* Text Input */}
            <div>
              <label className="block font-sans text-xs uppercase tracking-wider text-[#1A110B] font-bold mb-2">
                1. Enter Custom Inscription / Quote / Mantra:
              </label>
              <textarea
                rows={2}
                maxLength={90}
                value={engravingText}
                onChange={e => setEngravingText(e.target.value)}
                placeholder="Type your inscription here..."
                className="w-full bg-white border border-[#D5CBC0] rounded-md p-3 text-sm text-[#1A110B] placeholder-[#8F8075] focus:outline-none focus:border-[#B88E28] font-sans shadow-inner"
              />
              <span className="text-[11px] text-[#8F8075] block mt-1">
                {engravingText.length}/90 characters · 0.05mm high-precision micro-laser burned
              </span>
            </div>

            {/* Wood Species */}
            <div>
              <label className="block font-sans text-xs uppercase tracking-wider text-[#1A110B] font-bold mb-2">
                2. Select Seasoned Wood Species:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'walnut', name: 'Dark Walnut', desc: 'Deep chocolate grain' },
                  { id: 'teak', name: 'Burma Teak', desc: 'Honey golden luster' },
                  { id: 'birch', name: 'Baltic Birch', desc: 'Light Scandinavian' },
                ].map(w => (
                  <button
                    key={w.id}
                    onClick={() => setWoodSpecies(w.id as any)}
                    className={`p-3 rounded-md text-left border transition-all ${
                      woodSpecies === w.id
                        ? 'border-[#B88E28] bg-white text-[#96721A] font-bold shadow-md ring-1 ring-[#B88E28]'
                        : 'border-[#E0D7CB] bg-white/70 text-[#4A3B32] hover:border-[#B88E28]'
                    }`}
                  >
                    <span className="block font-serif text-sm font-bold">{w.name}</span>
                    <span className="block text-[10px] text-[#8F8075]">{w.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Style */}
            <div>
              <label className="block font-sans text-xs uppercase tracking-wider text-[#1A110B] font-bold mb-2">
                3. Laser Font Style:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'serif', label: 'Royal Serif' },
                  { id: 'devnagari', label: 'Devnagari Calligraphy' },
                  { id: 'brush', label: 'Samurai Brush' },
                  { id: 'modern', label: 'Modern Sans' },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFontChoice(f.id as any)}
                    className={`p-2 rounded-md text-center border transition-all ${
                      fontChoice === f.id
                        ? 'border-[#B88E28] bg-white text-[#96721A] font-bold shadow-sm'
                        : 'border-[#E0D7CB] bg-white/70 text-[#4A3B32]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & CTA Row */}
            <div className="pt-4 border-t border-[#E0D7CB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-[#8F8075] block uppercase font-bold tracking-wider">
                  Handcrafted Plaque &amp; Easel:
                </span>
                <span className="font-serif text-2xl font-bold text-[#1A110B]">
                  {formatINR(getPrice())}
                </span>
                <span className="text-[11px] text-[#16A34A] font-bold ml-2">✓ Free Shipping</span>
              </div>

              <button
                onClick={handleOrderCustomPlaque}
                className="py-3 px-6 rounded-md font-sans text-xs uppercase font-bold tracking-wider gold-btn"
              >
                Add Custom Plaque to Bag
              </button>
            </div>
          </div>

          {/* Interactive Live Plaque Preview */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-xl p-3 bg-white border-2 border-[#D5CBC0] shadow-xl flex items-center justify-center">
              
              {/* Outer Golden Corner Accents */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#B88E28]"></div>
              <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#B88E28]"></div>
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#B88E28]"></div>
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#B88E28]"></div>

              {/* Timber Simulator Plaque */}
              <div
                className="w-full h-full rounded-lg border border-black/20 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-500 shadow-inner"
                style={{
                  background: getWoodBackground(),
                }}
              >
                {/* Filigree Inset Border */}
                <div className="absolute inset-3 border border-white/20 pointer-events-none rounded"></div>

                <div className="text-[11px] uppercase tracking-widest mb-3 opacity-80 font-sans font-semibold" style={{ color: getTextColor() }}>
                  ✦ Sneh Enterprises Bespoke Atelier ✦
                </div>

                <div
                  className="text-lg sm:text-2xl font-semibold px-4 py-2 leading-relaxed transition-all"
                  style={{
                    color: getTextColor(),
                    fontFamily: getFontFamily(),
                    textShadow:
                      woodSpecies === 'birch'
                        ? '1px 1px 0px rgba(0,0,0,0.1)'
                        : '1px 1px 2px rgba(0,0,0,0.9)',
                  }}
                >
                  &ldquo;{engravingText || 'Your inscription will appear here'}&rdquo;
                </div>

                <div className="mt-4 flex items-center gap-2 opacity-70 text-[10px] uppercase tracking-widest font-sans font-semibold" style={{ color: getTextColor() }}>
                  <span>Solid {woodSpecies.toUpperCase()}</span>
                  <span>·</span>
                  <span>Precision Laser Carved</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#8F8075] mt-3 text-center">
              * Interactive simulated preview. Natural wood grain varies with each harvested timber slab.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
