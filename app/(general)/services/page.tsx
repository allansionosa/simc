import {
  Syringe,
  FlaskConical,
  Bone,
  Stethoscope,
  HeartPulse,
  Scissors,
} from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    name: 'Anesthesiology',
    icon: <Syringe className="w-8 h-8 text-accent mb-2" />,
    description:
      'Safe and effective anesthesia care for all types of surgeries and procedures.',
    image: '/room1.jpg',
  },
  {
    name: 'Laboratory',
    icon: <FlaskConical className="w-8 h-8 text-accent mb-2" />,
    description:
      'Comprehensive laboratory services with state-of-the-art equipment for accurate diagnostics.',
    image: '/room2.jpg',
  },
  {
    name: 'Orthopedic',
    icon: <Bone className="w-8 h-8 text-accent mb-2" />,
    description:
      'Expert care for bone, joint, and muscle conditions, from diagnosis to rehabilitation.',
    image: '/room3.jpg',
  },
  {
    name: 'Pediatrics',
    icon: <Stethoscope className="w-8 h-8 text-accent mb-2" />,
    description:
      'Compassionate pediatric care for infants, children, and adolescents.',
    image: '/room4.jpg',
  },
  {
    name: 'Rehabilitation',
    icon: <HeartPulse className="w-8 h-8 text-accent mb-2" />,
    description:
      'Personalized rehabilitation programs to help patients regain strength and mobility.',
    image: '/room1.jpg',
  },
  {
    name: 'Surgery',
    icon: <Scissors className="w-8 h-8 text-accent mb-2" />,
    description:
      'Advanced surgical services with a focus on safety, precision, and patient comfort.',
    image: '/room2.jpg',
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-surface min-h-screen">
      {/* Hero/Intro */}
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
            <div
              key={service.name}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center p-6"
            >
              {service.icon}
              <h3 className="font-heading font-bold text-lg text-primary mb-2">
                {service.name}
              </h3>
              <p className="text-muted text-sm mb-4">{service.description}</p>
              <div className="w-full h-32 relative rounded-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
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
