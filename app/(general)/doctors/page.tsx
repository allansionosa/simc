import { getDoctors } from '@/components/hooks/useDoctor';
import Image from 'next/image';

// const doctors = [
//   {
//     name: 'Dr. Jane Smith',
//     specialty: 'Cardiologist',
//     image: '/doctor1.jpg',
//     description:
//       'Expert in heart health and cardiovascular care with 15+ years of experience.',
//   },
//   {
//     name: 'Dr. John Doe',
//     specialty: 'Pediatrician',
//     image: '/doctor2.jpg',
//     description:
//       'Caring for children and adolescents with a focus on holistic wellness.',
//   },
//   {
//     name: 'Dr. Maria Garcia',
//     specialty: 'Orthopedic Surgeon',
//     image: '/doctor1.jpg',
//     description:
//       'Specialist in bone, joint, and muscle surgery and rehabilitation.',
//   },
//   {
//     name: 'Dr. Alex Lee',
//     specialty: 'Anesthesiologist',
//     image: '/doctor2.jpg',
//     description:
//       'Ensuring patient safety and comfort during surgical procedures.',
//   },
//   {
//     name: 'Dr. Emily Tan',
//     specialty: 'Laboratory Medicine',
//     image: '/doctor1.jpg',
//     description: 'Providing accurate diagnostics and laboratory services.',
//   },
//   {
//     name: 'Dr. Michael Cruz',
//     specialty: 'Rehabilitation Medicine',
//     image: '/doctor2.jpg',
//     description:
//       'Helping patients regain strength and mobility after injury or illness.',
//   },
// ];

export default async function DoctorsPage() {
  const doctors = await getDoctors();
  return (
    <main className="bg-surface min-h-screen">
      {/* Hero/Intro */}
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              Our Doctors
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              Meet Our Medical Experts
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              Our team of highly qualified doctors is dedicated to providing
              exceptional care and expertise across a wide range of specialties.
              Your health is in good hands.
            </p>
            <blockquote className="italic text-accent mt-4">
              “We treat every patient like family.” – Dr. Jane Smith, Chief
              Medical Officer
            </blockquote>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/doctors-group.jpg"
              alt="Our Doctors"
              width={400}
              height={300}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center p-6"
            >
              <div className="w-24 h-24 relative rounded-full overflow-hidden mb-3">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary mb-1">
                {doctor.name}
              </h3>
              <span className="text-accent font-medium mb-2">
                {doctor.specialties}
              </span>
              <p className="text-muted text-sm mb-4">{doctor.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent py-10">
        <div className="container mx-auto text-center">
          <h4 className="font-heading text-2xl text-white mb-2">
            Want to book an appointment with our doctors?
          </h4>
          <p className="text-white/90 mb-4">
            Contact us today to schedule a consultation or learn more about our
            medical team.
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
