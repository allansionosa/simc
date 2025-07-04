import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Yeseva_One } from 'next/font/google';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/sonner';

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
  title: {
    default: 'St. Irenaeus Medical Center Inc.',
    template: '%s | St. Irenaeus Medical Center Inc.',
  },
  description:
    'St. Irenaeus Medical Center Inc. offers comprehensive healthcare services in a modern, patient-centered environment. Book appointments, explore our services, and meet our expert doctors.',
  keywords: [
    'medical center',
    'healthcare',
    'doctors',
    'appointments',
    'services',
    'St. Irenaeus',
    'hospital',
    'Philippines',
  ],
  openGraph: {
    title: 'St. Irenaeus Medical Center Inc.',
    description:
      'Comprehensive healthcare services in a modern, patient-centered environment.',
    url: 'https://your-domain.com', // <-- Change to your actual domain
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/simc_blue.png',
        width: 800,
        height: 600,
        alt: 'St. Irenaeus Medical Center',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'St. Irenaeus Medical Center Inc.',
    description:
      'Comprehensive healthcare services in a modern, patient-centered environment.',
    images: ['https://your-domain.com/simc_blue.png'],
  },
  alternates: {
    canonical: 'https://your-domain.com', // <-- Change to your actual domain
  },
};
export const fetchCache = 'default-no-store';

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
        <Toaster />
      </body>
    </html>
  );
}
