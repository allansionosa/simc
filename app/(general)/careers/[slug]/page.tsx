import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import JobApplicationForm from '@/components/careers/job-application-form';
import Script from 'next/script';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin } from 'lucide-react';
import { SiteBreadcrumb } from '@/components/site-breadcrumb';

// NOTE:
// API-based careers fetching is disabled for static deployment.
// When your API is ready, restore getCareers and remove dummy data.

const dummyCareers: Careers[] = [
  {
    id: 1,
    title: 'Staff Nurse',
    location: 'St. Irenaeus Medical Center Inc.',
    employmentType: 'Full-time',
    description:
      '<p>Provide high-quality nursing care to patients, coordinate with physicians, and ensure adherence to SIMC healthcare standards.</p>',
    slug: 'staff-nurse',
    is_enabled: true,
  },
  {
    id: 2,
    title: 'Radiologic Technologist',
    location: 'St. Irenaeus Medical Center Inc.',
    employmentType: 'Full-time',
    description:
      '<p>Operate imaging equipment, assist physicians in diagnostic procedures, and maintain safety protocols for patients and staff.</p>',
    slug: 'radiologic-technologist',
    is_enabled: true,
  },
  {
    id: 3,
    title: 'Medical Technologist',
    location: 'St. Irenaeus Medical Center Inc.',
    employmentType: 'Full-time',
    description:
      '<p>Perform laboratory tests, analyze results, and support clinicians in providing accurate diagnoses for SIMC patients.</p>',
    slug: 'medical-technologist',
    is_enabled: true,
  },
];

const getCareers = async (): Promise<Careers[]> => {
  return Promise.resolve(dummyCareers);
};

export const generateStaticParams = async () => {
  const careers = await getCareers();
  return careers.filter((c) => c.is_enabled).map((career) => ({
    slug: career.slug,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const careers = await getCareers();
  const job = careers.find((career) => career.slug === slug);

  if (!job) {
    return {
      title: 'Job Not Found | St. Irenaeus Medical Center Inc.',
      description: 'The requested job position could not be found.',
    };
  }

  return {
    title: `${job.title} | St. Irenaeus Medical Center Inc.`,
    description: `Apply for the ${job.title} position at St. Irenaeus Medical Center Inc. ${job.location} location, ${job.employmentType} employment type.`,
    keywords: [
      job.title,
      'careers',
      'job',
      'employment',
      'healthcare',
      'medical center',
      job.location,
      job.employmentType,
      'St. Irenaeus',
      'Philippines',
    ],
    openGraph: {
      title: `${job.title} | St. Irenaeus Medical Center Inc.`,
      description: `Apply for the ${job.title} position at St. Irenaeus Medical Center Inc.`,
      url: `https://your-domain.com/careers/${job.slug}`,
      siteName: 'St. Irenaeus Medical Center Inc.',
      images: [
        {
          url: 'https://your-domain.com/hiring.jpg',
          width: 800,
          height: 600,
          alt: `Career at St. Irenaeus Medical Center - ${job.title}`,
        },
      ],
      locale: 'en_PH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} | St. Irenaeus Medical Center Inc.`,
      description: `Apply for the ${job.title} position at St. Irenaeus Medical Center Inc.`,
      images: ['https://your-domain.com/hiring.jpg'],
    },
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const careers = await getCareers();
  const job = careers.find((career) => career.slug === slug);

  if (!job || !job.is_enabled) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description.replace(/<[^>]*>/g, ''),
    hiringOrganization: {
      '@type': 'Organization',
      name: 'St. Irenaeus Medical Center',
      sameAs: 'https://stirenaeusmedicalcenter.com',
    },
    jobLocation: {
      '@type': 'Place',
      addressLocality: job.location,
      addressCountry: 'PH',
    },
    employmentType: job.employmentType,
    datePosted: new Date().toISOString(),
    validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };

  return (
    <main className="bg-surface min-h-screen">
      <Script
        id="job-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SiteBreadcrumb
        maxWidthClassName="max-w-4xl"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Careers', href: '/careers' },
          { label: job.title },
        ]}
      />

      <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
        <header className="mb-8">
          <h1 className="font-heading mb-4 text-3xl font-bold text-primary md:text-4xl">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 text-foreground/85">
              <MapPin className="h-4 w-4 shrink-0 text-secondary" />
              {job.location}
            </span>
            <Badge variant="secondary" className="font-normal">
              {job.employmentType}
            </Badge>
          </div>
        </header>

        <Card className="mb-10 border-border/80 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-lg text-primary">
              Role overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="tiptap-content prose prose-neutral max-w-none text-pretty text-foreground/90 [&_p]:mb-3 [&_p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </CardContent>
        </Card>

        <Separator className="mb-10" />

        <section aria-labelledby="apply-heading">
          <h2
            id="apply-heading"
            className="font-heading mb-6 text-xl font-semibold text-primary"
          >
            Apply online
          </h2>
          <JobApplicationForm jobTitle={job.title} />
        </section>
      </div>
    </main>
  );
}
