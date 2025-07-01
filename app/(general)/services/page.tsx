import { getServices } from '@/components/hooks/useServices';
import Image from 'next/image';

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <main className="bg-surface min-h-screen">
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              Our Services
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              Care You Can Believe In
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              We offer a comprehensive range of medical services, delivered by
              expert professionals in a caring and modern environment. Your
              health and well-being are our top priorities.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/room3.jpg"
              alt="Hospital Service"
              width={400}
              height={400}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <a
              key={service.id}
              href={`/services/${service.slug}`}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center p-6 no-underline"
            >
              <Image
                src={service.logo}
                alt={service.title}
                width={30}
                height={30}
              />
              <h3 className="font-heading font-bold text-lg text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-muted text-sm mb-4">{service.description}</p>
              <div className="w-full h-32 relative rounded-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-accent py-10">
        <div className="container mx-auto text-center">
          <h4 className="font-heading text-2xl text-white mb-2">
            Need more information about our services?
          </h4>
          <p className="text-white/90 mb-4">
            Contact us today to schedule an appointment or speak with our team.
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
