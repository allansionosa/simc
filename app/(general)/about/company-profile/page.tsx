import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { FacilitiesCarousel } from '@/components/about/facilities-carousel';
import { Metadata } from 'next';
import { Award, Building2, Heart, HeartPulse } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// NOTE:
// API-based company profile, vision, mission, and facilities fetching is
// disabled so this page can be fully static. When your API is ready, restore
// the fetch helpers below and remove the dummy data.
//
// export const getCompanyProfile = async (): Promise<CompanyProfile> => { ... }
// export const getVision = async (): Promise<Vision> => { ... }
// export const getMission = async (): Promise<Mission[]> => { ... }
// export const getFacilities = async (): Promise<Facilities[]> => { ... }

const dummyCompanyProfile: CompanyProfile = {
  id: 1,
  title: 'St. Irenaeus Medical Center Inc. (SIMC)',
  subTitle: 'A growing modern healthcare institution',
  description:
    'St. Irenaeus Medical Center Inc. (SIMC) is a modern healthcare facility designed for comfort, safety, and coordinated care. This placeholder copy can be replaced with your official company profile when content is ready.',
  image: '/room1.jpg',
};

const dummyVision: Vision = {
  id: 1,
  title: 'Our vision',
  description:
    '<p>To be recognized as a trusted healthcare partner for families in our community—known for clinical quality, compassion, and accessibility.</p>',
  image: '/room1.jpg',
};

const dummyMissions: Mission[] = [
  {
    id: 1,
    title: 'Compassionate care',
    description:
      'Deliver patient-centered services that respect each person’s dignity, culture, and choices.',
  },
  {
    id: 2,
    title: 'Clinical excellence',
    description:
      'Uphold high standards of safety, continuous learning, and evidence-informed practice across all departments.',
  },
];

const MISSION_ICONS: LucideIcon[] = [Heart, Award];

const dummyFacilities: Facilities[] = [
  {
    id: 1,
    image: '/room1.jpg',
    title: 'Outpatient clinic',
    description:
      'Spacious consultation suites designed for privacy, clear wayfinding, and shorter wait times.',
  },
  {
    id: 2,
    image: '/room3.jpg',
    title: 'Diagnostic imaging',
    description:
      'Dedicated imaging areas supporting accurate diagnosis with timely reporting to your physician.',
  },
  {
    id: 3,
    image: '/room1.jpg',
    title: 'Emergency services',
    description:
      'Triage-led emergency care with rapid access to diagnostics and specialist support when needed.',
  },
  {
    id: 4,
    image: '/room3.jpg',
    title: 'Clinical laboratory',
    description:
      'On-site laboratory services to support routine and urgent testing ordered by your care team.',
  },
  {
    id: 5,
    image: '/room1.jpg',
    title: 'Pharmacy',
    description:
      'Medication dispensing and counseling aligned with your treatment plan and discharge instructions.',
  },
  {
    id: 6,
    image: '/room3.jpg',
    title: 'Inpatient rooms',
    description:
      'Comfortable patient rooms with attention to infection control, rest, and family visitation.',
  },
  {
    id: 7,
    image: '/room1.jpg',
    title: 'Operating suite',
    description:
      'Modern surgical suites built for sterility, teamwork, and efficient perioperative workflows.',
  },
  {
    id: 8,
    image: '/room3.jpg',
    title: 'Recovery & day surgery',
    description:
      'Monitored recovery spaces and day-surgery support focused on safety before you head home.',
  },
  {
    id: 9,
    image: '/room1.jpg',
    title: 'Rehabilitation gym',
    description:
      'Therapy areas for mobility, strength, and function—supporting recovery after illness or surgery.',
  },
  {
    id: 10,
    image: '/room3.jpg',
    title: 'Family & pastoral care',
    description:
      'Quiet spaces for families and spiritual support, reflecting whole-person healing.',
  },
];

