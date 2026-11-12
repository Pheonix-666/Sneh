import React from 'react';

export const metadata = {
  title: 'Workshop Admin Console | Sneh Enterprises',
  description: 'Manage catalog, custom laser inscriptions, and dispatch tracking.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-espresso text-parchment">{children}</div>;
}

