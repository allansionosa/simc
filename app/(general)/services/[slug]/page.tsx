import { getServiceBySlug, getServices } from '@/components/hooks/useServices';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ChevronRight,
  CalendarCheck,
  Phone,
  CheckCircle2,
  Home,
} from 'lucide-react';
import { ServiceCategoryIcon } from '@/components/services/service-category-icon';
import Link from 'next/link';
import { Metadata } from 'next';

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return notFound();

  const offerings = service.offerings ?? [];

  return (
    <main className="bg-surface min-h-screen">
      <div className="border-b border-border/70 bg-white/90 backdrop-blur-sm">
        <nav
          aria-label="Breadcrumb"
          className="container mx-auto max-w-6xl px-4 py-4"
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            <li className="flex items-center gap-1.5">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-foreground/80 underline-offset-4 hover:text-accent hover:underline"
              >
                <Home className="h-4 w-4 shrink-0" aria-hidden />
                Home
              </Link>
            </li>
            <li aria-hidden className="text-muted/70">
              /
            </li>
            <li>
              <Link
                href="/services"
                className="text-foreground/80 underline-offset-4 hover:text-accent hover:underline"
              >
                Services
              </Link>
            </li>
            <li aria-hidden className="text-muted/70">
              /
            </li>
            <li className="font-medium text-primary" aria-current="page">
              {service.title}
            </li>
          </ol>
        </nav>
      </div>

      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-sky-50 via-white to-sky-100/70">
        <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="min-w-0 flex-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-white shadow-sm">
                  <ServiceCategoryIcon
                    slug={service.slug}
                    className="h-8 w-8 text-primary"
                  />
                </div>
                {offerings.length > 0 ? (
                  <Badge variant="secondary" className="font-normal">
                    {offerings.length}{' '}
                    {offerings.length === 1 ? 'service' : 'services'}
                  </Badge>
                ) : null}
              </div>
              <h1 className="font-heading mb-4 text-3xl font-bold text-primary md:text-4xl md:leading-tight">
                {service.title}
              </h1>
              <p className="text-muted mb-4 max-w-2xl text-lg leading-relaxed">
                {service.description}
              </p>
              {service.detailIntro ? (
                <p className="max-w-2xl text-base leading-relaxed text-foreground/90">
                  {service.detailIntro}
                </p>
              ) : null}
            </div>
            <div className="relative mx-auto w-full max-w-md shrink-0 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 lg:mx-0 lg:w-[380px]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 380px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-border/70 pb-4">
              <h2 className="font-heading text-2xl font-bold text-primary">
                Available services
              </h2>
            </div>

            {offerings.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-10 text-center text-muted">
                  Detailed listings for this category will appear here when
                  available.
                </CardContent>
              </Card>
            ) : (
              <ul className="grid list-none gap-4 p-0">
                {offerings.map((item, index) => (
                  <li key={item.id}>
                    <article className="group rounded-xl border border-border/80 bg-card p-5 shadow-sm transition hover:border-accent/40 hover:shadow-md md:p-6">
                      <div className="flex gap-4">
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/8 text-sm font-semibold text-primary"
                          aria-hidden
                        >
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <h3 className="font-heading text-lg font-semibold text-primary">
                              {item.title}
                            </h3>
                            {item.note ? (
                              <Badge variant="outline" className="font-normal">
                                {item.note}
                              </Badge>
                            ) : null}
                          </div>
                          <p className="text-muted text-sm leading-relaxed md:text-base">
                            {item.description}
                          </p>
                        </div>
                        <CheckCircle2
                          className="mt-1 h-5 w-5 shrink-0 text-secondary opacity-80"
                          aria-hidden
                        />
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10">
              <Button variant="outline" asChild className="gap-2">
                <Link href="/services">
                  <ArrowLeft className="h-4 w-4" />
                  All services
                </Link>
              </Button>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <Card className="overflow-hidden border-accent/25 shadow-md py-0 ">
              <CardHeader className="bg-primary text-primary-foreground pt-3">
                <CardTitle className="flex items-center gap-2 text-lg ">
                  <CalendarCheck className="h-5 w-5 shrink-0" />
                  Book a visit
                </CardTitle>
                <CardDescription className="text-primary-foreground/85 pb-1">
                  Appointments are scheduled with your physician’s order or
                  after triage, depending on the service.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 ">
                <p className="text-sm text-muted">
                  For outpatient consultation or imaging referrals, contact our
                  team—we will guide next steps.
                </p>
                <Button
                  asChild
                  className="w-full gap-2 bg-accent hover:bg-accent/90"
                >
                  <Link href="/contact">
                    Request appointment
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Separator />
                <div className="flex gap-3 text-sm pb-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted">
                      See our contact page for the main line and department
                      hours.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="py-3">
              <CardHeader>
                <CardTitle className="text-base">Before you visit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted">
                <p>
                  Bring a valid ID, your physician’s referral or order (if
                  applicable), and any prior records or imaging on CD/USB when
                  requested.
                </p>
                <p>
                  Arrive a few minutes early to complete registration so your
                  care team can stay on schedule.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | St. Irenaeus Medical Center Inc.`,
    description: service.description,
    openGraph: {
      title: `${service.title} | St. Irenaeus Medical Center Inc.`,
      description: service.description,
      url: `https://your-domain.com/services/${service.slug}`,
      siteName: 'St. Irenaeus Medical Center Inc.',
      images: [
        {
          url: `https://your-domain.com${service.image}`,
          width: 800,
          height: 600,
          alt: service.title,
        },
      ],
      locale: 'en_PH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | St. Irenaeus Medical Center Inc.`,
      description: service.description,
      images: [`https://your-domain.com${service.image}`],
    },
  };
}
