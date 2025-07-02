import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get careers data
  const careersRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/careers`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      cache: 'no-store',
    }
  );

  let careers: Careers[] = [];
  if (careersRes.ok) {
    careers = await careersRes.json();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://stirenaeusmedicalcenter.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/appointment`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Dynamic career pages
  const careerPages = careers.map((career) => ({
    url: `${baseUrl}/careers/${career.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...careerPages];
}
