import { defineEventHandler } from 'h3';
import { fetchBookmarks } from '../../usecases/bookmarkService';
import { requireUser } from '../../auth/core/helpers';

export default defineEventHandler(async (event) => {
  const user = await requireUser(event);
  console.log('Authenticated user:', user);

  const bookmnarks = await fetchBookmarks();

  if (!bookmnarks || bookmnarks.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Bookmnarks not found',
    });
  }

  return bookmnarks;
});
