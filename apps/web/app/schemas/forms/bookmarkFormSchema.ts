import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const tagSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  color: z.string(),
});

// Zod のバリデーションルール
export const bookmarkFormSchema = z.object({
  url: z
    .url('有効なURLを入力してください'),
  title: z
    .string()
    .min(1, 'タイトルは必須です')
    .max(100, 'タイトルは100文字以内で入力してください'),
  tags: z
    .array(tagSchema)
    .optional(),
})

export const bookmarkFormTypedSchema = toTypedSchema(bookmarkFormSchema)
