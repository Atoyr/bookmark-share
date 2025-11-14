import { defineEventHandler } from 'h3';
import { requireUser } from '../../auth/core/helpers';

export default defineEventHandler(async (event) => {
  const user = await requireUser(event);

  throw createError({
    statusCode: 404,
    statusMessage: 'space not found',
  });
});
