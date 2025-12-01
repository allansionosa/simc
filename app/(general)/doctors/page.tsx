import { getDoctors } from '@/components/hooks/useDoctor';
import Image from 'next/image';
import { Metadata } from 'next';

// NOTE:
// The API-based doctor header fetching has been disabled so this page can be
// fully static. When your API is ready, restore the getDoctorHeader function
// below and switch the component back to using it.
//
// const getDoctorHeader = async (): Promise<Header> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/doctor/header`,
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

const dummyDoctorHeader: Header = {
  id: 'doctor-header',
  title: 'Our Doctors',
  subTitle: 'Meet the SIMC medical team',
  description:
    'Get to know some of the dedicated doctors serving at St. Irenaeus Medical Center Inc. (SIMC).',
  image: '/doctors-group.jpg',
};

export default async function DoctorsPage() {
  const doctors = await getDoctors();
  const header = dummyDoctorHeader;
  return (
    <main className="bg-surface min-h-screen">
      {/* Hero/Intro */}
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              {header.title}{' '}
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              {header.subTitle}
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              {header.description}
            </p>
            {/* <blockquote className="italic text-accent mt-4">
              “We treat every patient like family.” – Dr. Jane Smith, Chief
              Medical Officer
            </blockquote> */}
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src={header.image}
              alt={`${header.title} Image`}
              width={400}
              height={300}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center p-6"
            >
              <div className="w-24 h-24 relative rounded-full overflow-hidden mb-3">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary mb-1">
                {doctor.name}
              </h3>
              <span className="text-accent font-medium mb-2">
                {doctor.specialties}
              </span>
              <p className="text-muted text-sm mb-4">{doctor.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent py-10">
        <div className="container mx-auto text-center">
          <h4 className="font-heading text-2xl text-white mb-2">
            Want to book an appointment with our doctors?
          </h4>
          <p className="text-white/90 mb-4">
            Contact us today to schedule a consultation or learn more about our
            medical team.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-accent font-semibold px-6 py-2 rounded shadow hover:bg-slate-100 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Our Doctors | St. Irenaeus Medical Center Inc.',
  description:
    'Meet the expert doctors at St. Irenaeus Medical Center Inc. Our team is dedicated to providing exceptional care across a wide range of specialties.',
  keywords: [
    'doctors',
    'medical experts',
    'St. Irenaeus Medical Center',
    'healthcare',
    'specialists',
    'Philippines',
  ],
  openGraph: {
    title: 'Our Doctors | St. Irenaeus Medical Center Inc.',
    description:
      'Meet the expert doctors at St. Irenaeus Medical Center Inc. Our team is dedicated to providing exceptional care across a wide range of specialties.',
    url: 'https://your-domain.com/doctors',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/doctors-group.jpg',
        width: 800,
        height: 600,
        alt: 'Our Doctors at St. Irenaeus Medical Center',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Doctors | St. Irenaeus Medical Center Inc.',
    description:
      'Meet the expert doctors at St. Irenaeus Medical Center Inc. Our team is dedicated to providing exceptional care across a wide range of specialties.',
    images: ['https://your-domain.com/doctors-group.jpg'],
  },
};
