import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const getCompanyProfile = async (): Promise<CompanyProfile> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/about/company-profile`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

export const getVision = async (): Promise<Vision> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vision`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

export const getMission = async (): Promise<Mission[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mission`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

export const getFacilities = async (): Promise<Facilities[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/about/facilities`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

export const metadata: Metadata = {
  title: 'Company Profile | St. Irenaeus Medical Center Inc.',
  description:
    'Discover the vision, mission, and facilities of St. Irenaeus Medical Center Inc. - a modern healthcare facility committed to excellence.',
  keywords: [
    'company profile',
    'vision',
    'mission',
    'facilities',
    'St. Irenaeus Medical Center',
    'healthcare',
    'Philippines',
  ],
  openGraph: {
    title: 'Company Profile | St. Irenaeus Medical Center Inc.',
    description:
      'Discover the vision, mission, and facilities of St. Irenaeus Medical Center Inc. - a modern healthcare facility committed to excellence.',
    url: 'https://your-domain.com/about/company-profile',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/room1.jpg',
        width: 800,
        height: 600,
        alt: 'St. Irenaeus Medical Center Facilities',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Company Profile | St. Irenaeus Medical Center Inc.',
    description:
      'Discover the vision, mission, and facilities of St. Irenaeus Medical Center Inc. - a modern healthcare facility committed to excellence.',
    images: ['https://your-domain.com/room1.jpg'],
  },
};

export default async function CompanyProfile() {
  const data = await getCompanyProfile();
  const vision = await getVision();
  const missions = await getMission();
  const facilities = await getFacilities();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              {data.title}
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              {data.subTitle}
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              {data.description}
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src={data.image}
              alt={data.title}
              width={400}
              height={400}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">
              {vision.title}
            </h2>
            <div
              className="tiptap-content"
              dangerouslySetInnerHTML={{ __html: vision.description }}
            />
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/room1.jpg"
              alt="Modern Hospital Interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-primary">
            Our Mission & Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {missions.map((value) => (
              <Card
                key={value.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  {/* <div className="text-4xl mb-4">{value.icon}</div> */}
                  <CardTitle className="text-xl text-primary">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-primary">
          Our Facilities
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {facilities.map((facility, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 pt-0"
            >
              <div className="relative h-64">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  {facility.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{facility.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-accent py-10">
        <div className="container mx-auto text-center">
          <h4 className="font-heading text-2xl text-white mb-2">
            Stay Updated on Our Progress
          </h4>
          <p className="text-white/90 mb-4">
            Join our mailing list to receive updates about our opening and
            future services.
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
