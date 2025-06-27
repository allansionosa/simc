import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Yeseva_One } from 'next/font/google';
import '@/app/globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const yeseva = Yeseva_One({
  variable: '--font-yeseva',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'St. Irenaeus Medical Center Inc.',
  description: 'St. Irenaeus Medical Center Inc.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${yeseva.variable} antialiased scroll-smooth`}
      >
        {children}
      </body>
    </html>
  );
}
