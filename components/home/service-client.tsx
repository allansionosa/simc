'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ServiceClient({ data }: { data: Services[] }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-8">
      {/* Service Grid */}
      <div className="w-full lg:w-1/2 flex-shrink-0">
        <div className="grid grid-cols-2 grid-rows-3 gap-4">
          {data.map((service, idx) => (
            <button
              key={service.id}
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
              <div className="w-8 h-8 mx-auto mb-2 ">
                <Image
                  src={service.logo}
                  alt={service.title}
                  width={32}
                  height={32}
                  className={`w-full h-full object-contain ${
                    selected === idx
                      ? 'filter brightness-0 invert'
                      : 'filter brightness-0 saturate-100 invert-[0.2] sepia-[1]  hue-rotate-[200deg]'
                  }`}
                />
              </div>
              <span
                className={`icon font-sans text-base ${
                  selected === idx ? 'text-white' : 'text-primary'
                }`}
              >
                {service.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 relative rounded-lg shadow overflow-hidden min-h-[260px] flex items-end">
        <Image
          src={data[selected].image}
          alt={data[selected].title}
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
              {data[selected].title} Unit
            </h3>
            <p className="text-black/80 mb-4">{data[selected].description}</p>
            <Link
              href={`services/${data[selected].slug}`}
              className="bg-accent text-white font-medium hover:bg-accent/90 w-fit p-2 rounded-lg text-sm px-4"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
