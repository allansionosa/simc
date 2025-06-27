'use client';
import { useState } from 'react';
import {
  Syringe,
  FlaskConical,
  Bone,
  Stethoscope,
  HeartPulse,
  Scissors,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const servicesData = [
  {
    name: 'Anesthesiology',
    icon: <Syringe className="w-8 h-8 mx-auto" />,
    description:
      'Our Anesthesiology Unit provides safe and effective anesthesia care for all types of surgeries and procedures.',
    image: '/room1.jpg',
  },
  {
    name: 'Laboratory',
    icon: <FlaskConical className="w-8 h-8 mx-auto" />,
    description:
      'Comprehensive laboratory services with state-of-the-art equipment for accurate diagnostics.',
    image: '/room2.jpg',
  },
  {
    name: 'Orthopedic',
    icon: <Bone className="w-8 h-8 mx-auto" />,
    description:
      'Expert orthopedic care for bone, joint, and muscle conditions, from diagnosis to rehabilitation.',
    image: '/room3.jpg',
  },
  {
    name: 'Pediatrics',
    icon: <Stethoscope className="w-8 h-8 mx-auto" />,
    description:
      'Compassionate pediatric care for infants, children, and adolescents in a family-friendly environment.',
    image: '/room4.jpg',
  },
  {
    name: 'Rehabilitation',
    icon: <HeartPulse className="w-8 h-8 mx-auto" />,
    description:
      'Personalized rehabilitation programs to help patients regain strength and mobility.',
    image: '/room1.jpg',
  },
  {
    name: 'Surgery',
    icon: <Scissors className="w-8 h-8 mx-auto" />,
    description:
      'Advanced surgical services with a focus on safety, precision, and patient comfort.',
    image: '/room2.jpg',
  },
];

const Services = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="container mx-auto sm:px-0 px-4 py-10">
      <h1 className="uppercase text-accent font-medium w-full text-base tracking-widest text-center">
        CARE YOU CAN BELIEVE IN
      </h1>
      <h2 className="text-primary/80 tracking-wide text-2xl md:text-4xl font-heading py-3 text-center">
        Our Services
      </h2>
      {/* Responsive layout: flex-col on mobile, flex-row on lg+ */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Service Grid */}
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <div className="grid grid-cols-2 grid-rows-3 gap-4">
            {servicesData.map((service, idx) => (
              <button
                key={service.name}
                className={`flex flex-col items-center justify-center border rounded-lg p-6 transition-all duration-200 focus:outline-none
                  ${
                    selected === idx
                      ? 'bg-primary text-white shadow-lg border-primary'
                      : 'bg-white text-primary border-gray-200 hover:bg-primary/10'
                  }
                `}
                onClick={() => setSelected(idx)}
                aria-pressed={selected === idx}
              >
                <span
                  className={selected === idx ? 'text-white' : 'text-primary'}
                >
                  {service.icon}
                </span>
                <span
                  className={`mt-2 font-sans text-base ${
                    selected === idx ? 'text-white' : 'text-primary'
                  }`}
                >
                  {service.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 relative rounded-lg shadow overflow-hidden min-h-[260px] flex items-end">
          <Image
            src={servicesData[selected].image}
            alt={servicesData[selected].name}
            fill
            className="object-cover w-full h-full"
            priority
          />
          {/* Responsive overlay: full on mobile, bottom on lg+ */}
          <div
            className="
              absolute inset-0 w-full h-full flex items-center justify-center z-10
              lg:items-end lg:justify-start
            "
          >
            <div
              className="
                bg-white/80 backdrop-blur-sm w-full h-full rounded-lg flex flex-col justify-center p-6
                lg:h-auto lg:rounded-none lg:rounded-b-lg lg:justify-end
              "
            >
              <h3 className="font-heading text-lg text-primary mb-2 font-bold">
                {servicesData[selected].name} Unit
              </h3>
              <p className="text-black/80 mb-4">
                {servicesData[selected].description}
              </p>
              <Button className="bg-accent text-white font-medium hover:bg-accent/90 w-fit">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
