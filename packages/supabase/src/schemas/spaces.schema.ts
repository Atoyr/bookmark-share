import { z } from "zod";

export const spaceRowSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
  owner_id: z.uuid(),
  image: z.string().nullable().optional(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  deleted_at: z.iso.datetime().nullable().optional(),
});

export const spaceInsertSchema = z.object({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string(),
  owner_id: z.uuid(),
  image: z.string().nullable().optional(),
  created_at: z.iso.datetime().optional(),
  updated_at: z.iso.datetime().optional(),
  deleted_at: z.iso.datetime().nullable().optional(),
});

export const spaceUpdateSchema = z.object({
  id: z.uuid(),
  name: z.string().optional(),
  description: z.string().optional(),
  owner_id: z.uuid().optional(),
  image: z.string().nullable().optional(),
  created_at: z.iso.datetime().optional(),
  updated_at: z.iso.datetime().optional(),
  deleted_at: z.iso.datetime().nullable().optional(),
});
