import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PAGE_QUERY = 'page';

function buildHref(basePath: string, page: number): string {
  if (page <= 1) return basePath;
  return `${basePath}?${PAGE_QUERY}=${page}`;
}

/** Compact page list with ellipses for large page counts */
function getVisiblePages(
  current: number,
  total: number
): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', total];
  }
  if (current >= total - 3) {
    return [
      1,
      'ellipsis',
      total - 4,
      total - 3,
      total - 2,
      total - 1,
      total,
    ];
  }
  return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total];
}

export type UrlPaginationProps = {
  /** Route path without trailing slash, e.g. `/services` or `/doctors` */
  basePath: string;
  /** Noun for the summary line, e.g. "categories" or "physicians" */
  itemLabel: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
};

export function UrlPagination({
  basePath,
  itemLabel,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
}: UrlPaginationProps) {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  const pages = getVisiblePages(currentPage, totalPages);

  const href = (page: number) => buildHref(basePath, page);

  return (
    <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center gap-4">
      <p className="text-muted text-sm">
        Showing{' '}
        <span className="font-medium text-foreground">
          {start}–{end}
        </span>{' '}
        of{' '}
        <span className="font-medium text-foreground">{totalItems}</span>{' '}
        {itemLabel}
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage <= 1 ? (
              <span
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'default' }),
                  'pointer-events-none inline-flex items-center gap-1 px-2.5 opacity-50 sm:pl-2.5'
                )}
                aria-disabled
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </span>
            ) : (
              <PaginationPrevious href={href(currentPage - 1)} />
            )}
          </PaginationItem>

          {pages.map((p, idx) =>
            p === 'ellipsis' ? (
              <PaginationItem key={`e-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <Link
                  href={href(p)}
                  aria-current={p === currentPage ? 'page' : undefined}
                  className={cn(
                    buttonVariants({
                      variant: p === currentPage ? 'outline' : 'ghost',
                      size: 'icon',
                    })
                  )}
                >
                  {p}
                </Link>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            {currentPage >= totalPages ? (
              <span
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'default' }),
                  'pointer-events-none inline-flex items-center gap-1 px-2.5 opacity-50 sm:pr-2.5'
                )}
                aria-disabled
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </span>
            ) : (
              <PaginationNext href={href(currentPage + 1)} />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
