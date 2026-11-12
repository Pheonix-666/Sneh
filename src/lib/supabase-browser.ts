import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabaseBrowser = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    cookieOptions: {
      maxAge: 30 * 24 * 60 * 60,
      name: 'sneh-auth-token'
    }
  }
);

