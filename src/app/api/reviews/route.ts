import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { isSupabaseConfigured } from '@/lib/supabase';

let mockReviews = [
  {
    id: 1,
    product_id: 'gods-1',
    author: 'Aditya Sharma',
    city: 'Lucknow',
    rating: 5,
    comment: 'The Ayodhya Ram Mandir 9-tier altar looks ethereal with the indirect warm lighting.',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    product_id: 'anime-1',
    author: 'Kavita Menon',
    city: 'Bengaluru',
    rating: 5,
    comment: 'The Zoro Asura 7-layer diorama is of genuine museum quality. The birch grain is stunning.',
    created_at: new Date().toISOString(),
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('product_id');

  try {
    if (isSupabaseConfigured) {
      let query = supabaseServer.from('reviews').select('*').order('created_at', { ascending: false });
      if (productId) {
        query = query.eq('product_id', productId);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return NextResponse.json(data);
      }
    }
  } catch (err) {
    console.warn('Supabase reviews error:', err);
  }

  const results = productId
    ? mockReviews.filter(r => r.product_id === productId)
    : mockReviews;

  return NextResponse.json(results);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newReview = {
      id: Date.now(),
      product_id: body.product_id || '',
      author: body.author || 'Anonymous Patron',
      city: body.city || 'India',
      rating: body.rating || 5,
      comment: body.comment || '',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      await supabaseServer.from('reviews').insert([newReview]);
    }

    mockReviews.unshift(newReview);
    return NextResponse.json(newReview, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

