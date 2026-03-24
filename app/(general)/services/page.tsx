import { getServices } from '@/components/hooks/useServices';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { ServiceCategoryIcon } from '@/components/services/service-category-icon';
import { ServicesPagination } from '@/components/services/services-pagination';

const SERVICES_PAGE_SIZE = 6;

// NOTE:
// The API-based services header fetching has been disabled so this page can be
// fully static. When your API is ready, restore the getServicesHeader function
// below and switch the component back to using it.
//
// const getServicesHeader = async (): Promise<Header> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/services/header`,
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

const dummyServicesHeader: Header = {
  id: 'services-header',
  title: 'Our Services',
  subTitle: 'Healthcare services at SIMC',
  description:
    'Explore the medical services offered by St. Irenaeus Medical Center Inc. (SIMC). Select a category to see specialties, clinics, or modalities available to you.',
  image: '/room3.jpg',
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const services = await getServices();
  const header = dummyServicesHeader;
  const { page: pageParam } = await searchParams;
  const rawPage = Number.parseInt(pageParam ?? '1', 10);
  const totalPages = Math.max(
    1,
    Math.ceil(services.length / SERVICES_PAGE_SIZE)
  );
  const currentPage =
    Number.isFinite(rawPage) && rawPage >= 1
      ? Math.min(Math.floor(rawPage), totalPages)
      : 1;
  const paginatedServices = services.slice(
    (currentPage - 1) * SERVICES_PAGE_SIZE,
    currentPage * SERVICES_PAGE_SIZE
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
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <div className="flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm text-foreground shadow-sm">
                <ShieldCheck className="h-4 w-4 shrink-0 text-secondary" />
                <span>Patient-centered care</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm text-foreground shadow-sm">
                <Clock className="h-4 w-4 shrink-0 text-secondary" />
                <span>Coordinated with your physician</span>
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-center">
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
            Service categories
          </h2>
          <p className="text-muted mt-3 text-base">
            Open a category to view clinics, imaging, laboratory tests,
            emergency care, pharmacy, rehabilitation, and more. Each page lists
            what is available under that service line.
          </p>
        </div>

        <ul className="mx-auto grid max-w-6xl list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {paginatedServices.map((service) => {
            const count = service.offerings?.length ?? 0;
            return (
              <li key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card text-left shadow-sm outline-none transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 shadow-md backdrop-blur-sm">
                        <ServiceCategoryIcon
                          slug={service.slug}
                          className="h-6 w-6 text-primary"
                        />
                      </div>
                      {count > 0 ? (
                        <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-primary shadow backdrop-blur-sm">
                          {count} {count === 1 ? 'offering' : 'offerings'}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-heading group-hover:text-accent mb-2 text-xl font-bold text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted mb-6 line-clamp-3 flex-1 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <span className="text-accent inline-flex items-center gap-2 text-sm font-semibold">
                      View details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <ServicesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={services.length}
          pageSize={SERVICES_PAGE_SIZE}
        />
      </section>

      <section className="border-t border-border/60 bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold md:text-3xl">
            Need more information or an appointment?
          </h2>
          <p className="mb-6 text-base text-white/90">
            Our team can help you choose the right service and schedule a visit.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow transition hover:bg-slate-100"
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Our Services | St. Irenaeus Medical Center Inc.',
  description:
    'Discover the comprehensive medical services offered at St. Irenaeus Medical Center Inc. Your health and well-being are our top priorities.',
  keywords: [
    'services',
    'medical services',
    'St. Irenaeus Medical Center',
    'healthcare',
    'hospital',
    'Philippines',
  ],
  openGraph: {
    title: 'Our Services | St. Irenaeus Medical Center Inc.',
    description:
      'Discover the comprehensive medical services offered at St. Irenaeus Medical Center Inc. Your health and well-being are our top priorities.',
    url: 'https://your-domain.com/services',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/room3.jpg',
        width: 800,
        height: 600,
        alt: 'Medical Services at St. Irenaeus Medical Center',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | St. Irenaeus Medical Center Inc.',
    description:
      'Discover the comprehensive medical services offered at St. Irenaeus Medical Center Inc. Your health and well-being are our top priorities.',
    images: ['https://your-domain.com/room3.jpg'],
  },
};
