import { z } from 'zod';
import { bookmarkSchema } from '#shared/schemas/bookmark.schema';
import { createdAndUpdatedSchema } from '#shared/schemas/datetime';

export const postBookmarkRequestSchema = z.object({
  space_id: z.uuid(),
  title: z.string(),
  url: z.string(),
});

export const postBookmarkResponseSchema = bookmarkSchema.extend(createdAndUpdatedSchema.shape);

