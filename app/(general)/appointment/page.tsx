import { Metadata } from 'next';
import Image from 'next/image';
import { Stethoscope } from 'lucide-react';
import AppointmentForm from '@/components/appointment/appointment-form';
import { Card, CardContent } from '@/components/ui/card';

const departments = [
  {
    name: 'Internal Medicine',
    description: 'General health check-ups and consultations',
  },
  {
    name: 'Cardiology',
    description: 'Heart and cardiovascular care',
  },
  {
    name: 'Pediatrics',
    description: 'Child and adolescent healthcare',
  },
  {
    name: 'Orthopedics',
    description: 'Bone and joint care',
  },
];

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

export const metadata: Metadata = {
  title: 'Book an Appointment - St. Irenaeus Medical Center',
  description:
    'Schedule your appointment with our experienced medical professionals. Book online for Internal Medicine, Cardiology, Pediatrics, and Orthopedics.',
  keywords: [
    'appointment',
    'book appointment',
    'medical consultation',
    'healthcare',
    'doctor appointment',
  ],
  openGraph: {
    title: 'Book an Appointment - St. Irenaeus Medical Center',
    description:
      'Schedule your appointment with our experienced medical professionals.',
    type: 'website',
  },
};

export default function AppointmentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              Schedule Your Visit
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              Book an Appointment
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              Schedule your appointment with our experienced medical
              professionals. We&apos;re here to provide you with the best
              healthcare services.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/appointment.jpg"
              alt="Medical Consultation"
              width={400}
              height={400}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Appointment Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AppointmentForm departments={departments} timeSlots={timeSlots} />
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Our Departments
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept) => (
              <Card
                key={dept.name}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <Stethoscope className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {dept.name}
                  </h3>
                  <p className="text-gray-600">{dept.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-accent py-10">
        <div className="container mx-auto text-center">
          <h4 className="font-heading text-2xl text-white mb-2">
            Need Immediate Assistance?
          </h4>
          <p className="text-white/90 mb-4">
            Contact our appointment desk for urgent scheduling or inquiries.
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
}
