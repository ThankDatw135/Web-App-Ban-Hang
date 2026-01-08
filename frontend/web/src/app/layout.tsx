import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Luxury Fashion | Quiet Luxury · Timeless Elegance',
    template: '%s | Luxury Fashion',
  },
  description: 'Discover the epitome of quiet luxury. Curated collections of timeless fashion pieces designed for the discerning individual.',
  keywords: ['luxury fashion', 'designer clothing', 'quiet luxury', 'timeless elegance', 'premium fashion'],
  authors: [{ name: 'Luxury Fashion' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Luxury Fashion',
    title: 'Luxury Fashion | Quiet Luxury · Timeless Elegance',
    description: 'Discover the epitome of quiet luxury.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Fashion',
    description: 'Discover the epitome of quiet luxury.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="vi" 
      className={`${inter.variable} ${playfair.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-dark-bg text-warm-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
