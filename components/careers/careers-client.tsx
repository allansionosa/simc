'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

export default function CareersClient({ jobs }: { jobs: Careers[] }) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      {jobs.map((job) => (
        <Card
          key={job.id}
          className="border-border/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <CardHeader className="flex flex-col gap-4 pb-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0 flex-1 space-y-2">
              <CardTitle className="font-heading text-xl text-primary md:text-2xl">
                {job.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground/80">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-secondary"
                    aria-hidden
                  />
                  <span className="line-clamp-2">{job.location}</span>
                </span>
                <span className="text-border hidden sm:inline" aria-hidden>
                  ·
                </span>
                <Badge variant="secondary" className="font-normal">
                  {job.employmentType}
                </Badge>
              </div>
            </div>
            <Button
              asChild
              className="w-full shrink-0 bg-accent hover:bg-accent/90 sm:w-auto"
            >
              <Link
                href={`/careers/${job.slug}`}
                className="inline-flex items-center justify-center gap-2"
              >
                View & apply
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted line-clamp-3 text-sm leading-relaxed md:line-clamp-none md:text-base">
              {stripHtmlIfNeeded(job.description)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function stripHtmlIfNeeded(html: string): string {
  if (!html.includes('<')) return html;
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}
