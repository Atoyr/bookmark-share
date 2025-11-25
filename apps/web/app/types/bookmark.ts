import type { Tag } from './tag';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  tags: Tag[];
}
