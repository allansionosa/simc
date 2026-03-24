import { Metadata } from 'next';
import CareersClient from '@/components/careers/careers-client';
import { UrlPagination } from '@/components/pagination/url-pagination';
import Image from 'next/image';
import { Briefcase, HeartHandshake, Users } from 'lucide-react';

const CAREERS_PAGE_SIZE = 2;

export const metadata: Metadata = {
  title: 'Careers | St. Irenaeus Medical Center Inc.',
  description:
    'Join our healthcare team at St. Irenaeus Medical Center Inc. (SIMC). Explore open positions and build your future with us.',
  keywords: [
    'careers',
    'jobs',
    'employment',
    'healthcare',
    'medical center',
    'hiring',
    'St. Irenaeus',
    'Philippines',
  ],
  openGraph: {
    title: 'Careers | St. Irenaeus Medical Center Inc.',
    description:
      'Join our healthcare team at St. Irenaeus Medical Center Inc. (SIMC). Explore open positions and build your future with us.',
    url: 'https://your-domain.com/careers',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/hiring.jpg',
        width: 800,
        height: 600,
        alt: 'Careers at St. Irenaeus Medical Center',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | St. Irenaeus Medical Center Inc.',
    description:
      'Join our healthcare team at St. Irenaeus Medical Center. Explore open positions and build your future with us.',
    images: ['https://your-domain.com/hiring.jpg'],
  },
};

// NOTE:
// API-based data fetching for careers is commented out for static deployment.
// When ready, restore getCareers / getCareerHeader and replace dummy data below.

type DummyHeader = {
  title: string;
  subTitle: string;
  description: string;
  image: string;
};

type DummyJob = Careers;

const dummyHeader: DummyHeader = {
  title: 'Careers at SIMC',
  subTitle: 'Build your career in healthcare',
  description:
    'We are looking for compassionate professionals who want to grow with our team—delivering safe, respectful care in a modern hospital environment.',
  image: '/appointment.jpg',
};

const dummyJobs: DummyJob[] = [
  {
    id: 1,
    title: 'Staff Nurse',
    location: 'St. Irenaeus Medical Center Inc.',
    slug: 'staff-nurse',
    description:
      'Provide high-quality nursing care to patients, coordinate with physicians, and ensure adherence to SIMC healthcare standards.',
    employmentType: 'Full-time',
    is_enabled: true,
  },
  {
    id: 2,
    title: 'Radiologic Technologist',
    location: 'St. Irenaeus Medical Center Inc.',
    slug: 'radiologic-technologist',
    description:
      'Operate imaging equipment, assist physicians in diagnostic procedures, and maintain safety protocols for patients and staff.',
    employmentType: 'Full-time',
    is_enabled: true,
  },
  {
    id: 3,
    title: 'Medical Technologist',
    location: 'St. Irenaeus Medical Center Inc.',
    slug: 'medical-technologist',
    description:
      'Perform laboratory tests, analyze results, and support clinicians in providing accurate diagnoses for SIMC patients.',
    employmentType: 'Full-time',
    is_enabled: true,
  },
];

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const jobs = dummyJobs.filter((j) => j.is_enabled);
  const header = dummyHeader;
  const { page: pageParam } = await searchParams;
  const rawPage = Number.parseInt(pageParam ?? '1', 10);
  const totalPages = Math.max(1, Math.ceil(jobs.length / CAREERS_PAGE_SIZE));
  const currentPage =
    Number.isFinite(rawPage) && rawPage >= 1
      ? Math.min(Math.floor(rawPage), totalPages)
      : 1;
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * CAREERS_PAGE_SIZE,
    currentPage * CAREERS_PAGE_SIZE
  );

  return (
    <main className="bg-surface min-h-screen">
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-sky-50 via-white to-sky-100/80">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234b9cd3' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container relative mx-auto flex flex-col items-center gap-10 px-4 py-14 md:flex-row md:py-20">
          <div className="flex-1 text-center md:text-left">
            <p className="mb-2 text-base font-medium uppercase tracking-widest text-accent">
              {header.title}
            </p>
            <h1 className="font-heading mb-4 text-3xl font-bold text-primary md:text-5xl md:leading-tight">
              {header.subTitle}
            </h1>
            <p className="text-muted mx-auto mb-8 max-w-xl text-base leading-relaxed md:mx-0 md:text-lg">
              {header.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm text-foreground shadow-sm">
                <Briefcase className="h-4 w-4 shrink-0 text-secondary" />
                Clinical & support roles
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm text-foreground shadow-sm">
                <HeartHandshake className="h-4 w-4 shrink-0 text-secondary" />
                Team-centered culture
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm text-foreground shadow-sm">
                <Users className="h-4 w-4 shrink-0 text-secondary" />
                Growing organization
              </span>
            </div>
          </div>
          <div className="flex w-full flex-1 justify-center md:w-auto">
            <div className="relative aspect-square w-full max-w-[min(100%,420px)] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
              <Image
                src={header.image}
                alt=""
                width={420}
                height={420}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">
            Open positions
          </h2>
          <p className="text-muted mt-3 text-base leading-relaxed">
            Select a role to read the summary and submit your application. We
            review every submission carefully.
          </p>
        </div>
        <CareersClient jobs={paginatedJobs} />

        <UrlPagination
          basePath="/careers"
          itemLabel="open positions"
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={jobs.length}
          pageSize={CAREERS_PAGE_SIZE}
        />
      </section>
    </main>
  );
}
