import { z } from 'zod';
import { bookmarkFormSchema } from '@/schemas/forms/bookmarkFormSchema';

export type BookmarkFormValues = z.infer<typeof bookmarkFormSchema>;
