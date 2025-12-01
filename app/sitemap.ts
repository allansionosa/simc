import { MetadataRoute } from 'next';

// NOTE:
// Dynamic sitemap generation via API has been disabled so that the app
// can be deployed as a fully static website on Vercel.
// When your API is ready, you can restore the fetch helpers and merge
// dynamic slugs into the sitemap again.

// async function getNewsSlugs() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
//     },
//     cache: 'no-store',
//   });
//   if (!res.ok) return [];
//   const news = await res.json();
//   return news.map((n: { slug: string }) => `/news/${n.slug}`);
// }
//
// async function getCareersSlugs() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/careers`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
//     },
//     cache: 'no-store',
//   });
//   if (!res.ok) return [];
//   const careers = await res.json();
//   return careers.map((c: { slug: string }) => `/careers/${c.slug}`);
// }
//
// async function getServicesSlugs() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
//     },
//     cache: 'no-store',
//   });
//   if (!res.ok) return [];
//   const services = await res.json();
//   return services.map((s: { slug: string }) => `/services/${s.slug}`);
// }

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://your-domain.com'; // <-- Change to your actual domain
  const now = new Date();

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

  const allUrls = staticUrls;

  return Promise.resolve(
    allUrls.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
    }))
  );
}
