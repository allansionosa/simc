import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getNews } from '@/components/hooks/useNews';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const newsList = await getNews();
  const news = newsList.find((n) => n.slug === params.slug);
  if (!news) return notFound();

  return (
    <main className="bg-accent/40 min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="flex flex-col items-center text-center gap-4 pt-8">
            <Image
              src={news.image}
              alt={news.title}
              width={600}
              height={300}
              className="rounded-lg object-cover w-full h-48 md:h-64"
            />
            <CardTitle className="text-3xl font-bold text-primary">
              {news.title}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {news.addedDate} | {news.type}
            </div>
          </CardHeader>
          <Separator className="my-4" />
          <CardContent className="px-6 pb-8">
            <div className="prose max-w-none mb-6 text-center mx-auto">
              {news.description}
            </div>
            <div className="text-center">
              <Button variant="ghost" asChild className="text-accent">
                <Link href="/news" className="inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to News
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
