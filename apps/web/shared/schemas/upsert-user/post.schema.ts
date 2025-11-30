import { z } from 'zod';

export const postUpsertUserRequestSchema = z.object({
  name: z.string().min(1).max(100),
  avatar: z.string().nullable().optional(),
});
