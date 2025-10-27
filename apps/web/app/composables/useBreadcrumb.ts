export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export const useBreadcrumb = () => useState<BreadcrumbItem[]>('breadcrumb', () => []);
