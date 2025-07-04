import { MetadataRoute } from 'next';

async function getNewsSlugs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const news = await res.json();
  return news.map((n: { slug: string }) => `/news/${n.slug}`);
}

async function getCareersSlugs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/careers`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const careers = await res.json();
  return careers.map((c: { slug: string }) => `/careers/${c.slug}`);
}

async function getServicesSlugs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const services = await res.json();
  return services.map((s: { slug: string }) => `/services/${s.slug}`);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://your-domain.com'; // <-- Change to your actual domain
  const now = new Date();

  const [newsUrls, careersUrls, servicesUrls] = await Promise.all([
    getNewsSlugs(),
    getCareersSlugs(),
    getServicesSlugs(),
  ]);

  const staticUrls = [
    '/',
    '/about/about-us',
    '/about/company-profile',
    '/about/hmo',
    '/appointment',
    '/careers',
    '/contact',
    '/doctors',
    '/hmo-approval',
    '/news',
    '/services',
    '/terms-and-conditions',
    '/privacy-policy',
  ];

  const allUrls = [...staticUrls, ...newsUrls, ...careersUrls, ...servicesUrls];

  return allUrls.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));
}
