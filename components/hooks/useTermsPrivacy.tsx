// NOTE:
// API-based terms & privacy fetching is disabled for now so the site can be
// deployed as a static site to Vercel. When your API is ready,
// restore the fetch logic below and remove the dummy data.
//
// export const getTermsPrivacy = async (): Promise<TermsPrivacy> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/terms-privacy`,
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
//       },
//       cache: 'no-store',
//     }
//   );
//   if (!res.ok) throw new Error('Failed to fetch data');
//   return res.json();
// };

const dummyTermsPrivacy: TermsPrivacy = {
  id: 1,
  termsAndConditions:
    '<p>These terms and conditions are placeholder content for St. Irenaeus Medical Center Inc. (SIMC) while the site is running in static mode.</p>',
  privacyPolicy:
    '<p>This privacy policy is sample text for SIMC and should be replaced with the official policy once available.</p>',
  termsLastModified: '2025-01-01',
  privacyLastModified: '2025-01-01',
  updatedBy: null,
};

export const getTermsPrivacy = async (): Promise<TermsPrivacy> => {
  return Promise.resolve(dummyTermsPrivacy);
};
