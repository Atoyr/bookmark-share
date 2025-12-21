import { z } from 'zod';
import { tagSchema } from '#shared/schemas/tag.schema';

// `POST /tags/[tag_id]`のリクエストスキーマ
export const postTagRequestSchema = z.object({
  name: z.string(),
  color: z.string(),
});

// `POST /tags/[tag_id]`のレスポンススキーマ
export const postTagResponseSchema = tagSchema;
