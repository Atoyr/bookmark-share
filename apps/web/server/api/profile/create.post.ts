import { defineEventHandler } from 'h3';
import { requireUser } from '../../auth/core/helpers';

export default defineEventHandler(async (event) => {
  // FIXME: space 作成ロジック未実装
  const user = await requireUser(event);
  console.log('Authenticated user:', user);

  throw createError({
    statusCode: 404,
    statusMessage: 'space not found',
  });
});


