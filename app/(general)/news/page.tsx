import { getNews } from '@/components/hooks/useNews';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Metadata } from 'next';

const getNewsHeader = async (): Promise<Header> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/news/header`,
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

export default async function NewsPage() {
  const data = await getNews();
  const header = await getNewsHeader();
  return (
    <main className="bg-surface min-h-screen">
      {/* Hero/Intro */}
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20">
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
              height={300}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {data.map((news, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col md:flex-row h-full"
            >
              <div className="relative w-full h-40 md:w-48 md:h-auto flex-shrink-0">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 200px"
                  priority={idx === 0}
                />
              </div>
              <div className="p-4 flex flex-col flex-1 justify-center">
                <div className="text-xs text-accent mb-1">
                  {dayjs(news.addedDate).format('dddd DD, MMMM YYYY')} |{' '}
                  {news.type}
                </div>
                <div className="font-semibold text-primary mb-2 leading-snug">
                  {news.title}
                </div>
                <div className="text-muted text-sm mb-2">
                  {news.description}
                </div>
                <div>
                  <a
                    href={`news/${news.slug}`}
                    className="text-accent text-sm font-medium hover:underline"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent py-10">
        <div className="container mx-auto text-center">
          <h4 className="font-heading text-2xl text-white mb-2">
            Want to stay updated with our latest news?
          </h4>
          <p className="text-white/90 mb-4">
            Subscribe to our newsletter or follow us on social media for more
            updates.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-accent font-semibold px-6 py-2 rounded shadow hover:bg-slate-100 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'News & Updates | St. Irenaeus Medical Center Inc.',
  description:
    'Stay up to date with the latest news, events, and updates from St. Irenaeus Medical Center Inc. We are committed to keeping our community informed and healthy.',
  keywords: [
    'St. Irenaeus Medical Center',
    'news',
    'updates',
    'events',
    'healthcare',
    'hospital',
    'Philippines',
  ],
  openGraph: {
    title: 'News & Updates | St. Irenaeus Medical Center Inc.',
    description:
      'Stay up to date with the latest news, events, and updates from St. Irenaeus Medical Center Inc.',
    url: 'https://your-domain.com/news',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/news1.jpg',
        width: 800,
        height: 600,
        alt: 'St. Irenaeus Medical Center News',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News & Updates | St. Irenaeus Medical Center Inc.',
    description:
      'Stay up to date with the latest news, events, and updates from St. Irenaeus Medical Center Inc.',
    images: ['https://your-domain.com/news1.jpg'],
  },
};
