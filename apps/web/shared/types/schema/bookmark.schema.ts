import { z } from 'zod';
import { tagSchema } from './tag.schema';
import { createdAndUpdatedSchema } from './datetime';

export const bookmarkSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  url: z.string(),
  tags: z.array(tagSchema),
});

export const getBookmarksResponseSchema = z.object({
  bookmarks: z.array(bookmarkSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const postBookmarkRequestSchema = z.object({
  space_id: z.uuid(),
  title: z.string(),
  url: z.string(),
});

export const postBookmarkResponseSchema = bookmarkSchema.extend(createdAndUpdatedSchema.shape);
