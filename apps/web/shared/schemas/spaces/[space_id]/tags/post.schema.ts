import { z } from 'zod';
import { tagSchema, createTagSchema } from '#shared/schemas/tag.schema';

// `POST /spaces/[space_id]/tags`のリクエストスキーマ
export const postTagsRequestSchema = z.object({
  tags: z.array(createTagSchema),
});

// `POST /spaces/[space_id]/tags`のレスポンススキーマ
export const postTagsResponseSchema = z.object({
  space_id: z.string(),
  tags: z.array(tagSchema),
});
