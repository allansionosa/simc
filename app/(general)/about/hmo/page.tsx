'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Phone, Globe, Mail } from 'lucide-react';

const HMOPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              Accepted HMO Providers
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              Partner HMO Companies
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              We accept a wide range of HMO providers to ensure our patients
              have access to quality healthcare. Check if your HMO is in our
              network of accepted providers.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/hmobg.jpg"
              alt="HMO Partners"
              width={400}
              height={400}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* HMO List Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-primary">
          Accepted HMO Companies
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              name: 'Maxicare Healthcare Corporation',
              logo: '/maxicare.png',
              contact: {
                phone: '02-8888-9999',
                website: 'www.maxicare.com.ph',
                email: 'info@maxicare.com.ph',
              },
              coverage: [
                'Inpatient and Outpatient Services',
                'Emergency Care',
                'Laboratory and Diagnostic Procedures',
                'Specialist Consultations',
              ],
            },
            {
              name: 'Medicard Philippines, Inc.',
              logo: '/medicard.png',
              contact: {
                phone: '02-8888-7777',
                website: 'www.medicardphils.com',
                email: 'info@medicardphils.com',
              },
              coverage: [
                'Comprehensive Medical Services',
                'Dental and Vision Care',
                'Preventive Healthcare',
                '24/7 Medical Assistance',
              ],
            },
            {
              name: 'Intellicare',
              logo: '/intellicare.png',
              contact: {
                phone: '02-8888-6666',
                website: 'www.intellicare.com.ph',
                email: 'info@intellicare.com.ph',
              },
              coverage: [
                'Primary Care Services',
                'Specialist Consultations',
                'Emergency Services',
                'Laboratory Tests',
              ],
            },
            {
              name: 'PhilCare',
              logo: '/philcare.jpg',
              contact: {
                phone: '02-8888-5555',
                website: 'www.philcare.com.ph',
                email: 'info@philcare.com.ph',
              },
              coverage: [
                'Medical Consultations',
                'Hospitalization Benefits',
                'Diagnostic Procedures',
                'Preventive Care',
              ],
            },
          ].map((hmo, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={hmo.logo}
                      alt={`${hmo.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <CardTitle className="text-xl text-primary">
                    {hmo.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">
                      Contact Information
                    </h4>
                    <div className="space-y-1">
                      <p className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 text-accent" />
                        {hmo.contact.phone}
                      </p>
                      <p className="flex items-center gap-2 text-gray-600">
                        <Globe className="w-4 h-4 text-accent" />
                        {hmo.contact.website}
                      </p>
                      <p className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4 text-accent" />
                        {hmo.contact.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      Coverage Includes
                    </h4>
                    <ul className="space-y-1">
                      {hmo.coverage.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-accent py-10">
        <div className="container mx-auto text-center">
          <h4 className="font-heading text-2xl text-white mb-2">
            Need to Verify Your HMO?
          </h4>
          <p className="text-white/90 mb-4">
            Contact us to verify if your HMO is accepted or to learn more about
            our HMO partnerships.
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

export default HMOPage;
