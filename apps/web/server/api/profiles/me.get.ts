import { defineEventHandler } from 'h3';
import { requireUser } from '../../auth/core/helpers';
import { UserRepository } from '../../repositories/userRepository';
import type { GetMeResponseDto } from '#shared/types/dto/profiles.dto';
import { stringToDate } from '#shared/schemas/codecs';

export default defineEventHandler(async (event): Promise<GetMeResponseDto> => {
  const authUser = await requireUser(event);

  const client = await getSupabaseServerClient(event);
  const userRepository = new UserRepository(client);

  const user = await userRepository.findById(authUser.id).catch((err) => {
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

  if (user === null) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ユーザーが存在しません',
    });
  }

  return {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    created_at: stringToDate.encode(user.createdAt!),
    updated_at: stringToDate.encode(user.updatedAt!),
  };
});
