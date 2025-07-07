import { getServices } from '@/components/hooks/useServices';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Metadata } from 'next';

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((s) => s.slug === slug);
  if (!service) return notFound();

  return (
    <main className="bg-accent/40 min-h-screen py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="flex flex-col items-center text-center gap-4 pt-8">
            <Image
              src={service.logo}
              alt={service.title}
              width={72}
              height={72}
              className="rounded-md"
            />
            <CardTitle className="text-3xl font-bold text-primary">
              {service.title}
            </CardTitle>
            <p className=" max-w-xl text-lg">{service.description}</p>
          </CardHeader>

          <Separator className="my-4" />

          <CardContent className="px-6 pb-8">
            <AspectRatio
              ratio={16 / 9}
              className="rounded-lg overflow-hidden mb-6"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </AspectRatio>

            <div className="text-center">
              <Button variant="ghost" asChild className="text-accent">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Services
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const services = await getServices();
  const service = services.find((s) => s.slug === params.slug);
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
