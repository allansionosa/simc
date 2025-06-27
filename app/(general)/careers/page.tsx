'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import Image from 'next/image';

const jobs = [
  {
    title: 'Registered Nurse',
    location: 'Main Hospital',
    type: 'Full-time',
    description:
      'Provide patient care, administer medications, and collaborate with the healthcare team to ensure the best outcomes for our patients.',
    requirements: [
      'Valid PRC License',
      'At least 1 year of clinical experience',
      'Strong communication skills',
    ],
  },
  {
    title: 'Medical Technologist',
    location: 'Diagnostic Center',
    type: 'Full-time',
    description:
      'Perform laboratory tests, analyze results, and ensure quality control in all diagnostic procedures.',
    requirements: [
      'BS in Medical Technology',
      'PRC License',
      'Attention to detail',
    ],
  },
  {
    title: 'Front Desk Officer',
    location: 'Main Hospital',
    type: 'Full-time',
    description:
      'Greet patients, manage appointments, and provide excellent customer service at the reception area.',
    requirements: [
      "Bachelor's degree or relevant experience",
      'Excellent interpersonal skills',
      'Proficient in MS Office',
    ],
  },
];

export default function CareersPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-10">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20 mb-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              Careers
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              Build Your Future With Us
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              At St. Irenaeus Medical Center, we believe in nurturing talent and
              empowering our team to make a real difference in healthcare.
              Explore our open positions and join a community that values
              compassion, growth, and excellence.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/hiring.jpg"
              alt="Join our healthcare team"
              width={400}
              height={400}
              className="rounded-xl shadow-lg object-cover"
              priority
              onError={(e) => {
                e.currentTarget.src = '/room3.jpg';
              }}
            />
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <div className="w-full flex flex-col items-center px-2">
        <div className="max-w-4xl w-full grid gap-8">
          {jobs.map((job) => (
            <Card key={job.title} className="shadow-lg border border-gray-200">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-primary mb-1">
                    {job.title}
                  </CardTitle>
                  <div className="text-gray-600 text-sm font-normal">
                    {job.location} &middot; {job.type}
                  </div>
                </div>
                <Button
                  variant="default"
                  className="mt-2"
                  onClick={() => setShowForm(true)}
                >
                  Apply
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{job.description}</p>
                <ul className="list-disc list-inside text-gray-600 text-sm mb-2">
                  {job.requirements.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Application Form Modal (simple inline for demo) */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-primary mb-4">Apply Now</h2>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setShowForm(false);
                alert('Application submitted! (Demo)');
              }}
            >
              <div>
                <Label htmlFor="name" className="mb-1 inline-block">
                  Full Name
                </Label>
                <Input id="name" name="name" required placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email" className="mb-1 inline-block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <Label htmlFor="position" className="mb-1 inline-block">
                  Position Applying For
                </Label>
                <Input
                  id="position"
                  name="position"
                  required
                  placeholder="e.g. Registered Nurse"
                />
              </div>
              <div>
                <Label htmlFor="message" className="mb-1 inline-block">
                  Cover Letter / Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us why you're a great fit..."
                />
              </div>
              <Button type="submit" className="w-full mt-2">
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
