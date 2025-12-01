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

const dummyDoctors: Doctors[] = [
  {
    id: 1,
    name: 'Dr. Juan Dela Cruz',
    image: '/doctor2.jpg',
    specialties: 'Internal Medicine',
    description:
      'Experienced internist at St. Irenaeus Medical Center Inc. (SIMC) dedicated to holistic patient care.',
  },
  {
    id: 2,
    name: 'Dr. Maria Santos',
    image: '/doctor1.jpg',
    specialties: 'Pediatrics',
    description:
      'Pediatric specialist providing compassionate care to children and families at SIMC.',
  },
];

export const getDoctors = async (): Promise<Doctors[]> => {
  return Promise.resolve(dummyDoctors);
};
