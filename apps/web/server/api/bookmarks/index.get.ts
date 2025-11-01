import { defineEventHandler } from 'h3';
import { fetchBookmarks } from '../../services/bookmarkService';

export default defineEventHandler(async (event) => {
  // FIXME: 認証チェック
  // const userId = event.context.auth?.userId;
  //
  // if (!userId) {
  //   throw createError({
  //     statusCode: 401,
  //     statusMessage: 'Unauthorized'
  //   });
  // }

  const bookmnarks = await fetchBookmarks();

  if (!bookmnarks || bookmnarks.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Bookmnarks not found',
    });
  }

  return bookmnarks;
});
