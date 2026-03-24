import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarCheck,
  HeartPulse,
  Users,
  ShieldCheck,
  Stethoscope,
  Building2,
} from 'lucide-react';
import { getAbout } from '@/components/hooks/useAbout';
import { getDoctors } from '@/components/hooks/useDoctor';
import { Metadata } from 'next';

const VALUES = [
  {
    icon: HeartPulse,
    title: 'Compassionate care',
    body: 'We treat every patient with empathy, respect, and dignity.',
  },
  {
    icon: Stethoscope,
    title: 'Expert physicians',
    body: 'Highly skilled specialists and staff focused on clear communication and outcomes.',
  },
  {
    icon: ShieldCheck,
    title: 'Patient safety',
    body: 'Rigorous protocols and a clean, modern environment for your peace of mind.',
  },
  {
    icon: Users,
    title: 'Community focused',
    body: 'Committed to serving families and neighbors across our region.',
  },
] as const;

export default async function AboutPage() {
  const data = await getAbout();
  const doctors = await getDoctors();
  const leadershipPreview = doctors.slice(0, 3);

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
              About SIMC
            </p>
            <h1 className="font-heading mb-4 text-3xl font-bold text-primary md:text-5xl md:leading-tight">
              {data.subTitle}
            </h1>
            <p className="text-primary/90 mb-2 text-lg font-medium md:text-xl">
              {data.title}
            </p>
            <p className="text-muted mx-auto mb-8 max-w-xl text-base leading-relaxed md:mx-0 md:text-lg">
              {data.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm text-foreground shadow-sm">
                <Building2 className="h-4 w-4 shrink-0 text-secondary" />
                Modern facility
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm text-foreground shadow-sm">
                <HeartPulse className="h-4 w-4 shrink-0 text-secondary" />
                Patient-centered
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
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">
            Why patients choose SIMC
          </h2>
          <p className="text-muted mt-3 text-base">
            Our values guide how we care for you—from your first visit through
            follow-up and recovery.
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" aria-hidden />
              </div>
              <h3 className="font-heading mb-2 text-lg font-semibold text-primary">
                {title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/30 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">
              Meet our team
            </h2>
            <p className="text-muted mt-3 text-base">
              A few of our physicians. Explore the full directory, specialties,
              and HMO accreditation details anytime.
            </p>
          </div>
          <div className="mx-auto flex max-w-4xl flex-col items-stretch gap-6 sm:flex-row sm:justify-center sm:gap-8">
            {leadershipPreview.map((doctor) => (
              <article
                key={doctor.publicId ?? doctor.id}
                className="flex flex-1 flex-col items-center rounded-2xl border border-border/80 bg-card p-6 text-center shadow-sm"
              >
                <div className="relative mb-4 h-[120px] w-[120px] overflow-hidden rounded-full ring-2 ring-primary/15">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
                <h3 className="font-heading text-primary mb-1 max-w-[240px] text-base font-bold leading-snug">
                  {doctor.name}
                </h3>
                <p className="text-accent mb-4 text-sm font-medium">
                  {doctor.specialties}
                </p>
                <Link
                  href="/doctors"
                  className="text-muted hover:text-accent text-xs font-medium underline-offset-4 transition hover:underline"
                >
                  View full directory
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link
              href="/doctors"
              className="text-accent inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
            >
              View all doctors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border/80 bg-card p-8 text-center shadow-sm md:p-10">
          <h2 className="font-heading text-xl font-bold text-primary md:text-2xl">
            Explore SIMC
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            Services, accepted HMOs, appointments, and contact—everything you need
            in one place.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-primary shadow-sm transition hover:bg-muted"
            >
              Our services
            </Link>
            <Link
              href="/about/hmo"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-primary shadow-sm transition hover:bg-muted"
            >
              Accepted HMOs
            </Link>
            <Link
              href="/hmo-approval"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-primary shadow-sm transition hover:bg-muted"
            >
              HMO approval
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold md:text-3xl">
            Ready to visit or have questions?
          </h2>
          <p className="mb-8 text-base text-white/90">
            Reach out to schedule an appointment or speak with our team about
            your care.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow transition hover:bg-slate-100"
            >
              Contact us
            </Link>
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <CalendarCheck className="h-4 w-4" />
              Book appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'About Us | St. Irenaeus Medical Center Inc.',
  description:
    'Learn about St. Irenaeus Medical Center Inc. - our mission, values, and commitment to providing exceptional healthcare services to our community.',
  keywords: [
    'about us',
    'St. Irenaeus Medical Center',
    'healthcare',
    'mission',
    'values',
    'Philippines',
  ],
  openGraph: {
    title: 'About Us | St. Irenaeus Medical Center Inc.',
    description:
      'Learn about St. Irenaeus Medical Center Inc. - our mission, values, and commitment to providing exceptional healthcare services to our community.',
    url: 'https://your-domain.com/about/about-us',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/simc_blue.png',
        width: 800,
        height: 600,
        alt: 'About St. Irenaeus Medical Center',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | St. Irenaeus Medical Center Inc.',
    description:
      'Learn about St. Irenaeus Medical Center Inc. - our mission, values, and commitment to providing exceptional healthcare services to our community.',
    images: ['https://your-domain.com/simc_blue.png'],
  },
};
