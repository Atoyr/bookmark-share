import { z } from "zod";

export const tagDefinitionsRowSchema = z.object({
  id: z.uuid(),
  space_id: z.uuid(),
  name: z.string(),
  color: z.string(),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
  deleted_at: z.iso.datetime({ offset: true }).nullable().optional(),
});

export const tagDefinitionsInsertSchema = z.object({
  id: z.uuid().optional(),
  space_id: z.uuid(),
  name: z.string(),
  color: z.string(),
  created_at: z.iso.datetime({ offset: true }).optional(),
  updated_at: z.iso.datetime({ offset: true }).optional(),
  deleted_at: z.iso.datetime({ offset: true }).nullable().optional(),
});

export const tagDefinitionsUpdateSchema = z.object({
  id: z.uuid(),
  space_id: z.uuid().optional(),
  name: z.string().optional(),
  color: z.string().optional(),
  created_at: z.iso.datetime({ offset: true }).optional(),
  updated_at: z.iso.datetime({ offset: true }).optional(),
  deleted_at: z.iso.datetime({ offset: true }).nullable().optional(),
});
