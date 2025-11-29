import { z } from 'zod';
import { spaceSchema } from '#shared/schemas/space.schema';
import { updatedAtSchema } from '#shared/schemas/datetime';
import { userSchema } from '#shared/schemas/user.schema';

export const getSpaceResponseSchema = z.object({
  space: spaceSchema.extend(updatedAtSchema.shape).extend({
    users: z.array(userSchema),
  }),
});

export const getSpacesResponseSchema = z.object({
  spaces: z.array(spaceSchema),
  total: z.number(),
});
