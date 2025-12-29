import { z } from "zod";

export const bookmarksRowSchema = z.object({
  id: z.uuid(),
  space_id: z.uuid(),
  title: z.string(),
  url: z.url(),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
  deleted_at: z.iso.datetime({ offset: true }).nullable().optional(),
});

export const bookmarksInsertSchema = z.object({
  id: z.uuid().optional(),
  space_id: z.uuid(),
  title: z.string(),
  url: z.url(),
  created_at: z.iso.datetime({ offset: true }).optional(),
  updated_at: z.iso.datetime({ offset: true }).optional(),
  deleted_at: z.iso.datetime({ offset: true }).nullable().optional(),
});

export const bookmarksUpdateSchema = z.object({
  id: z.uuid(),
  space_id: z.uuid().optional(),
  title: z.string().optional(),
  url: z.url().optional(),
  created_at: z.iso.datetime({ offset: true }).optional(),
  updated_at: z.iso.datetime({ offset: true }).optional(),
  deleted_at: z.iso.datetime({ offset: true }).nullable().optional(),
});
