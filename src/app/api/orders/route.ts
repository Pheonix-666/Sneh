import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { isSupabaseConfigured } from '@/lib/supabase';

// In-memory orders cache for instant demonstration and offline mode
let inMemoryOrders: any[] = [
  {
    id: 'SNEH-A789X1',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    customer: {
      name: 'Devendra Kothari',
      email: 'devendra@example.com',
      phone: '+91 98201 12345',
    },
    items: [
      {
        id: 'anime-1',
        name: 'Roronoa Zoro "Asura" 7-Layer 3D Wooden Manga Box',
        price: 2499,
        qty: 1,
        woodFinish: 'Natural Birch & Walnut',
        customEngraving: 'Nothing Happened',
      },
    ],
    subtotal: 2499,
    tax: 75,
    shipping: 0,
    total: 2574,
    order_status: 'In Production',
    payment_status: 'Paid (UPI)',
    payment_method: 'UPI',
    shipping_address: {
      street: '12 Marine Drive',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400020',
      country: 'India',
    },
  },
  {
    id: 'SNEH-B412Y8',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    customer: {
      name: 'Ananya Sharma',
      email: 'ananya@example.com',
      phone: '+91 97110 54321',
    },
    items: [
      {
        id: 'gods-1',
        name: 'Ayodhya Shri Ram Mandir 9-Tier Sanctum Altar',
        price: 3499,
        qty: 1,
        woodFinish: 'Burma Teak',
        customEngraving: 'जय श्री राम',
      },
    ],
    subtotal: 3499,
    tax: 105,
    shipping: 0,
    total: 3604,
    order_status: 'Dispatched',
    payment_status: 'Cash on Delivery',
    payment_method: 'COD',
    tracking_number: 'BLUEDART-8829104',
    shipping_address: {
      street: '45 Aliganj Sector B',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226024',
      country: 'India',
    },
  },
];

export async function GET() {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseServer
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json(data);
      }
    }
  } catch (err) {
    console.warn('Supabase orders fetch error, returning demo orders:', err);
  }

  return NextResponse.json(inMemoryOrders);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orderRecord = {
      id: body.id || `SNEH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      created_at: new Date().toISOString(),
      items: body.items || [],
      subtotal: body.subtotal || 0,
      tax: body.tax || 0,
      shipping: body.shipping || 0,
      total: body.total || 0,
      customer: body.customer || {},
      shipping_address: body.shipping_address || {},
      order_status: body.order_status || 'Pending',
      payment_status: body.payment_status || 'Pending',
      payment_method: body.payment_method || 'Cash on Delivery',
      custom_engraving: body.custom_engraving || '',
    };

    if (isSupabaseConfigured) {
      const { data, error } = await supabaseServer
        .from('orders')
        .insert([orderRecord])
        .select();

      if (error) {
        console.warn('Supabase insert failed:', error.message);
      } else if (data) {
        return NextResponse.json(data[0], { status: 201 });
      }
    }

    inMemoryOrders.unshift(orderRecord);
    return NextResponse.json(orderRecord, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

