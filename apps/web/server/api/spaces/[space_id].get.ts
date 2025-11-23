import { defineEventHandler } from 'h3';
import { requireUser } from '../../auth/core/helpers';
import { SpaceRepository } from '../../repositories/spaceRepository';
import { getSpaces } from '../../usecases/getSpace';

export default defineEventHandler(async (event): Promise<GetSpaceDto> => {
  await requireUser(event);
const id = getRouterParam(event, 'space_id') as string

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
        updatedAt: member.updatedAt,
      }))
    }
  }
});
