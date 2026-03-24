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
  {
    id: 3,
    title: 'Expanded Diagnostic Hours',
    slug: 'expanded-diagnostic-hours',
    description:
      'Updated schedules for imaging and laboratory services to better serve working families.',
    type: 'Announcement',
    image: '/room3.jpg',
    addedDate: '2025-02-01',
  },
  {
    id: 4,
    title: 'Flu Season Reminders',
    slug: 'flu-season-reminders',
    description:
      'What to know before your visit during peak respiratory season, including masking and triage.',
    type: 'Health tip',
    image: '/appointment.jpg',
    addedDate: '2025-02-10',
  },
  {
    id: 5,
    title: 'HMO Partners: What’s New',
    slug: 'hmo-partners-update',
    description:
      'A quick look at accepted plans and how to verify coverage before your appointment.',
    type: 'News',
    image: '/room1.jpg',
    addedDate: '2025-02-20',
  },
  {
    id: 6,
    title: 'Volunteer & Outreach Day',
    slug: 'volunteer-outreach-day',
    description:
      'Thank you to everyone who joined our community screening and education event.',
    type: 'Community',
    image: '/room3.jpg',
    addedDate: '2025-03-01',
  },
];

export const getNews = async (): Promise<News[]> => {
  return Promise.resolve(dummyNews);
};
