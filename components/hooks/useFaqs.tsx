// NOTE:
// API-based FAQs fetching is disabled for now so the site can be
// deployed as a static site to Vercel. When your API is ready,
// restore the fetch logic below and remove the dummy data.
//
// export const getFaqs = async (): Promise<FAQs[]> => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faqs`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
//     },
//     cache: 'no-store',
//   });
//   if (!res.ok) throw new Error('Failed to fetch data');
//   return res.json();
// };

const dummyFaqs: FAQs[] = [
  {
    id: 1,
    title: 'Where is St. Irenaeus Medical Center Inc. (SIMC) located?',
    description:
      'SIMC is located at our sample address. This is placeholder information for the static site version.',
  },
  {
    id: 2,
    title: 'How can I book an appointment?',
    description:
      'You can submit your request through the appointment page form or contact us using the numbers provided.',
  },
];

export const getFaqs = async (): Promise<FAQs[]> => {
  return Promise.resolve(dummyFaqs);
};
