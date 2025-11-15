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

  throw createError({
    statusCode: 404,
    statusMessage: 'Spaces not found',
  });
});
