import { z } from 'zod';
import { spaceSchema } from '#shared/schemas/space.schema';

// `GET /spaces`のレスポンススキーマ
export const getSpacesResponseSchema = z.object({
  spaces: z.array(spaceSchema),
  total: z.number(),
});
