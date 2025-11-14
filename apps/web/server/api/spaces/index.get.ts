import { defineEventHandler } from 'h3';
import { getSpaces } from '../../usecases/getSpace';

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

  const spaces = await getSpaces();

  if (!spaces || spaces.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Spaces not found',
    });
  }

  return spaces;
});
