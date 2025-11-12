import type { TagDto } from './tag.dto';

export interface BookmarkDto {
  id: string;
  title: string;
  url: string;
  tags: TagDto[];
}
