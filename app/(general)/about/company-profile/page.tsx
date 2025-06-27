'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CompanyProfile = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              St. Irenaeus Medical Center Inc.
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              Coming Soon in 2025
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              We are excited to announce the opening of our state-of-the-art
              medical center in 2025. Our commitment to excellence in healthcare
              will bring advanced medical services and compassionate care to our
              community.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/room2.jpg"
              alt="Hospital Room"
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
            <h2 className="text-3xl font-bold mb-6 text-primary">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              St. Irenaeus Medical Center Inc. is being established with a
              vision to provide accessible, high-quality healthcare services to
              our community. As we prepare for our opening in 2025, we are
              building a modern facility equipped with the latest medical
              technology and staffed by experienced healthcare professionals.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our commitment to patient care, medical innovation, and community
              service will make us a trusted healthcare provider in the region.
              We are dedicated to creating a healthcare environment that
              prioritizes patient comfort and well-being.
            </p>
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
            {[
              {
                title: 'Patient-Centered Care',
                description:
                  "We will put our patients' needs first, providing personalized healthcare solutions with compassion and understanding.",
                icon: '🏥',
              },
              {
                title: 'Medical Excellence',
                description:
                  'We are committed to maintaining the highest standards of medical care through advanced technology and expert professionals.',
                icon: '⭐',
              },
              {
                title: 'Community Service',
                description:
                  'We will serve our community with dedication, focusing on improving public health and accessibility to quality healthcare.',
                icon: '🤝',
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{value.icon}</div>
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
          Our Future Facilities
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'Modern Medical Equipment',
              description:
                'We will be equipped with state-of-the-art diagnostic and treatment facilities to provide the best possible care.',
              image: '/equipment.jpg',
            },
            {
              title: 'Comfortable Patient Rooms',
              description:
                'Our patient rooms will be designed for comfort and recovery, featuring modern amenities and a peaceful environment.',
              image: '/room2.jpg',
            },
          ].map((facility, index) => (
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
};

export default CompanyProfile;
