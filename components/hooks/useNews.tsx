// NOTE:
// API-based news fetching is disabled for now so the site can be
// deployed as a static site to Vercel. When your API is ready,
// restore the fetch logic below and remove the dummy data.
//
// export const getNews = async (): Promise<News[]> => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
//     },
//     cache: 'no-store',
//   });
//   if (!res.ok) throw new Error('Failed to fetch data');
//   return res.json();
// };

const dummyNews: News[] = [
  {
    id: 1,
    title: 'SIMC Now Accepting New Patients',
    slug: 'simc-now-accepting-new-patients',
    description:
      'St. Irenaeus Medical Center Inc. (SIMC) is now accepting new patients for our outpatient services.',
    type: 'Announcement',
    image: '/appointment.jpg',
    addedDate: '2025-01-01',
  },
  {
    id: 2,
    title: 'SIMC Launches Community Health Program',
    slug: 'simc-launches-community-health-program',
    description:
      'Learn more about our new community outreach initiative focused on preventive healthcare.',
    type: 'News',
    image: '/room1.jpg',
    addedDate: '2025-01-15',
  },
];

export const getNews = async (): Promise<News[]> => {
  return Promise.resolve(dummyNews);
};
