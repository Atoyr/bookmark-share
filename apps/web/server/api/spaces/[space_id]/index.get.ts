import { defineEventHandler } from 'h3';
import { requireUser } from '../../../auth/core/helpers';
import { SpaceRepository } from '../../../repositories/spaceRepository';
import type { GetSpaceResponseDto } from '#shared/types/dto/spaces.dto';
import { stringToDate } from '#shared/schemas/codecs';

// `GET /spaces/[space_id]`は単一のスペース情報とそのメンバー情報を取得するエンドポイントです。
export default defineEventHandler(async (event): Promise<GetSpaceResponseDto> => {
  await requireUser(event);
  const id = getRouterParam(event, 'space_id') as string;

  const client = await getSupabaseServerClient(event);
  const spaceRepository = new SpaceRepository(client);

  const space = await spaceRepository.findById(id).catch((err) => {
    console.error('スペース取得エラー:', err);

    throw createError({
      statusCode: 500,
      statusMessage: 'スペースの取得に失敗しました',
    });
  });

  if (!space) {
    throw createError({
      statusCode: 404,
      statusMessage: 'スペースが存在しません',
    });
  }

  return {
    space: {
      id: space.id,
      name: space.name,
      owner: space.ownerId,
      image: space.image,
      users: space.members.map((member) => ({
        id: member.id,
        name: member.name,
        avatar: member.avatar,
      })),
      updated_at: stringToDate.encode(space.updatedAt!),
    },
  };
});
