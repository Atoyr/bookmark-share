import { defineEventHandler } from 'h3';
import { requireUser } from '../../auth/core/helpers';
import { z } from 'zod';
import { getSupabaseServerClient } from '../../utils/getSupabaseServerClient';
import { UserRepository } from '../../repositories/userRepository';
import { getServerSupabaseClient } from '@repo/supabase/server-client';

const signupSchema = z.object({
  name: z.string().min(1).max(100),
  avatar: z.string().nullable().optional(),
});

export default defineEventHandler(async (event) => {
  // バリデーション
  const authUser = await requireUser(event);
  const body = await readBody(event).catch(() => {
    throw createError({
      statusCode: 400,
      statusMessage: 'リクエストボディが不正です',
    });
  });

  const result = signupSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'リクエストボディが不正です',
      data: result.error,
    });
  }

  // usecase
  const client = await getSupabaseServerClient(event);
  const userRepository = new UserRepository(client);

  const user = await userRepository.findByUid(authUser.id).catch((err) => {
    console.error('ユーザープロフィール取得エラー:', err);
    if (err.code == 'PGRST116') {
      throw createError({
        statusCode: 500,
        statusMessage: 'ユーザーが複数存在します',
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'プロフィール取得に失敗しました',
    });
  });

  console.log('user:', user, 'authUser.id: ', authUser.id);

  // 新規ユーザーの場合、userを作成する
  if (!user) {
    await userRepository.newUser(result.data.name, result.data.avatar ?? null);
  }
});
