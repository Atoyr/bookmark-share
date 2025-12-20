import { z } from "zod";

export const tagDefinitionsRowSchema = z.object({
  id: z.uuid(),
  space_id: z.uuid(),
  name: z.string(),
  color: z.string(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  deleted_at: z.iso.datetime().nullable().optional(),
});

export const tagDefinitionsInsertSchema = z.object({
  id: z.uuid().optional(),
  space_id: z.uuid(),
  name: z.string(),
  color: z.string(),
  created_at: z.iso.datetime().optional(),
  updated_at: z.iso.datetime().optional(),
  deleted_at: z.iso.datetime().nullable().optional(),
});

export const tagDefinitionsUpdateSchema = z.object({
  id: z.uuid(),
  space_id: z.uuid().optional(),
  name: z.string().optional(),
  color: z.string().optional(),
  created_at: z.iso.datetime().optional(),
  updated_at: z.iso.datetime().optional(),
  deleted_at: z.iso.datetime().nullable().optional(),
});
