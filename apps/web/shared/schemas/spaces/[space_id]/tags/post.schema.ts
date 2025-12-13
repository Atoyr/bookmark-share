import { z } from 'zod';
import { tagSchema } from '#shared/schemas/tag.schema';

// `POST /spaces/[space_id]/tags`のリクエストスキーマ
export const postTagsRequestSchema = z.object({
  tags: z.array(tagSchema),
});

// `POST /spaces/[space_id]/tags`のレスポンススキーマ
export const postTagsResponseSchema = z.object({
  tags: z.array(tagSchema),
});

