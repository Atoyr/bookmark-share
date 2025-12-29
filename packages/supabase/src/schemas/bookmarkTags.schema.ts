import { z } from "zod";

export const bookmarkTagsRowSchema = z.object({
  id: z.uuid(),
  bookmark_id: z.uuid(),
  tag_definition_id: z.uuid(),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
});

export const bookmarkTagsInsertSchema = z.object({
  id: z.uuid().optional(),
  bookmark_id: z.uuid(),
  tag_definition_id: z.uuid(),
  created_at: z.iso.datetime({ offset: true }).optional(),
  updated_at: z.iso.datetime({ offset: true }).optional(),
});

export const bookmarkTagsUpdateSchema = z.object({
  id: z.uuid(),
  bookmark_id: z.uuid().optional(),
  tag_definition_id: z.uuid().optional(),
  title: z.string().optional(),
  url: z.url().optional(),
  created_at: z.iso.datetime({ offset: true }).optional(),
  updated_at: z.iso.datetime({ offset: true }).optional(),
});
