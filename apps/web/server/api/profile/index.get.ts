import { defineEventHandler } from 'h3';
import { getUser } from '../../usecases/getUser';
import { requireUser } from '../../auth/core/helpers';

export default defineEventHandler(async (event) => {
  const user = await requireUser(event);

  const profile = await getUser(user.id);

  if (profile === null) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Bookmnarks not found',
    });
  }

  return profile;
});
