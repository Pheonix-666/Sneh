import React, { Suspense } from 'react';
import ProductCatalogClient from './ProductCatalogClient';

export const metadata = {
  title: 'Artisan Woodcraft Catalog | Sneh Enterprises',
  description: 'Browse our complete atelier of handcrafted wooden anime gifts, sacred deity frames, mandir altars, and executive organizers.',
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-espresso flex items-center justify-center text-gold">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="font-serif text-sm tracking-widest uppercase">Opening Atelier Vault...</p>
          </div>
        </div>
      }
    >
      <ProductCatalogClient />
    </Suspense>
  );
}

