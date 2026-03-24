import * as React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';

const linkClass =
  'text-foreground/80 underline-offset-4 hover:text-accent hover:underline';
const homeLinkClass =
  'inline-flex items-center gap-1 text-foreground/80 underline-offset-4 hover:text-accent hover:underline';

export type SiteBreadcrumbItem = {
  label: React.ReactNode;
  href?: string;
};

export type SiteBreadcrumbProps = {
  items: SiteBreadcrumbItem[];
  /** Inner container max width (default matches services/news) */
  maxWidthClassName?: string;
  /** Show Home icon on the first link (default true) */
  showHomeIcon?: boolean;
};

export function SiteBreadcrumb({
  items,
  maxWidthClassName = 'max-w-6xl',
  showHomeIcon = true,
}: SiteBreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <div className="border-b border-border/70 bg-white/90 backdrop-blur-sm">
      <Breadcrumb
        aria-label="Breadcrumb"
        className={cn('container mx-auto px-4 py-4', maxWidthClassName)}
      >
        <BreadcrumbList className="flex flex-wrap items-center gap-1.5 text-sm break-words text-muted sm:gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;
            const hasHref = item.href != null && item.href !== '';

            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <BreadcrumbSeparator className="text-muted/70">/</BreadcrumbSeparator>
                )}
                <BreadcrumbItem
                  className={cn(
                    isFirst && showHomeIcon && 'flex items-center gap-1.5',
                    isLast && 'min-w-0'
                  )}
                >
                  {isLast ? (
                    <BreadcrumbPage className="font-medium text-primary line-clamp-2">
                      {item.label}
                    </BreadcrumbPage>
                  ) : hasHref ? (
                    <BreadcrumbLink
                      asChild
                      className={cn(
                        isFirst && showHomeIcon ? homeLinkClass : linkClass
                      )}
                    >
                      <Link href={item.href!}>
                        {isFirst && showHomeIcon ? (
                          <>
                            <Home className="h-4 w-4 shrink-0" aria-hidden />
                            {item.label}
                          </>
                        ) : (
                          item.label
                        )}
                      </Link>
                    </BreadcrumbLink>
                  ) : null}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
