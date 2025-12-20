import { defineEventHandler } from 'h3';
import { requireUser } from '../../../../auth/core/helpers';
import type { PostTagsResponseDto } from '#shared/types/dto/spaces.dto';
import { TagRepository } from '~~/server/repositories/tagRepository';
import { postTagsRequestSchema } from '~~/shared/schemas/spaces';

// `POST /spaces/[space_id]/tags`はスペースにタグを設定する
export default defineEventHandler(async (event): Promise<PostTagsResponseDto> => {
  await requireUser(event);

  const body = await readBody(event);
  const result = postTagsRequestSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'リクエストボディが不正です',
      data: {
        name: 'ZodError',
        issues: result.error.issues,
      },
    });
  }

  const spaceId = getRouterParam(event, 'space_id') as string;

  const client = await getSupabaseServerClient(event);
  const tagRepository = new TagRepository(client);

  const tags = await tagRepository
    .newTagDefinitions(
      result.data.tags.map((tag) => ({
        name: tag.name,
        color: '',
      })), 
      spaceId
    )
    .catch((err) => {
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
    tags: tags,
  };
});
