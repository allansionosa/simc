import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import JobApplicationForm from '@/components/careers/job-application-form';
import Link from 'next/link';
import Script from 'next/script';

export const getCareers = async (): Promise<Careers[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/careers`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

export const generateStaticParams = async () => {
  const careers = await getCareers();
  return careers.map((career) => ({
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

  if (!job) {
    notFound();
  }

  // Structured data for job posting
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description.replace(/<[^>]*>/g, ''), // Remove HTML tags
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
    validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Script
        id="job-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link
                href="/careers"
                className="hover:text-primary transition-colors"
              >
                Careers
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{job.title}</li>
          </ol>
        </nav>

        <div className="max-w-4xl mx-auto">
          <JobApplicationForm jobTitle={job.title} />
        </div>
      </div>
    </div>
  );
}
