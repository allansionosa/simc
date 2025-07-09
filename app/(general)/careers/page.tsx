import { Metadata } from 'next';
import CareersClient from '@/components/careers/careers-client';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Careers | St. Irenaeus Medical Center Inc.',
  description:
    'Join our healthcare team at St. Irenaeus Medical Center. Explore open positions and build your future with us.',
  keywords: [
    'careers',
    'jobs',
    'employment',
    'healthcare',
    'medical center',
    'hiring',
    'St. Irenaeus',
    'Philippines',
  ],
  openGraph: {
    title: 'Careers | St. Irenaeus Medical Center Inc.',
    description:
      'Join our healthcare team at St. Irenaeus Medical Center. Explore open positions and build your future with us.',
    url: 'https://your-domain.com/careers',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/hiring.jpg',
        width: 800,
        height: 600,
        alt: 'Careers at St. Irenaeus Medical Center',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | St. Irenaeus Medical Center Inc.',
    description:
      'Join our healthcare team at St. Irenaeus Medical Center. Explore open positions and build your future with us.',
    images: ['https://your-domain.com/hiring.jpg'],
  },
};

export const getCareers = async (): Promise<Careers[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/careers`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

const getCareerHeader = async (): Promise<Header> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/careers/header`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

export default async function CareersPage() {
  const jobs = await getCareers();
  const header = await getCareerHeader();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-10">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20 mb-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              {header.title}
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              {header.subTitle}
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              {header.description}
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src={header.image}
              alt={`${header.title} Image`}
              width={400}
              height={400}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      <CareersClient jobs={jobs} />
    </div>
  );
}
