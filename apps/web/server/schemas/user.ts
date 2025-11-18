import { z } from 'zod';
import type { User } from '../types/user';
import { createdAndUpdatedSchema } from './datetime';

export const userRowSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  avatar: z.string().nullable().optional(),
});

export const userRowWithDatetimeSchema = userRowSchema.merge(createdAndUpdatedSchema);

export const userRowTransformUser = userRowSchema.transform(
  (row): User => ({
    id: row.id,
    name: row.name,
    avatar: row.avatar ?? null,
  })
);

export const userRowWithDatetimeTransformUser = userRowWithDatetimeSchema.transform(
  (row): User => ({
    id: row.id,
    name: row.name,
    avatar: row.avatar ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  })
);
