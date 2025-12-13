import { defineEventHandler } from 'h3';
import { requireUser } from '../../auth/core/helpers';
import { SpaceRepository } from '../../repositories/spaceRepository';
import { GetSpacesResponseDto } from '#shared/types/dto/spaces.dto';

export default defineEventHandler(async (event): Promise<GetSpacesResponseDto> => {
  await requireUser(event);

  const client = await getSupabaseServerClient(event);
  const spaceRepository = new SpaceRepository(client);

  const spaces = await spaceRepository.findAll().catch((err) => {
    console.error('スペース一覧取得エラー:', err);

    throw createError({
      statusCode: 500,
      statusMessage: 'スペース一覧の取得に失敗しました',
    });
  });

  return {
    total: spaces.length,
    spaces: spaces.map((space) => ({
      id: space.id,
      name: space.name,
      owner: space.ownerId,
      image: space.image,
    })),
  };
});
