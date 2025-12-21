// tag_idを元にtagを更新するAPIハンドラ
import { defineEventHandler } from 'h3';
import { requireUser } from '../../auth/core/helpers';
import type { PostTagResponseDto } from '#shared/types/dto/tags.dto';
import { postTagRequestSchema } from '#shared/schemas/tags';
import { TagRepository } from '~~/server/repositories/tagRepository';

// `POST /tags/[tag_id]`はタグを更新する
export default defineEventHandler(async (event): Promise<PostTagResponseDto> => {
  await requireUser(event);

  const body = await readBody(event);
  const result = postTagRequestSchema.safeParse(body);

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

  const tagId = getRouterParam(event, 'tag_id') as string;

  const client = await getSupabaseServerClient(event);
  const tagRepository = new TagRepository(client);

  const tag = await tagRepository
    .updateTag(tagId, {
      name: result.data.name,
      color: result.data.color,
    })
    .catch((err) => {
      console.error('タグ更新エラー:', err);

      throw createError({
        statusCode: 500,
        statusMessage: 'タグの更新に失敗しました',
      });
    });

  return tag;
});
