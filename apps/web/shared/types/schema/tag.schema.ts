import { z } from 'zod';

export const tagSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  color: z.string(),
});
