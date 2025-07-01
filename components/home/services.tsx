import { getServices } from '../hooks/useServices';
import ServiceClient from './service-client';

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
