'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { formatINR } from '@/lib/pricing';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir'
];

export default function CartPage() {
  const { cart: items, updateQty, removeFromCart, clearCart } = useCart();
  const { showToast } = useToast();

  const [address, setAddress] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
  });

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'whatsapp'>('upi');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price + (item.giftBox ? 350 : 0)) * item.qty,
    0
  );
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const taxableAmount = subtotal - discount;
  const tax = Math.round(taxableAmount * 0.03); // 3% GST
  const shipping = taxableAmount > 999 ? 0 : 99; // Free above ₹999
  const total = taxableAmount + tax + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'WOOD10') {
      setCouponApplied(true);
      showToast('Coupon "WOOD10" applied! 10% discount added.', 'success');
    } else {
      showToast('Invalid coupon code. Try "WOOD10".', 'error');
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      showToast('Your shopping bag is empty.', 'error');
      return;
    }

    if (!address.name || !address.email || !address.phone || !address.street || !address.city || !address.pincode) {
      showToast('Please fill out all required shipping and contact fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    const newOrderId = 'SNEH-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const orderPayload = {
      id: newOrderId,
      items,
      subtotal,
      discount,
      tax,
      shipping,
      total,
      customer: {
        name: address.name,
        email: address.email,
        phone: address.phone,
      },
      shipping_address: {
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: 'India',
      },
      payment_method: paymentMethod.toUpperCase(),
      order_status: 'Confirmed',
      payment_status: paymentMethod === 'cod' ? 'Pending' : 'Awaiting Verification',
    };

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
    } catch (err) {
      console.warn('Order API sync fallback:', err);
    }

    setOrderId(newOrderId);
    setOrderPlaced(true);
    clearCart();
    setIsSubmitting(false);
    showToast('Your order has been placed successfully!', 'success');
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919137773967';
  const whatsappCheckoutUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Sneh Enterprises! I would like to place an order via WhatsApp:\n` +
      `Items:\n` +
      items
        .map(
          i =>
            `- ${i.qty}x ${i.name} (${formatINR(i.price)})\n  Finish: ${i.woodFinish || 'Standard'}\n  Engraving: ${i.customEngraving || 'None'}`
        )
        .join('\n') +
      `\nTotal: ${formatINR(total)}\n` +
      `Customer: ${address.name || 'Customer'}\nPhone: ${address.phone || 'N/A'}\nCity: ${address.city || 'India'}`
  )}`;

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#1A110B] flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#F0FDF4] border-2 border-[#16A34A] flex items-center justify-center mx-auto text-[#16A34A] shadow-md">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span className="text-xs font-bold tracking-widest uppercase text-[#B88E28]">Order Confirmed</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A110B]">
            Thank You for Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5E55] leading-relaxed">
            Your woodcraft commission has been received. Order reference ID:{' '}
            <strong className="text-[#B88E28] font-mono text-base">{orderId}</strong>
          </p>

          <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white text-left space-y-2 text-xs shadow-sm">
            <h4 className="font-serif text-sm font-bold text-[#1A110B] uppercase tracking-wider mb-2">
              Order Fulfillment Timeline:
            </h4>
            <p className="text-[#4A3B32]">1. Timber slab selection &amp; laser ablation begins at our studio.</p>
            <p className="text-[#4A3B32]">2. Hand buffing with organic beeswax and final quality audit.</p>
            <p className="text-[#4A3B32]">3. Sealed in shockproof foam crate with live SMS/WhatsApp dispatch tracking.</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products" className="px-6 py-3 rounded-md text-xs uppercase font-bold tracking-wider gold-btn">
              Continue Shopping
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20just%20placed%20order%20${orderId}%20and%20wanted%20to%20connect%20with%20the%20workshop.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-md text-xs uppercase font-bold tracking-wider bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-all shadow-sm"
            >
              Track on WhatsApp
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A110B] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A110B] mb-2">
          Shopping Bag &amp; Checkout
        </h1>
        <div className="gold-rule mb-8"></div>

        {items.length === 0 ? (
          <div className="py-24 text-center border border-[#E8E2D9] rounded-2xl bg-white p-8 space-y-4 max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center mx-auto text-[#B88E28]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-[#1A110B] font-bold">Your shopping bag is empty</h3>
            <p className="text-xs text-[#8F8075]">
              Explore our 3D anime manga shadowboxes, Ayodhya Ram Mandir altars, or personalized desk accessories.
            </p>
            <Link
              href="/products"
              className="inline-block mt-3 px-6 py-3 rounded-md text-xs uppercase font-bold tracking-wider gold-btn"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Items (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#8F8075] pb-2 border-b border-[#E8E2D9]">
                <span className="font-bold text-[#1A110B]">{items.length} Products in Bag</span>
                <button onClick={clearCart} className="text-[#8F8075] hover:text-[#DC2626] font-medium">
                  Clear All
                </button>
              </div>

              {items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="p-4 rounded-xl border border-[#E8E2D9] bg-white flex flex-col sm:flex-row items-start sm:items-center gap-4 group shadow-sm hover:border-[#B88E28] transition-all"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#E8E2D9] bg-[#FAF8F5] shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="font-serif text-base font-bold text-[#1A110B] truncate group-hover:text-[#B88E28] transition-colors">
                      {item.name}
                    </h3>
                    {item.woodFinish && (
                      <p className="text-[11px] text-[#8F8075]">Finish: {item.woodFinish}</p>
                    )}
                    {item.customEngraving && (
                      <p className="text-[11px] text-[#B88E28] italic font-serif">
                        Engraving: &ldquo;{item.customEngraving}&rdquo;
                      </p>
                    )}
                    {item.giftBox && (
                      <span className="inline-block text-[10px] text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded border border-[#BBF7D0]">
                        + Keepsake Gift Box (+₹350)
                      </span>
                    )}

                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center border border-[#D5CBC0] rounded-md bg-white">
                        <button
                          onClick={() => updateQty(item.id, -1, item.woodFinish, item.customEngraving)}
                          className="px-2 py-0.5 text-[#4A3B32] hover:text-[#B88E28] text-xs"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#1A110B]">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1, item.woodFinish, item.customEngraving)}
                          className="px-2 py-0.5 text-[#4A3B32] hover:text-[#B88E28] text-xs"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.woodFinish, item.customEngraving)}
                        className="text-[11px] text-[#8F8075] hover:text-[#DC2626]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right sm:self-center shrink-0">
                    <span className="font-serif text-lg font-bold text-[#1A110B] block">
                      {formatINR((item.price + (item.giftBox ? 350 : 0)) * item.qty)}
                    </span>
                    <span className="text-[10px] text-[#8F8075]">
                      {formatINR(item.price + (item.giftBox ? 350 : 0))} each
                    </span>
                  </div>
                </div>
              ))}

              {/* Promo Coupon Card */}
              <div className="bg-white p-4 rounded-xl border border-[#E8E2D9] shadow-sm">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon Code (e.g. WOOD10)"
                    className="flex-1 bg-[#FAF8F5] border border-[#D5CBC0] rounded-md px-3 py-2 text-xs uppercase font-bold text-[#1A110B] focus:outline-none focus:border-[#B88E28]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2A1810] text-white rounded-md text-xs font-bold hover:bg-[#B88E28] transition-colors"
                  >
                    Apply Coupon
                  </button>
                </form>
                {couponApplied && (
                  <p className="text-[11px] text-[#16A34A] font-bold mt-2">
                    ✓ Code WOOD10 applied: 10% discount subtracted from your order!
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Checkout & Delivery Form (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-md space-y-6">
              
              {/* Order Summary */}
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1A110B] uppercase tracking-wider mb-3">
                  Order Summary
                </h3>
                <div className="space-y-2 text-xs border-b border-[#F0EAE1] pb-4">
                  <div className="flex justify-between text-[#4A3B32]">
                    <span>Items Subtotal</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-[#16A34A] font-bold">
                      <span>Promo Discount (10% OFF)</span>
                      <span>-{formatINR(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#4A3B32]">
                    <span>Handicraft GST (3%)</span>
                    <span>{formatINR(tax)}</span>
                  </div>
                  <div className="flex justify-between text-[#4A3B32]">
                    <span>Pan-India Crated Shipping</span>
                    <span>{shipping === 0 ? <strong className="text-[#16A34A]">FREE</strong> : formatINR(shipping)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-4">
                  <span className="font-serif text-base text-[#1A110B] font-bold">Total Payable:</span>
                  <span className="font-serif text-2xl font-bold text-[#B88E28]">{formatINR(total)}</span>
                </div>
              </div>

              {/* Delivery Details Form */}
              <form onSubmit={handleCheckout} className="space-y-4 pt-2">
                <h4 className="font-serif text-sm font-bold text-[#1A110B] uppercase tracking-wider">
                  Shipping Address
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#6B5E55] mb-1 font-semibold">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={address.name}
                      onChange={e => setAddress({ ...address, name: e.target.value })}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none focus:border-[#B88E28]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6B5E55] mb-1 font-semibold">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={e => setAddress({ ...address, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none focus:border-[#B88E28]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-[#6B5E55] mb-1 font-semibold">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={e => setAddress({ ...address, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none focus:border-[#B88E28]"
                  />
                </div>

                <div className="text-xs">
                  <label className="block text-[#6B5E55] mb-1 font-semibold">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={e => setAddress({ ...address, street: e.target.value })}
                    placeholder="Apartment, Studio, Street name"
                    className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none focus:border-[#B88E28]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="block text-[#6B5E55] mb-1 font-semibold">City *</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={e => setAddress({ ...address, city: e.target.value })}
                      placeholder="Mumbai"
                      className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none focus:border-[#B88E28]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6B5E55] mb-1 font-semibold">State *</label>
                    <select
                      value={address.state}
                      onChange={e => setAddress({ ...address, state: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none focus:border-[#B88E28] font-sans"
                    >
                      {INDIAN_STATES.map(s => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#6B5E55] mb-1 font-semibold">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={address.pincode}
                      onChange={e => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="400069"
                      className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none focus:border-[#B88E28]"
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-[#1A110B] uppercase tracking-wider">
                    Select Payment Method:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-[#B88E28] bg-[#FCF8EC] text-[#96721A] font-bold shadow-sm ring-1 ring-[#B88E28]'
                          : 'border-[#E8E2D9] bg-white text-[#4A3B32]'
                      }`}
                    >
                      <span className="font-bold block">Instant UPI / QR</span>
                      <span className="text-[10px] text-[#8F8075]">GPay, PhonePe, Paytm</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#B88E28] bg-[#FCF8EC] text-[#96721A] font-bold shadow-sm ring-1 ring-[#B88E28]'
                          : 'border-[#E8E2D9] bg-white text-[#4A3B32]'
                      }`}
                    >
                      <span className="font-bold block">Cash on Delivery</span>
                      <span className="text-[10px] text-[#8F8075]">Pay upon delivery</span>
                    </button>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-lg text-xs uppercase font-sans font-bold tracking-wider gold-btn"
                >
                  {isSubmitting ? 'Confirming Order...' : `Place Order · ${formatINR(total)}`}
                </button>

                {/* WhatsApp Direct Order Alternative */}
                <div className="pt-2 text-center">
                  <a
                    href={whatsappCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#16A34A] hover:underline font-semibold"
                  >
                    <span>Prefer ordering via WhatsApp? Click here</span>
                  </a>
                </div>
              </form>

            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
