import { NextResponse } from 'next/server';
import { products as localProducts } from '@/lib/data';
import { supabaseServer } from '@/lib/supabase-server';
import { isSupabaseConfigured } from '@/lib/supabase';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseServer
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return NextResponse.json(data);
      }
    }
  } catch (err) {
    console.warn('Supabase product fetch failed, checking local:', err);
  }

  const local = localProducts.find(p => p.id === id);
  if (!local) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(local);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();

    if (isSupabaseConfigured) {
      const { data, error } = await supabaseServer
        .from('products')
        .update(body)
        .eq('id', id)
        .select();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(data[0]);
    }

    return NextResponse.json({ ...body, id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    if (isSupabaseConfigured) {
      const { error } = await supabaseServer
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

