// NOTE:
// API-based home about fetching is disabled for now so the site can be
// deployed as a static site to Vercel. When your API is ready,
// restore the fetch logic below and remove the dummy data.
//
// export const getAbout = async (): Promise<About> => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home/about`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
//     },
//     cache: 'no-store',
//   });
//   if (!res.ok) throw new Error('Failed to fetch data');
//   return res.json();
// };

const dummyAbout: About = {
  id: 1,
  title: 'About St. Irenaeus Medical Center Inc. (SIMC)',
  subTitle: 'Your partner in compassionate healthcare',
  description:
    'St. Irenaeus Medical Center Inc. (SIMC) is a modern healthcare facility committed to providing patient-centered medical services to the community.',
  image: '/room1.jpg',
};

export const getAbout = async (): Promise<About> => {
  return Promise.resolve(dummyAbout);
};