export const metadata: Metadata = {
  title: 'Company Profile | St. Irenaeus Medical Center Inc.',
  description:
    'Discover the vision, mission, and facilities of St. Irenaeus Medical Center Inc. - a modern healthcare facility committed to excellence.',
  keywords: [
    'company profile',
    'vision',
    'mission',
    'facilities',
    'St. Irenaeus Medical Center',
    'healthcare',
    'Philippines',
  ],
  openGraph: {
    title: 'Company Profile | St. Irenaeus Medical Center Inc.',
    description:
      'Discover the vision, mission, and facilities of St. Irenaeus Medical Center Inc. - a modern healthcare facility committed to excellence.',
    url: 'https://your-domain.com/about/company-profile',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/room1.jpg',
        width: 800,
        height: 600,
        alt: 'St. Irenaeus Medical Center Facilities',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Company Profile | St. Irenaeus Medical Center Inc.',
    description:
      'Discover the vision, mission, and facilities of St. Irenaeus Medical Center Inc. - a modern healthcare facility committed to excellence.',
    images: ['https://your-domain.com/room1.jpg'],
  },
};

export default function CompanyProfilePage() {
  const data = dummyCompanyProfile;
  const vision = dummyVision;
  const missions = dummyMissions;
  const facilities = dummyFacilities;

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
              Company profile
            </p>
            <h1 className="font-heading mb-3 text-3xl font-bold text-primary md:text-5xl md:leading-tight">
              {data.subTitle}
            </h1>
            <p className="text-primary/90 mb-4 text-lg font-medium md:text-xl">
              {data.title}
            </p>
            <p className="text-muted mx-auto mb-8 max-w-xl text-base leading-relaxed md:mx-0 md:text-lg">
              {data.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm shadow-sm">
                <Building2 className="h-4 w-4 shrink-0 text-secondary" />
                Purpose-built spaces
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm shadow-sm">
                <HeartPulse className="h-4 w-4 shrink-0 text-secondary" />
                Community focused
              </span>
            </div>
          </div>
          <div className="flex w-full flex-1 justify-center md:w-auto">
            <div className="relative aspect-square w-full max-w-[min(100%,420px)] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
              <Image
                src={data.image}
                alt={data.title}
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
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            {/* <div className="mb-3 inline-flex items-center gap-2 text-accent">
              <Target className="h-5 w-5" aria-hidden />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Direction
              </span>
            </div> */}
            <h2 className="font-heading mb-6 text-2xl font-bold text-primary md:text-3xl">
              {vision.title}
            </h2>
            <div
              className="tiptap-content text-muted prose prose-neutral max-w-none text-base leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: vision.description }}
            />
          </div>
          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 lg:order-2">
            <Image
              src={vision.image}
              alt={vision.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/30 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-heading text-balance text-3xl font-bold tracking-tight text-primary md:text-4xl">
              Mission & values
            </h2>
            <div
              className="bg-accent mx-auto mt-4 h-1 w-12 rounded-full"
              aria-hidden
            />
            <p className="mt-5 text-base leading-relaxed text-foreground/80 md:text-lg">
              What we stand for as we grow with the communities we serve.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {missions.map((value, index) => {
              const Icon = MISSION_ICONS[index] ?? Heart;
              return (
                <Card
                  key={value.id}
                  className="border-border/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <CardContent className="p-6 md:p-8">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                      <Icon
                        className="h-7 w-7 text-primary"
                        aria-hidden
                        strokeWidth={1.75}
                      />
                    </div>
                    <CardTitle className="font-heading mb-3 text-xl leading-snug text-primary md:text-2xl">
                      {value.title}
                    </CardTitle>
                    <p className="text-base leading-relaxed text-foreground/85">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">
            Our facilities
          </h2>
          <p className="text-muted mt-3 text-base">
            A sampling of spaces across SIMC—designed for safety, comfort, and
            efficient care. Swipe or use controls to explore.
          </p>
        </div>
        <FacilitiesCarousel facilities={facilities} />
      </section>

      <section className="border-t border-border/60 bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold md:text-3xl">
            Stay connected
          </h2>
          <p className="mb-8 text-base text-white/90">
            Questions about services, referrals, or partnerships? We are here to
            help.
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
