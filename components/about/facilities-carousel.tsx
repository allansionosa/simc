'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

type Props = {
  facilities: Facilities[];
};

export function FacilitiesCarousel({ facilities }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const update = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };
    update();
    api.on('select', update);
    api.on('reInit', update);
    return () => {
      api.off('select', update);
      api.off('reInit', update);
    };
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: facilities.length > 1,
          skipSnaps: false,
          dragFree: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 md:-ml-4">
          {facilities.map((facility) => (
            <CarouselItem
              key={facility.id}
              className="min-w-0 basis-full pl-3 sm:basis-1/2 lg:basis-1/3 md:pl-4"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading mb-2 text-lg font-bold text-primary">
                    {facility.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          type="button"
          className={cn(
            'top-1/2 z-10 size-11 -translate-y-1/2 rounded-full border-border bg-card/95 shadow-md backdrop-blur-sm',
            'left-1 sm:left-2 md:left-0',
            '[&>svg]:size-5'
          )}
          variant="outline"
        />
        <CarouselNext
          type="button"
          className={cn(
            'top-1/2 z-10 size-11 -translate-y-1/2 rounded-full border-border bg-card/95 shadow-md backdrop-blur-sm',
            'right-1 sm:right-2 md:right-0',
            '[&>svg]:size-5'
          )}
          variant="outline"
        />
      </Carousel>

      <div
        className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-muted order-2 text-sm tabular-nums sm:order-1">
          <span className="sr-only">Slide </span>
          {current + 1} <span className="opacity-70">/</span>{' '}
          {count}
          <span className="sr-only"> of {count}</span>
        </p>
        <div
          className="order-1 flex max-w-full flex-wrap justify-center gap-2 sm:order-2"
          aria-label="Carousel pagination"
        >
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to facility ${index + 1} of ${count}`}
              className={cn(
                'h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                current === index
                  ? 'w-8 bg-accent'
                  : 'w-2.5 bg-border hover:bg-muted-foreground/40'
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </div>

      <p className="text-muted mx-auto mt-3 max-w-xl text-center text-xs">
        Swipe on touch devices, or use arrows and dots to browse.
      </p>
    </div>
  );
}
