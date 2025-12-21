import { z } from 'zod';

export const tagSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  color: z.string(),
  updated_at: z.iso.datetime().optional(),
});

export const createTagSchema = z.object({
  id: z.uuid().optional(),
  name: z.string(),
  color: z.string(),
  updated_at: z.iso.datetime().optional(),
});

export const updateTagSchema = z.object({
  id: z.uuid(), 
  name: z.string().optional(),
  color: z.string().optional(),
});
