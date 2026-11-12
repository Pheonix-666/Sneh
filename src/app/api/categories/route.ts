import { NextResponse } from 'next/server';
import { CATEGORIES } from '@/lib/data';
import { supabaseServer } from '@/lib/supabase-server';
import { isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseServer
        .from('categories')
        .select('*');

      if (!error && data && data.length > 0) {
        return NextResponse.json(data);
      }
    }
  } catch (err) {
    console.warn('Supabase categories error:', err);
  }

  return NextResponse.json(CATEGORIES);
}

