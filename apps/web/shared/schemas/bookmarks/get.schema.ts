import { z } from 'zod';
import { bookmarkSchema } from '#shared/schemas/bookmark.schema';

export const getBookmarksResponseSchema = z.object({
  bookmarks: z.array(bookmarkSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

