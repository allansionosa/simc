'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CareersClient({ jobs }: { jobs: Careers[] }) {
  return (
    <div className="w-full flex flex-col items-center px-2">
      <div className="max-w-4xl w-full grid gap-8">
        {jobs.map((job) => (
          <Card key={job.title} className="shadow-lg border border-gray-200">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-primary mb-1">
                  {job.title}
                </CardTitle>
                <div className="text-gray-600 text-sm font-normal">
                  {job.location} &middot; {job.employmentType}
                </div>
              </div>
              <Link href={`/careers/${job.slug}`}>
                <Button>View Details & Apply</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div
                className="tiptap-content"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
