import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sneh Enterprises | Master Artisans of Wooden Gifts, Sacred Deities & Anime Heritage',
    template: '%s | Sneh Enterprises',
  },
  description:
    'Handcrafted wooden gifts, 3D layered anime manga shadowboxes, sacred Hindu deity walnut frames, mandir backdrops, executive desk organizers, and custom laser-engraved corporate trophies.',
  keywords: [
    'wooden gifts',
    'anime wooden art',
    'wooden manga panel',
    '3d anime shadowbox',
    'sacred deities woodcraft',
    'ram mandir wooden altar',
    'nataraja laser frame',
    'ganesha wooden wall art',
    'wooden desk organizer',
    'custom laser engraved trophy',
    'sneh enterprises',
    'luxury wooden decor',
  ],
  authors: [{ name: 'Sneh Enterprises Atelier' }],
  creator: 'Sneh Enterprises',
  publisher: 'Sneh Enterprises',
  openGraph: {
    title: 'Sneh Enterprises | Handcrafted Wooden Gifts, Sacred Deities & Anime Heritage',
    description:
      'Where Millennia of Sacred Heritage Meets Master Laser Precision. Bespoke wooden collectibles, temple backdrops, and anime art.',
    url: siteUrl,
    siteName: 'Sneh Enterprises',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF8F5] text-espresso antialiased min-h-screen selection:bg-gold/30 selection:text-espresso font-sans">
        <ToastProvider>
          <CartProvider>{children}</CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
