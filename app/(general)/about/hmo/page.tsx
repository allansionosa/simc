import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Globe } from 'lucide-react';
import { Metadata } from 'next';

// NOTE:
// The API-based HMO fetching has been disabled so this page can be fully
// static. When your API is ready, restore the getHMOs and getHMOHeader
// functions below and switch the component back to using them.
//
// const getHMOs = async (): Promise<HMO[]> => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about/hmo`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
//     },
//     cache: 'no-store',
//   });
//   if (!res.ok) throw new Error('Failed to fetch data');
//   return res.json();
// };
//
// const getHMOHeader = async (): Promise<Header> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/about/hmo/header`,
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

const dummyHMOHeader: Header = {
  id: 'hmo-header',
  title: 'Accepted HMOs',
  subTitle: 'Partner health maintenance organizations',
  description:
    'St. Irenaeus Medical Center Inc. (SIMC) partners with several HMO providers to make healthcare more accessible.',
  image: '/hmobg.jpg',
};

const dummyHMOs: HMO[] = [
  {
    id: 1,
    title: 'Intellicare',
    image: '/intellicare.png',
    contactNo: '(000) 000-0001',
    website: 'https://example-hmo.com',
  },
  {
    id: 2,
    title: 'Maxicare',
    image: '/maxicare.png',
    contactNo: '(000) 000-0002',
    website: 'https://another-hmo.com',
  },
];

export default function HMOPage() {
  const data = dummyHMOs;
  const header = dummyHMOHeader;
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              {header.title}{' '}
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              {header.subTitle}{' '}
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              {header.description}
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src={header.image}
              alt={`${header.title} Image`}
              width={400}
              height={400}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* HMO List Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-primary">
          Accepted HMO Companies
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.map((hmo, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={hmo.image}
                      alt={`${hmo.title} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <CardTitle className="text-xl text-primary">
                    {hmo.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">
                      Contact Information
                    </h4>
                    <div className="space-y-1">
                      <p className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 text-accent" />
                        {hmo.contactNo}
                      </p>
                      <p className="flex items-center gap-2 text-gray-600">
                        <Globe className="w-4 h-4 text-accent" />
                        {hmo.website}
                      </p>
                      {/* <p className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4 text-accent" />
                        {hmo.contact.email}
                      </p> */}
                    </div>
                  </div>
                  {/* <div>
                    <h4 className="font-semibold text-primary mb-2">
                      Coverage Includes
                    </h4>
                    <ul className="space-y-1">
                      {hmo.coverage.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-accent py-10">
        <div className="container mx-auto text-center">
          <h4 className="font-heading text-2xl text-white mb-2">
            Need to Verify Your HMO?
          </h4>
          <p className="text-white/90 mb-4">
            Contact us to verify if your HMO is accepted or to learn more about
            our HMO partnerships.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-accent font-semibold px-6 py-2 rounded shadow hover:bg-slate-100 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Accepted HMO Providers | St. Irenaeus Medical Center Inc.',
  description:
    'See the list of accepted HMO providers at St. Irenaeus Medical Center Inc. We partner with leading companies to provide accessible healthcare.',
  keywords: [
    'HMO',
    'health maintenance organization',
    'insurance',
    'St. Irenaeus Medical Center',
    'healthcare',
    'Philippines',
  ],
  openGraph: {
    title: 'Accepted HMO Providers | St. Irenaeus Medical Center Inc.',
    description:
      'See the list of accepted HMO providers at St. Irenaeus Medical Center Inc. We partner with leading companies to provide accessible healthcare.',
    url: 'https://your-domain.com/about/hmo',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/hmobg.jpg',
        width: 800,
        height: 600,
        alt: 'Accepted HMO Providers',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accepted HMO Providers | St. Irenaeus Medical Center Inc.',
    description:
      'See the list of accepted HMO providers at St. Irenaeus Medical Center Inc. We partner with leading companies to provide accessible healthcare.',
    images: ['https://your-domain.com/hmobg.jpg'],
  },
};
