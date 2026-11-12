import { NextResponse } from 'next/server';
import { getAdminToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const expectedPass = process.env.ADMIN_PASSWORD || process.env.ADMIN_PASS || 'snehadmin2026';

    if (!password || password !== expectedPass) {
      return NextResponse.json({ error: 'Invalid workshop administrative password' }, { status: 401 });
    }

    const token = await getAdminToken();
    const response = NextResponse.json({ success: true, message: 'Authentication successful' });

    response.cookies.set('sneh_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

