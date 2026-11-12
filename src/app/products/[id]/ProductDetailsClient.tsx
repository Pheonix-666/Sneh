'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product, products } from '@/lib/data';
import { getProductPricing, formatINR } from '@/lib/pricing';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [woodFinish, setWoodFinish] = useState('Natural Birch & Walnut');
  const [engravingText, setEngravingText] = useState('');
  const [giftBox, setGiftBox] = useState(false);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);

  // Reviews mock state
  const [reviews, setReviews] = useState([
    {
      author: 'Vikramaditya Roy',
      rating: 5,
      city: 'New Delhi',
      date: '2 days ago',
      comment:
        'The depth on the layers is unbelievable. You can physically feel the grain variation between the birch tiers and the walnut frame. Arrived safely packed in bubble crating.',
    },
    {
      author: 'Pooja Kulkarni',
      rating: 5,
      city: 'Pune',
      date: '1 week ago',
      comment:
        'Gifted this to my brother for his study table. The laser engraving of the citation was so crisp and clean. Best purchase of the season.',
    },
  ]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const { addToCart, toggleShortlist, isInShortlist } = useCart();
  const { showToast } = useToast();
  const pricing = getProductPricing(product);
  const isShortlisted = isInShortlist(product.id);

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, {
      woodFinish,
      customEngraving: engravingText,
      giftBox,
      qty,
    });
    showToast(`Added ${qty}x "${product.name}" to bag.`, 'success');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) {
      showToast('Please provide your name and review comment.', 'error');
      return;
    }
    setReviews([
      {
        author: newReviewAuthor,
        rating: newReviewRating,
        city: 'Verified Patron',
        date: 'Just now',
        comment: newReviewComment,
      },
      ...reviews,
    ]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    showToast('Thank you! Your verified review has been posted.', 'success');
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919137773967';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Sneh Enterprises! I would like to purchase:\n` +
      `Product: ${product.name} (${formatINR(pricing.discountedPrice)})\n` +
      `Wood Finish: ${woodFinish}\n` +
      `Engraving: ${engravingText || 'None'}\n` +
      `Gift Box: ${giftBox ? 'Yes (+₹350)' : 'Standard'}\n` +
      `Quantity: ${qty}\n` +
      `Please confirm stock and dispatch schedule.`
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A110B] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb Navigation */}
        <div className="text-xs uppercase tracking-widest text-[#8F8075] mb-6 flex items-center gap-2 font-bold">
          <Link href="/" className="hover:text-[#B88E28] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-[#B88E28] transition-colors">
            {product.category.toUpperCase()}
          </Link>
          <span>/</span>
          <span className="text-[#B88E28] truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image Gallery (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Image Stage */}
            <div className="relative aspect-square sm:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#E8E2D9] bg-white shadow-md">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {product.tag && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-[#2A1810] text-[#EAD79E] text-xs font-bold uppercase tracking-wider shadow">
                  {product.tag}
                </div>
              )}

              {/* Live Engraving Overlay Preview on Plinth */}
              {engravingText && (
                <div className="absolute inset-x-8 bottom-6 z-10 p-3 rounded-xl bg-white/95 border-2 border-[#B88E28] text-center backdrop-blur-md shadow-2xl">
                  <span className="text-[10px] text-[#B88E28] uppercase tracking-widest block font-sans font-bold">
                    Laser Engraved Plinth Preview
                  </span>
                  <span className="font-serif italic text-[#1A110B] text-sm sm:text-base font-bold">
                    &ldquo;{engravingText}&rdquo;
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all bg-white shrink-0 ${
                      selectedImage === img
                        ? 'border-[#B88E28] scale-105 shadow-md'
                        : 'border-[#E8E2D9] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}

            {/* Specifications Box (Clean White) */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#1A110B]">
                Product Specifications &amp; Craft Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#8F8075] block uppercase font-bold text-[10px]">Timber Species</span>
                  <span className="text-[#1A110B] font-semibold text-sm">{product.wood_type}</span>
                </div>
                <div>
                  <span className="text-[#8F8075] block uppercase font-bold text-[10px]">Dimensions</span>
                  <span className="text-[#1A110B] font-semibold text-sm">{product.dimensions}</span>
                </div>
                <div>
                  <span className="text-[#8F8075] block uppercase font-bold text-[10px]">Finish &amp; Sealer</span>
                  <span className="text-[#1A110B] font-semibold text-sm">German Matte Hardwax Oil &amp; Organic Beeswax</span>
                </div>
                <div>
                  <span className="text-[#8F8075] block uppercase font-bold text-[10px]">Transit Protection</span>
                  <span className="text-[#1A110B] font-semibold text-sm">Shock-absorbent EVA foam with wooden corner guards</span>
                </div>
              </div>

              {/* Key Highlights List */}
              {product.features && product.features.length > 0 && (
                <div className="pt-4 border-t border-[#F0EAE1] space-y-2 text-xs">
                  <span className="text-[#8F8075] uppercase font-bold text-[10px] block">
                    Product Highlights:
                  </span>
                  <ul className="space-y-1.5 list-disc list-inside text-[#4A3B32]">
                    {product.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Buying, Customization & Inscription (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D9] shadow-md space-y-6">
            
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#B88E28] font-bold px-2.5 py-0.5 rounded bg-[#FCF8EC] border border-[#EAD79E]">
                  {product.category}
                </span>
                <button
                  onClick={() => toggleShortlist(product.id)}
                  className="flex items-center gap-1.5 text-xs text-[#6B5E55] hover:text-[#DC2626] font-semibold"
                >
                  <svg className={`w-4 h-4 ${isShortlisted ? 'fill-[#DC2626] text-[#DC2626]' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{isShortlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A110B] mt-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-xs text-[#8F8075] mt-1">{product.subtitle}</p>

              {/* Rating stars */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex text-[#F59E0B]">{'★'.repeat(5)}</div>
                <span className="font-bold text-[#1A110B]">{product.rating || 4.9}</span>
                <span className="text-[#8F8075]">({product.reviews_count || 48} ratings &amp; verified reviews)</span>
              </div>

              {/* Price Banner */}
              <div className="mt-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#EBE5DC] flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl font-bold text-[#1A110B]">
                      {formatINR(pricing.discountedPrice)}
                    </span>
                    {pricing.originalPrice > pricing.discountedPrice && (
                      <span className="text-base text-[#8F8075] line-through">
                        {formatINR(pricing.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#16A34A] font-bold block mt-0.5">
                    ✓ Inclusive of all taxes &amp; Free Express Delivery
                  </span>
                </div>

                {pricing.discountPercent > 0 && (
                  <span className="px-2.5 py-1 rounded bg-[#DC2626] text-white text-xs font-bold shadow-sm">
                    {pricing.discountPercent}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#4A3B32] leading-relaxed">
              {product.description}
            </p>

            {/* Customization Options */}
            <div className="space-y-4 pt-4 border-t border-[#F0EAE1]">
              
              {/* Wood Tone Selection */}
              <div>
                <label className="block text-xs font-sans text-[#1A110B] uppercase font-bold tracking-wider mb-2">
                  1. Choose Timber Stain:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Natural Birch & Walnut', 'Smoked Teak', 'Dark Espresso'].map(finish => (
                    <button
                      key={finish}
                      onClick={() => setWoodFinish(finish)}
                      className={`p-2.5 rounded-lg border text-center transition-all ${
                        woodFinish === finish
                          ? 'border-[#B88E28] bg-[#FCF8EC] text-[#96721A] font-bold shadow-sm ring-1 ring-[#B88E28]'
                          : 'border-[#E8E2D9] bg-white text-[#4A3B32] hover:border-[#B88E28]'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Inscription / Laser Engraving */}
              {product.personalization_allowed && (
                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E0D7CB] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-sans text-[#1A110B] font-bold uppercase tracking-wider">
                      2. Free Custom Laser Engraving:
                    </label>
                    <span className="text-[10px] text-[#16A34A] font-bold">100% COMPLIMENTARY</span>
                  </div>
                  <input
                    type="text"
                    maxLength={60}
                    value={engravingText}
                    onChange={e => setEngravingText(e.target.value)}
                    placeholder="Enter name, mantra, or quote (e.g. 'To Arjun with blessings')"
                    className="w-full bg-white border border-[#D5CBC0] rounded-lg p-2.5 text-xs text-[#1A110B] placeholder-[#8F8075] focus:outline-none focus:border-[#B88E28]"
                  />
                  <p className="text-[11px] text-[#6B5E55]">
                    Our laser smiths will burn this onto the base before final organic beeswax buffing.
                  </p>
                </div>
              )}

              {/* Gift Box Checkbox */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9] text-xs text-[#4A3B32]">
                <input
                  type="checkbox"
                  id="gift-box"
                  checked={giftBox}
                  onChange={e => setGiftBox(e.target.checked)}
                  className="rounded border-[#D5CBC0] text-[#B88E28] focus:ring-0"
                />
                <label htmlFor="gift-box" className="cursor-pointer font-medium">
                  Upgrade to Solid Pine Keepsake Gift Box (+₹350) with gold wax seal
                </label>
              </div>

              {/* Pincode Delivery Estimator */}
              <div className="p-3 rounded-lg border border-[#E8E2D9] bg-white space-y-2 text-xs">
                <span className="font-bold text-[#1A110B] block">Check Delivery Date:</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={e => {
                      setPincode(e.target.value);
                      setPincodeChecked(false);
                    }}
                    placeholder="Enter 6-digit Pincode"
                    className="flex-1 bg-[#FAF8F5] border border-[#D5CBC0] rounded-md px-3 py-1.5 text-xs text-[#1A110B] focus:outline-none focus:border-[#B88E28]"
                  />
                  <button
                    onClick={() => {
                      if (pincode.length === 6) setPincodeChecked(true);
                      else showToast('Please enter a valid 6-digit pincode', 'error');
                    }}
                    className="px-3 py-1.5 rounded-md bg-[#2A1810] text-white text-xs font-semibold hover:bg-[#B88E28]"
                  >
                    Check
                  </button>
                </div>
                {pincodeChecked && (
                  <p className="text-[11px] text-[#16A34A] font-semibold">
                    ✓ Available for Free Express Delivery in 2-3 business days to {pincode}
                  </p>
                )}
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#D5CBC0] rounded-lg bg-white">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-3 py-2.5 text-[#4A3B32] hover:text-[#B88E28]"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-bold text-[#1A110B]">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-3 py-2.5 text-[#4A3B32] hover:text-[#B88E28]">
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-lg text-xs font-sans uppercase font-bold tracking-wider gold-btn"
                  >
                    Add to Bag · {formatINR((pricing.discountedPrice + (giftBox ? 350 : 0)) * qty)}
                  </button>
                </div>

                <div className="flex gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-2.5 px-4 rounded-lg text-xs font-bold bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Instant WhatsApp Order (COD or UPI)</span>
                  </a>
                </div>

                <Link
                  href="/cart"
                  className="block w-full text-center py-2.5 px-4 rounded-lg text-xs uppercase font-sans font-bold tracking-wider wood-btn"
                >
                  Proceed Directly to Bag →
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-16 pt-12 border-t border-[#E8E2D9]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1A110B]">
                Customer Reviews ({reviews.length})
              </h3>
              <p className="text-xs text-[#8F8075]">Verified impressions from our patrons across India</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Reviews List */}
            <div className="lg:col-span-7 space-y-4">
              {reviews.map((r, i) => (
                <div key={i} className="p-5 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-sans font-bold text-[#1A110B]">{r.author}</span>
                    <span className="text-[10px] text-[#8F8075]">{r.city} · {r.date}</span>
                  </div>
                  <div className="text-[#F59E0B] text-xs">★★★★★</div>
                  <p className="text-xs text-[#4A3B32] leading-relaxed font-light">{r.comment}</p>
                </div>
              ))}
            </div>

            {/* Leave a Review Form */}
            <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#E8E2D9] shadow-sm space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#1A110B]">Write a Review</h4>
              <form onSubmit={handleAddReview} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#6B5E55] mb-1 font-semibold">Your Full Name:</label>
                  <input
                    type="text"
                    value={newReviewAuthor}
                    onChange={e => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Aryan Khanna"
                    className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none focus:border-[#B88E28]"
                  />
                </div>
                <div>
                  <label className="block text-[#6B5E55] mb-1 font-semibold">Rating:</label>
                  <select
                    value={newReviewRating}
                    onChange={e => setNewReviewRating(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none focus:border-[#B88E28] font-sans"
                  >
                    <option value={5}>★★★★★ (5 Stars - Heirloom Masterpiece)</option>
                    <option value={4}>★★★★☆ (4 Stars - Exceptional)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Good)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#6B5E55] mb-1 font-semibold">Your Feedback:</label>
                  <textarea
                    rows={3}
                    value={newReviewComment}
                    onChange={e => setNewReviewComment(e.target.value)}
                    placeholder="Share your thoughts on the grain, laser precision, and unboxing..."
                    className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none focus:border-[#B88E28] font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-md text-xs uppercase font-bold tracking-wider gold-btn"
                >
                  Submit Verified Review
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Related Artifacts Carousel */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#E8E2D9]">
            <h3 className="font-serif text-2xl font-bold text-[#1A110B] mb-6">
              Customers Also Viewed in <em>{product.category.toUpperCase()}</em>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
