import { defineEventHandler } from 'h3';
import { requireUser } from '../../auth/core/helpers';
import { BookmarkRepository } from '../../repositories/bookmarkRepository';
import type { PostBookmarkResponseDto } from '#shared/types/dto/bookmarks.dto';
import { postBookmarkRequestSchema } from '#shared/schemas/bookmarks';

export default defineEventHandler(async (event): Promise<PostBookmarkResponseDto> => {
  await requireUser(event);

  const body = await readBody(event);
  const result = postBookmarkRequestSchema.safeParse(body);

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

  const request = result.data;

  const client = await getSupabaseServerClient(event);
  const bookmarkRepository = new BookmarkRepository(client);

  const newBookmark = await bookmarkRepository.newBookmark({
    spaceId: request.space_id,
    title: request.title,
    url: request.url,
    tags: [],
  });

  return {
    id: newBookmark.id,
    title: newBookmark.title,
    url: newBookmark.url,
    tags: [],
    created_at: newBookmark.createdAt!,
    updated_at: newBookmark.updatedAt!,
  };
});
