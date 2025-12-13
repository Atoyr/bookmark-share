import { defineEventHandler } from 'h3';
import { requireUser } from '../../auth/core/helpers';
import { BookmarkRepository } from '../../repositories/bookmarkRepository';
import { getRange } from '../../utils/getRange';
import type { Bookmark } from '../../types/bookmark';
import type { GetBookmarksResponseDto } from '#shared/types/dto/bookmarks.dto';

export default defineEventHandler(async (event): Promise<GetBookmarksResponseDto> => {
  const user = await requireUser(event);
  const query = getQuery(event);
  console.log('Authenticated user:', user);

  const spaceId = query.space_id as string | undefined;
  const page = query.page ? parseInt(query.page as string, 10) : undefined;
  const pageSize = query.pageSize ? parseInt(query.page as string, 10) : undefined;

  const range = page && pageSize ? getRange(page, pageSize) : undefined;

  const client = await getSupabaseServerClient(event);
  const bookmarkRepository = new BookmarkRepository(client);

  const bookmarks = [] as Bookmark[];
  let total = 0;

  if (spaceId) {
    const { bookmarks: bs, total: t } = await bookmarkRepository.findBySpaceId(spaceId!, range).catch((err) => {
      console.error('ブックマーク 取得エラー:', err, 'space_id', spaceId);

      throw createError({
        statusCode: 500,
        statusMessage: 'ブックマークの取得に失敗しました',
        data: { spaceId },
      });
    });
    bookmarks.push(...bs);
    total = t;
  } else {
    const { bookmarks: bs, total: t } = await bookmarkRepository.findAll(range).catch((err) => {
      console.error('ブックマーク 取得エラー:', err);

      throw createError({
        statusCode: 500,
        statusMessage: 'ブックマークの取得に失敗しました',
      });
    });
    bookmarks.push(...bs);
    total = t;
  }

  return {
    bookmarks: bookmarks.map((b) => ({
      id: b.id,
      title: b.title,
      url: b.url,
      tags: b.tags,
    })),
    total: total,
    page: page ?? 0,
    pageSize: pageSize ?? 0,
  };
});
