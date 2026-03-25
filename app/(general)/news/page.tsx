import { getNews } from '@/components/hooks/useNews';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import { UrlPagination } from '@/components/pagination/url-pagination';
import { ArrowRight, Calendar, Megaphone, Newspaper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const NEWS_PAGE_SIZE = 4;

// NOTE:
// API-based news header fetching has been disabled so this page can be
// fully static. When your API is ready, restore getNewsHeader and use it here.

const dummyNewsHeader: Header = {
  id: 'news-header',
  title: 'News & updates',
  subTitle: 'Stay informed with SIMC',
  description:
    'Announcements, health tips, and community stories from St. Irenaeus Medical Center Inc.',
  image: '/appointment.jpg',
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const data = await getNews();
  const header = dummyNewsHeader;
  const { page: pageParam } = await searchParams;
  const rawPage = Number.parseInt(pageParam ?? '1', 10);
  const totalPages = Math.max(1, Math.ceil(data.length / NEWS_PAGE_SIZE));
  const currentPage =
    Number.isFinite(rawPage) && rawPage >= 1
      ? Math.min(Math.floor(rawPage), totalPages)
      : 1;
  const paginatedNews = data.slice(
    (currentPage - 1) * NEWS_PAGE_SIZE,
    currentPage * NEWS_PAGE_SIZE
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
                <Newspaper className="h-4 w-4 shrink-0 text-secondary" />
                Official updates
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm text-foreground shadow-sm">
                <Megaphone className="h-4 w-4 shrink-0 text-secondary" />
                For patients & families
              </span>
            </div>
          </div>
          <div className="flex w-full flex-1 justify-center md:w-auto">
            <div className="relative aspect-[4/3] w-full max-w-[min(100%,420px)] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
              <Image
                src={header.image}
                alt=""
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
            Latest stories
          </h2>
          <p className="text-muted mt-3 text-base">
            Select an article to read the full details.
          </p>
        </div>

        <ul className="mx-auto grid max-w-4xl list-none grid-cols-1 gap-6 p-0 md:grid-cols-2">
          {paginatedNews.map((news, idx) => (
            <li key={news.slug}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <Link
                  href={`/news/${news.slug}`}
                  className="flex min-h-0 flex-1 flex-col no-underline outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <Image
                      src={news.image}
                      alt=""
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority={idx === 0 && currentPage === 1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-transparent" />
                    <div className="absolute left-3 top-3">
                      <Badge
                        variant="secondary"
                        className="font-normal shadow-sm"
                      >
                        {news.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="text-muted mb-2 flex items-center gap-2 text-xs">
                      <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {dayjs(news.addedDate).format('MMMM D, YYYY')}
                    </div>
                    <h3 className="font-heading group-hover:text-accent mb-2 text-lg font-bold text-primary transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-muted mb-4 line-clamp-3 flex-1 text-sm leading-relaxed">
                      {news.description}
                    </p>
                    <span className="text-accent inline-flex items-center gap-2 text-sm font-semibold">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <UrlPagination
          basePath="/news"
          itemLabel="articles"
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={data.length}
          pageSize={NEWS_PAGE_SIZE}
        />
      </section>

      <section className="border-t border-border/60 bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold md:text-3xl">
            Questions or media inquiries?
          </h2>
          <p className="mb-8 text-base text-white/90">
            Reach our team for general information or to subscribe to updates.
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
  title: 'News & Updates | St. Irenaeus Medical Center Inc.',
  description:
    'Stay up to date with the latest news, events, and updates from St. Irenaeus Medical Center Inc. We are committed to keeping our community informed and healthy.',
  keywords: [
    'St. Irenaeus Medical Center',
    'news',
    'updates',
    'events',
    'healthcare',
    'hospital',
    'Philippines',
  ],
  openGraph: {
    title: 'News & Updates | St. Irenaeus Medical Center Inc.',
    description:
      'Stay up to date with the latest news, events, and updates from St. Irenaeus Medical Center Inc.',
    url: 'https://your-domain.com/news',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/news1.jpg',
        width: 800,
        height: 600,
        alt: 'St. Irenaeus Medical Center News',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News & Updates | St. Irenaeus Medical Center Inc.',
    description:
      'Stay up to date with the latest news, events, and updates from St. Irenaeus Medical Center Inc.',
    images: ['https://your-domain.com/news1.jpg'],
  },
};
