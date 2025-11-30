import { z } from 'zod';

/**
 * created_atフィールドのzodスキーマ定義
 */
export const createdAtSchema = z.object({
  created_at: z.iso.datetime(),
});

/**
 * updated_atフィールドのzodスキーマ定義
 */
export const updatedAtSchema = z.object({
  updated_at: z.iso.datetime(),
});

/**
 * created_atとupdated_atフィールドのzodスキーマ定義
 */
export const createdAndUpdatedSchema = createdAtSchema.extend(updatedAtSchema.shape);

/**
 * deleted_atフィールドのzodスキーマ定義
 */
export const deletedAtSchema = z.object({
  deleted_at: z.iso.datetime().nullable(),
});
