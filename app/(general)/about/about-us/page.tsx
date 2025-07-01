import Image from 'next/image';
import { HeartPulse, Users, ShieldCheck, Stethoscope } from 'lucide-react';
import { getAbout } from '@/components/hooks/useAbout';
import { getDoctors } from '@/components/hooks/useDoctor';

export default async function AboutPage() {
  const data = await getAbout();
  const doctors = await getDoctors();
  return (
    <main className="bg-surface min-h-screen">
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

      {/* Why Choose Us / Values */}
      <section className="container mx-auto py-12 px-4">
        <h3 className="text-center text-accent uppercase font-medium tracking-widest mb-2">
          Why Choose Us
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <HeartPulse className="w-10 h-10 text-accent mb-2" />
            <span className="font-heading font-bold text-lg text-primary mb-1">
              Compassionate Care
            </span>
            <p className="text-muted text-sm">
              We treat every patient with empathy, respect, and dignity.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Stethoscope className="w-10 h-10 text-accent mb-2" />
            <span className="font-heading font-bold text-lg text-primary mb-1">
              Expert Doctors
            </span>
            <p className="text-muted text-sm">
              Our team consists of highly skilled and experienced medical
              professionals.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="w-10 h-10 text-accent mb-2" />
            <span className="font-heading font-bold text-lg text-primary mb-1">
              Patient Safety
            </span>
            <p className="text-muted text-sm">
              We maintain the highest standards of safety and cleanliness.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users className="w-10 h-10 text-accent mb-2" />
            <span className="font-heading font-bold text-lg text-primary mb-1">
              Community Focused
            </span>
            <p className="text-muted text-sm">
              We are committed to serving and supporting our local community.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="container mx-auto py-12 px-4">
        <h3 className="text-center text-accent uppercase font-medium tracking-widest mb-2">
          Meet Our Leadership
        </h3>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {doctors.map((doctor, i) => (
            <div className="flex flex-col items-center" key={i}>
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={120}
                height={120}
                className="rounded-full object-cover shadow"
              />
              <span className="font-heading font-bold text-primary mt-2">
                {doctor.name}
              </span>
              <span className="text-muted text-sm">{doctor.specialties}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent py-10">
        <div className="container mx-auto text-center">
          <h4 className="font-heading text-2xl text-white mb-2">
            Ready to experience exceptional care?
          </h4>
          <p className="text-white/90 mb-4">
            Contact us today to schedule an appointment or learn more about our
            services.
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
