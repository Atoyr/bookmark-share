import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

// Zod のバリデーションルール
export const bookmarkFormSchema = z.object({
  url: z
    .string()
    .url('有効なURLを入力してください'),
  title: z
    .string()
    .min(1, 'タイトルは必須です')
    .max(100, 'タイトルは100文字以内で入力してください'),
})

export const bookmarkFormTypedSchema = toTypedSchema(bookmarkFormSchema)
