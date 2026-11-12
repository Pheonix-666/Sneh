/**
 * Admin authentication utilities for Sneh Enterprises
 */
export async function getAdminToken(): Promise<string> {
  const pass = process.env.ADMIN_PASSWORD || process.env.ADMIN_PASS || 'snehadmin2026';
  const data = new TextEncoder().encode(`admin:${pass}:sneh_enterprises_session_v1`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function isValidAdminSession(sessionToken?: string | null): Promise<boolean> {
  if (!sessionToken) return false;
  const expectedToken = await getAdminToken();
  return Boolean(expectedToken && sessionToken === expectedToken);
}

