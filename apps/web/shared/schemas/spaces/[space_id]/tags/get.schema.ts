import { z } from 'zod';
import { tagSchema } from '#shared/schemas/tag.schema';

// `GET /spaces/[space_id]/tags`のレスポンススキーマ
export const getTagsResponseSchema = z.object({
  tags: z.array(tagSchema),
});

