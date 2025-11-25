import { z } from 'zod';
import type { Bookmark } from '../types/bookmark';
import { createdAndUpdatedSchema } from './datetime';

export const bookmarkRowSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable().optional(),
  url: z.string(),
});

export const bookmarkRowWithDatetimeSchema = bookmarkRowSchema.merge(createdAndUpdatedSchema);

export const bookmarkRowTransformBookmark = bookmarkRowSchema.transform(
  (row): Bookmark => ({
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    url: row.url,
    tags: [],
  })
);

export const bookmarkRowWithDatetimeTransformUser = bookmarkRowWithDatetimeSchema.transform(
  (row): Bookmark => ({
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    url: row.url,
    tags: [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  })
);
