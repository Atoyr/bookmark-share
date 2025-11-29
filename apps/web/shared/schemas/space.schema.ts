import { z } from 'zod';

export const spaceSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  owner: z.uuid(), 
  image: z.string().nullable(),
});
