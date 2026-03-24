import type { ComponentProps } from 'react';
import { UrlPagination } from '@/components/pagination/url-pagination';

type Props = Omit<
  ComponentProps<typeof UrlPagination>,
  'basePath' | 'itemLabel'
>;

export function ServicesPagination(props: Props) {
  return (
    <UrlPagination
      basePath="/services"
      itemLabel="categories"
      {...props}
    />
  );
}
