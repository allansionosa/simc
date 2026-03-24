// NOTE:
// API-based doctors fetching is disabled for now so the site can be
// deployed as a static site to Vercel. When your API is ready,
// restore the fetch logic below and remove the dummy data.
//
// export const getDoctors = async (): Promise<Doctors[]> => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
//     },
//     cache: 'no-store',
//   });
//   if (!res.ok) throw new Error('Failed to fetch data');
//   return res.json();
// };

import { getPublicDoctorsDirectory } from '@/components/hmo-approval/accredited-doctors';

export const getDoctors = async (): Promise<Doctors[]> => {
  const directory = getPublicDoctorsDirectory();
  return directory.map((d, index) => ({
    id: index + 1,
    publicId: d.id,
    name: d.name,
    image: d.image,
    specialties: d.specialty,
    description: d.description,
    accreditedHmos: d.accreditedHmos,
  }));
};
