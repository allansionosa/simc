// NOTE:
// API-based institution fetching is disabled for now so the site can be
// deployed as a static site to Vercel. When your API is ready, restore the
// fetch logic below and remove the dummy data.
//
// export const Institution = async (): Promise<Institution> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/institution`,
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
//       },
//       cache: 'no-store',
//     }
//   );
//   if (!res.ok) throw new Error('Failed to fetch');
//   return res.json();
// };

const dummyInstitution: Institution = {
  id: 1,
  logo: '/logo.png',
  logoWhite: '/logo-white.png',
  address: 'St. Irenaeus Medical Center Inc. (SIMC), Sample Address',
  facebook: 'https://facebook.com/simc',
  emailGeneralInfo: 'info@simc.example',
  emailCareers: 'careers@simc.example',
  emailAppointment: 'appointments@simc.example',
  contactNo: '(000) 000-0000',
  addressLink: 'https://maps.google.com',
};

export const Institution = async (): Promise<Institution> => {
  return Promise.resolve(dummyInstitution);
};
