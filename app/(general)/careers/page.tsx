import CareersClient from '@/components/careers/careers-client';
import Image from 'next/image';

export const getCareers = async (): Promise<Careers[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/careers`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

export default async function CareersPage() {
  const jobs = await getCareers();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-10">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20 mb-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              Careers
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              Build Your Future With Us
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              At St. Irenaeus Medical Center, we believe in nurturing talent and
              empowering our team to make a real difference in healthcare.
              Explore our open positions and join a community that values
              compassion, growth, and excellence.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/hiring.jpg"
              alt="Join our healthcare team"
              width={400}
              height={400}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      <CareersClient jobs={jobs} />
    </div>
  );
}
