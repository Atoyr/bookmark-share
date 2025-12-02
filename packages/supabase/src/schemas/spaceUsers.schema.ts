import { z } from "zod";

export const spaceUserRowSchema = z.object({
  id: z.uuid(),
  uid: z.uuid(),
  space_id: z.uuid(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const spaceUserInsertSchema = z.object({
  id: z.uuid().optional(),
  uid: z.uuid(),
  space_id: z.uuid(),
  created_at: z.iso.datetime().optional(),
  updated_at: z.iso.datetime().optional(),
});

export const spaceUserUpdateSchema = z.object({
  id: z.uuid(),
  uid: z.uuid().optional(),
  space_id: z.uuid().optional(),
  created_at: z.iso.datetime().optional(),
  updated_at: z.iso.datetime().optional(),
});
