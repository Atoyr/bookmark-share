import { defineEventHandler } from 'h3';
import { requireUser } from '../../auth/core/helpers';
import { signup } from '../../usecases/signup';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().min(1).max(100),
  avatar: z.string().url().nullable(),
})

export default defineEventHandler(async (event) => {
  const user = await requireUser(event);
  const body = await readBody(event)
  const result = signupSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "リクエストボディが不正です",
      // エラー内容をフロントに返したければ data に載せる
      data: result.error
    });
  }
  signup(user.id, result.data.name, result.data.avatar);
});
