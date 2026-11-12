import { NextResponse } from 'next/server';
import { products as localProducts } from '@/lib/data';
import { supabaseServer } from '@/lib/supabase-server';
import { isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseServer
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json(data);
      }
    }
  } catch (err) {
    console.warn('Supabase products fetch failed, using local catalog:', err);
  }

  return NextResponse.json(localProducts);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { error: 'Name, price, and category are required' },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured) {
      const { data, error } = await supabaseServer
        .from('products')
        .insert([body])
        .select();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(data[0], { status: 201 });
    }

    // Local in-memory mock return
    const newProduct = {
      ...body,
      id: body.id || `product-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    return NextResponse.json(newProduct, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

