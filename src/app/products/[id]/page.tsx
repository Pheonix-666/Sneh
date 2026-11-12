import React from 'react';
import { notFound } from 'next/navigation';
import ProductDetailsClient from './ProductDetailsClient';
import { products } from '@/lib/data';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find(p => p.id === resolvedParams.id);
  if (!product) {
    return {
      title: 'Artifact Not Found | Sneh Enterprises',
    };
  }
  return {
    title: `${product.name} | Sneh Enterprises Woodcraft`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = products.find(p => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}

