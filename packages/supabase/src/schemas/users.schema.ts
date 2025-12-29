import { z } from "zod";

export const userRowSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  avatar: z.string().nullable().optional(),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
  deleted_at: z.iso.datetime({ offset: true }).nullable().optional(),
});

export const userInsertSchema = z.object({
  id: z.uuid().optional(),
  name: z.string(),
  avatar: z.string().nullable().optional(),
  created_at: z.iso.datetime({ offset: true }).optional(),
  updated_at: z.iso.datetime({ offset: true }).optional(),
  deleted_at: z.iso.datetime({ offset: true }).nullable().optional(),
});

export const userUpdateSchema = z.object({
  id: z.uuid(),
  name: z.string().optional(),
  avatar: z.string().nullable().optional(),
  created_at: z.iso.datetime({ offset: true }).optional(),
  updated_at: z.iso.datetime({ offset: true }).optional(),
  deleted_at: z.iso.datetime({ offset: true }).nullable().optional(),
});
