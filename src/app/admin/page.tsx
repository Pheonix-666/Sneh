'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products as initialProducts, Product } from '@/lib/data';
import { formatINR } from '@/lib/pricing';
import { useToast } from '@/context/ToastContext';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  woodFinish?: string;
  customEngraving?: string;
  giftBox?: boolean;
}

interface Order {
  id: string;
  created_at: string;
  customer?: {
    name: string;
    email: string;
    phone: string;
  };
  shipping_address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  order_status: string;
  payment_status: string;
  payment_method: string;
  tracking_number?: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'analytics'>('orders');

  const [orders, setOrders] = useState<Order[]>([]);
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // New Product Modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    subtitle: '',
    price: 1999,
    original_price: 2799,
    category: 'anime' as const,
    tag: 'NEW DROP',
    image: '/catalog/Frame1.jpeg',
    images: ['/catalog/Frame1.jpeg'],
    wood_type: 'Natural Baltic Birch & Walnut',
    dimensions: '10 x 14 x 1.5 inches',
    description: '',
    shipping: 'Free Pan-India Delivery',
    features: ['High precision laser scoring', 'Hand finished with organic beeswax'],
    personalization_allowed: true,
  });

  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        showToast('Authenticated successfully.', 'success');
        fetchOrders();
      } else {
        setAuthError('Incorrect administrative password. Demo default: snehadmin2026');
      }
    } catch {
      if (password === 'snehadmin2026') {
        setIsAuthenticated(true);
        fetchOrders();
      } else {
        setAuthError('Invalid password. Try "snehadmin2026"');
      }
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.warn('Error fetching orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, order_status: newStatus } : o))
    );
    showToast(`Order ${orderId} marked as ${newStatus}.`, 'info');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      showToast('Please provide product title and price.', 'error');
      return;
    }

    const created: Product = {
      ...newProduct,
      id: `custom-${Date.now()}`,
    };

    setProductsList([created, ...productsList]);
    setAddModalOpen(false);
    showToast(`Created new product: "${created.name}"`, 'success');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to retire this product from catalog?')) {
      setProductsList(prev => prev.filter(p => p.id !== id));
      showToast('Product removed from active catalog.', 'info');
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingCount = orders.filter(o => o.order_status === 'Pending' || o.order_status === 'Confirmed').length;
  const inProductionCount = orders.filter(o => o.order_status === 'In Production').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#1A110B] flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-[#E8E2D9] shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-lg border border-[#B88E28]/40 bg-[#2A1810] flex items-center justify-center mx-auto text-[#D4AF37] text-2xl font-serif font-bold">
                S
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#1A110B]">Workshop Admin Portal</h2>
              <p className="text-xs text-[#8F8075]">
                Access order dispatches, laser inscription queues, and store management.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A110B] uppercase tracking-wider mb-1">
                  Administrative Key / Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter admin password (e.g. snehadmin2026)"
                  className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-lg p-2.5 text-[#1A110B] text-sm focus:outline-none focus:border-[#B88E28] font-sans"
                />
              </div>

              {authError && <p className="text-xs text-rose-500 font-medium">{authError}</p>}

              <button
                type="submit"
                className="w-full py-3 rounded-lg text-xs uppercase font-bold tracking-wider gold-btn"
              >
                Authenticate Console
              </button>
            </form>
            <div className="text-center text-[11px] text-[#8F8075]">
              Default demo password: <code className="text-[#B88E28] font-mono font-bold">snehadmin2026</code>
            </div>
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
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E2D9] gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#B88E28] font-bold mb-1">
              Store &amp; Production Management
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A110B]">
              Workshop Command Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAddModalOpen(true)}
              className="px-4 py-2 rounded-lg text-xs uppercase font-bold tracking-wider gold-btn flex items-center gap-1.5"
            >
              <span>+ Add New Product</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-2 rounded-lg text-xs border border-[#D5CBC0] text-[#6B5E55] hover:text-[#1A110B] bg-white"
            >
              Exit Console
            </button>
          </div>
        </div>

        {/* Stats Strip (Clean White Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          <div className="p-5 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F8075] block">Total Orders</span>
            <span className="font-serif text-2xl font-bold text-[#1A110B]">{orders.length}</span>
          </div>
          <div className="p-5 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F8075] block">Gross Revenue</span>
            <span className="font-serif text-2xl font-bold text-[#16A34A]">{formatINR(totalRevenue)}</span>
          </div>
          <div className="p-5 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F8075] block">Active Store Products</span>
            <span className="font-serif text-2xl font-bold text-[#1A110B]">{productsList.length}</span>
          </div>
          <div className="p-5 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F8075] block">Pending Laser Queue</span>
            <span className="font-serif text-2xl font-bold text-[#D97706]">
              {pendingCount + inProductionCount}
            </span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-[#E8E2D9] mb-6 text-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-4 border-b-2 font-bold transition-all ${
              activeTab === 'orders'
                ? 'border-[#B88E28] text-[#B88E28]'
                : 'border-transparent text-[#8F8075] hover:text-[#1A110B]'
            }`}
          >
            Orders &amp; Laser Queue ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-4 border-b-2 font-bold transition-all ${
              activeTab === 'products'
                ? 'border-[#B88E28] text-[#B88E28]'
                : 'border-transparent text-[#8F8075] hover:text-[#1A110B]'
            }`}
          >
            Product Catalog ({productsList.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-4 border-b-2 font-bold transition-all ${
              activeTab === 'analytics'
                ? 'border-[#B88E28] text-[#B88E28]'
                : 'border-transparent text-[#8F8075] hover:text-[#1A110B]'
            }`}
          >
            Material Consumption
          </button>
        </div>

        {/* TAB 1: ORDERS & LASER QUEUE */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="py-16 text-center text-[#8F8075] border border-[#E8E2D9] rounded-xl bg-white">
                No orders recorded yet.
              </div>
            ) : (
              orders.map(order => (
                <div
                  key={order.id}
                  className="p-5 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EAE1] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[#B88E28] font-bold text-sm">{order.id}</span>
                      <span className="text-xs text-[#8F8075]">
                        {new Date(order.created_at).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Status Select */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#8F8075] font-semibold">Status:</span>
                      <select
                        value={order.order_status}
                        onChange={e => handleUpdateOrderStatus(order.id, e.target.value)}
                        className="bg-[#FAF8F5] border border-[#D5CBC0] text-[#1A110B] font-semibold rounded-md px-2.5 py-1 text-xs focus:outline-none"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="In Production">In Production (Laser Cutting)</option>
                        <option value="Dispatched">Dispatched (Crated)</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <span className="px-2 py-0.5 rounded bg-[#F4EFEA] border border-[#E0D7CB] text-[#4A3B32] text-[11px] font-medium">
                        {order.payment_method} · {order.payment_status}
                      </span>
                    </div>
                  </div>

                  {/* Customer and Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                    {/* Customer Info */}
                    <div className="md:col-span-4 space-y-1 bg-[#FAF8F5] p-4 rounded-lg border border-[#E8E2D9]">
                      <span className="text-[#B88E28] font-bold block uppercase tracking-wider text-[10px]">
                        Customer Details:
                      </span>
                      <p className="text-[#1A110B] font-bold">{order.customer?.name}</p>
                      <p className="text-[#6B5E55]">{order.customer?.email}</p>
                      <p className="text-[#6B5E55]">{order.customer?.phone}</p>
                      <p className="text-[#4A3B32] pt-1 border-t border-[#E8E2D9]">
                        {order.shipping_address?.street}, {order.shipping_address?.city},{' '}
                        {order.shipping_address?.state} - {order.shipping_address?.pincode}
                      </p>
                    </div>

                    {/* Commissioned Items */}
                    <div className="md:col-span-8 space-y-2">
                      <span className="text-[#B88E28] font-bold block uppercase tracking-wider text-[10px]">
                        Ordered Items &amp; Inscriptions:
                      </span>
                      {order.items?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9]"
                        >
                          <div>
                            <span className="font-serif text-sm font-bold text-[#1A110B]">
                              {item.qty}x {item.name}
                            </span>
                            {item.woodFinish && (
                              <span className="block text-[11px] text-[#8F8075]">
                                Finish: {item.woodFinish}
                              </span>
                            )}
                            {item.customEngraving && (
                              <span className="block text-[11px] text-[#B88E28] font-serif italic font-semibold">
                                Laser Inscription: &ldquo;{item.customEngraving}&rdquo;
                              </span>
                            )}
                          </div>
                          <span className="font-serif text-[#1A110B] font-bold">
                            {formatINR(item.price * item.qty)}
                          </span>
                        </div>
                      ))}
                      <div className="text-right text-xs pt-1">
                        <span className="text-[#8F8075]">Total: </span>
                        <strong className="font-serif text-base text-[#1A110B]">{formatINR(order.total)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: PRODUCT CATALOG MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productsList.map(prod => (
                <div
                  key={prod.id}
                  className="p-4 rounded-xl border border-[#E8E2D9] bg-white flex gap-4 shadow-sm hover:border-[#B88E28] transition-all"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#E8E2D9] bg-[#FAF8F5] shrink-0">
                    <Image src={prod.image} alt={prod.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1 text-xs">
                    <span className="text-[10px] text-[#B88E28] font-bold uppercase tracking-wider block">
                      {prod.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#1A110B] truncate">
                      {prod.name}
                    </h4>
                    <p className="text-[#8F8075] text-[11px] truncate">{prod.wood_type}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-serif text-[#1A110B] font-bold text-sm">
                        {formatINR(prod.price)}
                      </span>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="text-rose-500 hover:text-rose-700 text-[11px] font-semibold"
                      >
                        Retire Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WOOD CONSUMPTION ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#1A110B]">Wood Species Breakdown</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[#4A3B32] font-semibold mb-1">
                    <span>Russian Baltic Birch Ply (3mm / 6mm)</span>
                    <span className="text-[#B88E28]">45%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-[#B88E28] rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#4A3B32] font-semibold mb-1">
                    <span>American Black Walnut (25mm / 35mm Slabs)</span>
                    <span className="text-[#B88E28]">30%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-[#78462B] rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#4A3B32] font-semibold mb-1">
                    <span>Seasoned Burma Teakwood</span>
                    <span className="text-[#B88E28]">25%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-[#B45309] rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-[#E8E2D9] bg-white shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#1A110B]">Theme Popularity Index</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[#4A3B32] font-semibold mb-1">
                    <span>Anime Woodcraft &amp; Manga Shadowboxes</span>
                    <span className="text-[#B88E28]">52%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-[#B88E28] rounded-full" style={{ width: '52%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#4A3B32] font-semibold mb-1">
                    <span>Sacred Deities &amp; Mandir Altars</span>
                    <span className="text-[#B88E28]">35%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#4A3B32] font-semibold mb-1">
                    <span>Executive Desk Organizers &amp; Trophies</span>
                    <span className="text-[#B88E28]">13%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-[#8F8075] rounded-full" style={{ width: '13%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD NEW PRODUCT */}
        {addModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white border border-[#E8E2D9] rounded-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center border-b border-[#F0EAE1] pb-3">
                <h3 className="font-serif text-xl font-bold text-[#1A110B]">
                  Add New Woodcraft Creation
                </h3>
                <button onClick={() => setAddModalOpen(false)} className="text-[#8F8075] hover:text-[#1A110B]">
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#6B5E55] mb-1 font-semibold">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. Sukuna Malevolent Shrine 8-Layer Shadowbox"
                    className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#6B5E55] mb-1 font-semibold">Category *</label>
                    <select
                      value={newProduct.category}
                      onChange={e => setNewProduct({ ...newProduct, category: e.target.value as any })}
                      className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none font-sans"
                    >
                      <option value="anime">Anime Woodcraft</option>
                      <option value="gods">Sacred Deities</option>
                      <option value="desk">Desk Organizers</option>
                      <option value="trophies">Trophies &amp; Plaques</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#6B5E55] mb-1 font-semibold">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#6B5E55] mb-1 font-semibold">Wood Species</label>
                    <input
                      type="text"
                      value={newProduct.wood_type}
                      onChange={e => setNewProduct({ ...newProduct, wood_type: e.target.value })}
                      placeholder="Baltic Birch & Dark Walnut"
                      className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6B5E55] mb-1 font-semibold">Dimensions</label>
                    <input
                      type="text"
                      value={newProduct.dimensions}
                      onChange={e => setNewProduct({ ...newProduct, dimensions: e.target.value })}
                      placeholder="12 x 16 x 2 inches"
                      className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#6B5E55] mb-1 font-semibold">Description</label>
                  <textarea
                    rows={3}
                    value={newProduct.description}
                    onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Describe the layers, inspiration, and finish..."
                    className="w-full bg-[#FAF8F5] border border-[#D5CBC0] rounded-md p-2 text-[#1A110B] focus:outline-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-xs uppercase font-bold tracking-wider gold-btn"
                >
                  Publish to Store Catalog
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
