'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  qty: number;
  woodFinish?: string;
  customEngraving?: string;
  giftBox?: boolean;
}

interface CartContextType {
  cart: CartItem[];
  shortlist: string[];
  addToCart: (
    product: { id: string; name: string; subtitle: string; price: number; image: string },
    options?: { woodFinish?: string; customEngraving?: string; giftBox?: boolean; qty?: number }
  ) => void;
  removeFromCart: (id: string, woodFinish?: string, customEngraving?: string) => void;
  updateQty: (id: string, delta: number, woodFinish?: string, customEngraving?: string) => void;
  clearCart: () => void;
  cartCount: number;
  shortlistCount: number;
  toggleShortlist: (id: string) => void;
  isInShortlist: (id: string) => boolean;
  clearShortlist: () => void;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('sneh_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedShortlist = localStorage.getItem('sneh_shortlist');
      if (storedShortlist) setShortlist(JSON.parse(storedShortlist));
    } catch (e) {
      console.warn('Failed to load cart/shortlist from localStorage:', e);
    }
    setIsHydrated(true);
    initialLoadDone.current = true;
  }, []);

  useEffect(() => {
    if (isHydrated && initialLoadDone.current) {
      try {
        localStorage.setItem('sneh_cart', JSON.stringify(cart));
      } catch (e) {
        console.warn('Failed to save cart to localStorage:', e);
      }
    }
  }, [cart, isHydrated]);

  useEffect(() => {
    if (isHydrated && initialLoadDone.current) {
      try {
        localStorage.setItem('sneh_shortlist', JSON.stringify(shortlist));
      } catch (e) {
        console.warn('Failed to save shortlist to localStorage:', e);
      }
    }
  }, [shortlist, isHydrated]);

  const addToCart = (
    product: { id: string; name: string; subtitle: string; price: number; image: string },
    options?: { woodFinish?: string; customEngraving?: string; giftBox?: boolean; qty?: number }
  ) => {
    const qty = options?.qty || 1;
    const woodFinish = options?.woodFinish || 'Natural Birch & Walnut';
    const customEngraving = options?.customEngraving || '';
    const giftBox = options?.giftBox || false;

    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.id === product.id && item.woodFinish === woodFinish && item.customEngraving === customEngraving
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          qty: next[existingIdx].qty + qty,
        };
        return next;
      }
      return [...prev, { ...product, qty, woodFinish, customEngraving, giftBox }];
    });
  };

  const removeFromCart = (id: string, woodFinish?: string, customEngraving?: string) => {
    setCart(prev =>
      prev.filter(
        item => !(item.id === id && item.woodFinish === woodFinish && item.customEngraving === customEngraving)
      )
    );
  };

  const updateQty = (id: string, delta: number, woodFinish?: string, customEngraving?: string) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.woodFinish === woodFinish && item.customEngraving === customEngraving
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleShortlist = (id: string) => {
    setShortlist(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const isInShortlist = (id: string) => shortlist.includes(id);

  const clearShortlist = () => setShortlist([]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const shortlistCount = shortlist.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        shortlist,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        shortlistCount,
        toggleShortlist,
        isInShortlist,
        clearShortlist,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}

