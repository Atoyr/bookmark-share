import type { Tag } from './Tag';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  tags: Tag[];
}
