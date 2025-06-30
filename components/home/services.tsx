import ServiceClient from './service-client';

const getServices = async (): Promise<Services[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

export default async function Services() {
  const data = await getServices();
  return (
    <section className="container mx-auto sm:px-0 px-4 py-10">
      <h1 className="uppercase text-accent font-medium w-full text-base tracking-widest text-center">
        CARE YOU CAN BELIEVE IN
      </h1>
      <h2 className="text-primary/80 tracking-wide text-2xl md:text-4xl font-heading py-3 text-center">
        Our Services
      </h2>
      {/* Responsive layout: flex-col on mobile, flex-row on lg+ */}
      <ServiceClient data={data} />
    </section>
  );
}
