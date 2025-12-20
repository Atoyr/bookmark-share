import { defineEventHandler } from 'h3';
import { requireUser } from '../../../../auth/core/helpers';
import type { GetTagsResponseDto } from '#shared/types/dto/spaces.dto';
import { TagRepository } from '~~/server/repositories/tagRepository';

// `GET /spaces/[space_id]/tags`はスペースに設定しているタグの一覧を取得する
export default defineEventHandler(async (event): Promise<GetTagsResponseDto> => {
  await requireUser(event);
  const spaceId = getRouterParam(event, 'space_id') as string;

  const client = await getSupabaseServerClient(event);
  const tagRepository = new TagRepository(client);

  const tags = await tagRepository.findBySpaceId(spaceId).catch((err) => {
    console.error('タグ取得エラー:', err);

    throw createError({
      statusCode: 500,
      statusMessage: 'タグの取得に失敗しました',
    });
  });

  if (!tags || tags.length === 0) {
    return {
      space_id: spaceId,
      tags: [],
    };
  }

  return {
    space_id: spaceId,
    tags: tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
      updated_at: tag.updatedAt ? tag.updatedAt.toISOString() : undefined,
    })),
  };
});
