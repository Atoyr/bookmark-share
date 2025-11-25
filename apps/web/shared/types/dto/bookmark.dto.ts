import type { TagDto } from './tag.dto';

export interface BookmarkDto {
  id: string;
  title: string;
  url: string;
  tags: TagDto[];
}

export interface GetBookmarksDto {
  bookmarks: BookmarkDto[];
  total: number;
  page: number;
  pageSize: number;
}
