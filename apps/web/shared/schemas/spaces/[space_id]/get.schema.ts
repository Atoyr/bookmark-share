import { z } from 'zod';
import { spaceSchema } from '#shared/schemas/space.schema';
import { updatedAtSchema } from '#shared/schemas/datetime';
import { userSchema } from '#shared/schemas/user.schema';

// `GET /spaces/[space_id]`のレスポンススキーマ
export const getSpaceResponseSchema = z.object({
  space: spaceSchema.extend(updatedAtSchema.shape).extend({
    users: z.array(userSchema),
  }),
});

