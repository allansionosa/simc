import About from '@/components/home/about';
import ContactUs from '@/components/home/contact-us';
import Hero from '@/components/home/Hero';
import Map from '@/components/home/map';
import News from '@/components/home/news';
import Portals from '@/components/home/portals';

import Services from '@/components/home/services';
import { Metadata } from 'next';

export default function Home() {
  return (
    <div>
      <Hero />
      <Portals />
      <About />
      <Services />
      <News />
      <ContactUs />
      <Map />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Home | St. Irenaeus Medical Center Inc.',
  description:
    'Welcome to St. Irenaeus Medical Center Inc. — your trusted partner in healthcare. Explore our services, meet our expert doctors, and book appointments online.',
  keywords: [
    'St. Irenaeus Medical Center',
    'healthcare',
    'hospital',
    'doctors',
    'medical services',
    'appointments',
    'Philippines',
  ],
  openGraph: {
    title: 'St. Irenaeus Medical Center Inc.',
    description:
      'Your trusted partner in healthcare. Explore our services, meet our expert doctors, and book appointments online.',
    url: 'https://your-domain.com',
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
      'Your trusted partner in healthcare. Explore our services, meet our expert doctors, and book appointments online.',
    images: ['https://your-domain.com/simc_blue.png'],
  },
};
