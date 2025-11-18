import { z } from 'zod';

/**
 * created_atフィールドのzodスキーマ定義
 */
export const createdAtSchema = z.object({
  created_at: z.string().transform((str) => new Date(str)),
});

/**
 * updated_atフィールドのzodスキーマ定義
 */
export const updatedAtSchema = z.object({
  updated_at: z.string().transform((str) => new Date(str)),
});

/**
 * created_atとupdated_atフィールドのzodスキーマ定義
 */
export const createdAndUpdatedSchema = createdAtSchema.merge(updatedAtSchema);

/**
 * deleted_atフィールドのzodスキーマ定義
 */
export const deletedAtSchema = z.object({
  deleted_at: z
    .string()
    .transform((str) => new Date(str))
    .nullable(),
});
