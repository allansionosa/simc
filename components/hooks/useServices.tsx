// NOTE:
// API-based services fetching is disabled for now so the site can be
// deployed as a static site to Vercel. When your API is ready,
// restore the fetch logic below and remove the dummy data.
//
// export const getServices = async (): Promise<Services[]> => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
//     },
//     cache: 'no-store',
//   });
//   if (!res.ok) throw new Error('Failed to fetch data');
//   return res.json();
// };

const dummyServices: Services[] = [
  {
    id: 1,
    image: '/room3.jpg',
    logo: '/logo.png',
    title: 'Outpatient Consultation',
    description:
      'Comprehensive outpatient consultations with SIMC physicians across multiple specialties.',
    slug: 'outpatient-consultation',
  },
  {
    id: 2,
    image: '/room1.jpg',
    logo: '/logo.png',
    title: 'Diagnostic Imaging',
    description:
      'Modern imaging services including X-ray and ultrasound to assist in accurate diagnosis.',
    slug: 'diagnostic-imaging',
  },
];

export const getServices = async (): Promise<Services[]> => {
  return Promise.resolve(dummyServices);
};
