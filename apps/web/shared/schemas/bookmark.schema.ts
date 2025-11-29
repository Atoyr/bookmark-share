import { z } from 'zod';
import { tagSchema } from './tag.schema';

export const bookmarkSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  url: z.url(), 
  tags: z.array(tagSchema),
});
