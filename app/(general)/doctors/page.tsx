import { getDoctors } from '@/components/hooks/useDoctor';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { UrlPagination } from '@/components/pagination/url-pagination';
import { ArrowRight, CalendarCheck, ShieldCheck, Stethoscope } from 'lucide-react';

const DOCTORS_PAGE_SIZE = 6;

// NOTE:
// The API-based doctor header fetching has been disabled so this page can be
// fully static. When your API is ready, restore the getDoctorHeader function
// below and switch the component back to using it.
//
// const getDoctorHeader = async (): Promise<Header> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/doctor/header`,
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
//       },
//       cache: 'no-store',
//     }
//   );
//   if (!res.ok) throw new Error('Failed to fetch data');
//   return res.json();
// };

const dummyDoctorHeader: Header = {
  id: 'doctor-header',
  title: 'Our Doctors',
  subTitle: 'Meet the SIMC medical team',
  description:
    'Board-oriented specialists and staff physicians serving St. Irenaeus Medical Center. HMO accreditation varies by plan—confirm coverage when you book or submit an LOA.',
  image: '/doctors-group.jpg',
};

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const doctors = await getDoctors();
  const header = dummyDoctorHeader;
  const { page: pageParam } = await searchParams;
  const rawPage = Number.parseInt(pageParam ?? '1', 10);
  const totalPages = Math.max(
    1,
    Math.ceil(doctors.length / DOCTORS_PAGE_SIZE)
  );
  const currentPage =
    Number.isFinite(rawPage) && rawPage >= 1
      ? Math.min(Math.floor(rawPage), totalPages)
      : 1;
  const paginatedDoctors = doctors.slice(
    (currentPage - 1) * DOCTORS_PAGE_SIZE,
    currentPage * DOCTORS_PAGE_SIZE
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
            <p className="text-muted mx-auto mb-8 max-w-xl text-base md:mx-0 md:text-lg">
              {header.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm shadow-sm">
                <Stethoscope className="h-4 w-4 shrink-0 text-secondary" />
                Multispecialty team
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm shadow-sm">
                <ShieldCheck className="h-4 w-4 shrink-0 text-secondary" />
                HMO-accredited options
              </span>
            </div>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="relative aspect-[4/3] w-full max-w-[min(100%,420px)] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
              <Image
                src={header.image}
                alt="SIMC medical team"
                width={420}
                height={315}
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
            Physician directory
          </h2>
          <p className="text-muted mt-3 text-base">
            The same roster is used when you request{' '}
            <Link
              href="/hmo-approval"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              HMO online approval
            </Link>
            —select your plan first to see accredited physicians for that plan.
          </p>
        </div>

        <ul className="mx-auto grid max-w-6xl list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {paginatedDoctors.map((doctor) => (
            <li key={doctor.publicId ?? doctor.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="relative aspect-[4/3] w-full bg-muted">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading mb-1 text-lg font-bold text-primary">
                    {doctor.name}
                  </h3>
                  <p className="text-accent mb-3 text-sm font-semibold">
                    {doctor.specialties}
                  </p>
                  <p className="text-muted mb-4 flex-1 text-sm leading-relaxed">
                    {doctor.description}
                  </p>
                  {doctor.accreditedHmos && doctor.accreditedHmos.length > 0 ? (
                    <div className="border-t border-border/60 pt-4">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
                        Sample HMO accreditation
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {doctor.accreditedHmos.map((hmo) => (
                          <Badge
                            key={hmo}
                            variant="secondary"
                            className="font-normal"
                          >
                            {hmo}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>

        <UrlPagination
          basePath="/doctors"
          itemLabel="physicians"
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={doctors.length}
          pageSize={DOCTORS_PAGE_SIZE}
        />
      </section>

      <section className="border-t border-border/60 bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold md:text-3xl">
            Need an appointment or LOA?
          </h2>
          <p className="mb-6 text-base text-white/90">
            Book a visit or start your HMO approval request online—we will guide
            you through the next steps.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow transition hover:bg-slate-100"
            >
              <CalendarCheck className="h-4 w-4" />
              Book appointment
            </Link>
            <Link
              href="/hmo-approval"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              HMO online approval
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Our Doctors | St. Irenaeus Medical Center Inc.',
  description:
    'Meet the expert doctors at St. Irenaeus Medical Center Inc. Our team is dedicated to providing exceptional care across a wide range of specialties.',
  keywords: [
    'doctors',
    'medical experts',
    'St. Irenaeus Medical Center',
    'healthcare',
    'specialists',
    'Philippines',
  ],
  openGraph: {
    title: 'Our Doctors | St. Irenaeus Medical Center Inc.',
    description:
      'Meet the expert doctors at St. Irenaeus Medical Center Inc. Our team is dedicated to providing exceptional care across a wide range of specialties.',
    url: 'https://your-domain.com/doctors',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/doctors-group.jpg',
        width: 800,
        height: 600,
        alt: 'Our Doctors at St. Irenaeus Medical Center',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Doctors | St. Irenaeus Medical Center Inc.',
    description:
      'Meet the expert doctors at St. Irenaeus Medical Center Inc. Our team is dedicated to providing exceptional care across a wide range of specialties.',
    images: ['https://your-domain.com/doctors-group.jpg'],
  },
};
