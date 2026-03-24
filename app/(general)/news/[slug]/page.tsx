import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getNews } from '@/components/hooks/useNews';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { SiteBreadcrumb } from '@/components/site-breadcrumb';
import Link from 'next/link';
import type { Metadata } from 'next';
import dayjs from 'dayjs';

export async function generateStaticParams() {
  const newsList = await getNews();
  return newsList.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const newsList = await getNews();
  const news = newsList.find((n) => n.slug === slug);
  if (!news) return {};
  return {
    title: `${news.title} | St. Irenaeus Medical Center Inc.`,
    description: news.description,
    openGraph: {
      title: `${news.title} | St. Irenaeus Medical Center Inc.`,
      description: news.description,
      url: `https://your-domain.com/news/${news.slug}`,
      siteName: 'St. Irenaeus Medical Center Inc.',
      images: [
        {
          url: `https://your-domain.com${news.image}`,
          width: 800,
          height: 600,
          alt: news.title,
        },
      ],
      locale: 'en_PH',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${news.title} | St. Irenaeus Medical Center Inc.`,
      description: news.description,
      images: [`https://your-domain.com${news.image}`],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const newsList = await getNews();
  const news = newsList.find((n) => n.slug === slug);
  if (!news) return notFound();

  return (
    <main className="bg-surface min-h-screen">
      <SiteBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'News', href: '/news' },
          { label: news.title },
        ]}
      />

      <article className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center md:text-left">
          <BadgePill type={news.type} />
          <h1 className="font-heading mt-4 text-balance text-3xl font-bold text-primary md:text-4xl md:leading-tight">
            {news.title}
          </h1>
          <p className="text-muted mt-4 flex flex-wrap items-center justify-center gap-2 text-sm md:justify-start">
            <Calendar className="h-4 w-4 shrink-0" aria-hidden />
            <time dateTime={news.addedDate}>
              {dayjs(news.addedDate).format('MMMM D, YYYY')}
            </time>
            <span className="text-border" aria-hidden>
              ·
            </span>
            <span>{news.type}</span>
          </p>
        </header>

        <div className="relative mb-10 aspect-[21/9] w-full overflow-hidden rounded-2xl md:aspect-[2/1]">
          <Image
            src={news.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        <Separator className="mb-10" />

        <div className="prose prose-neutral max-w-none text-pretty text-foreground/90 [&_p]:mb-4 [&_p]:text-base [&_p]:leading-relaxed md:[&_p]:text-lg">
          <p>{news.description}</p>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/news">
              <ArrowLeft className="h-4 w-4" />
              All news
            </Link>
          </Button>
        </div>
        </div>
      </article>
    </main>
  );
}

function BadgePill({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
      {type}
    </span>
  );
}
