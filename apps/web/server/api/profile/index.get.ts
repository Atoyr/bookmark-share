import { defineEventHandler } from 'h3';
import { fetchProfile } from '../../services/profileService';
import { requireUser } from '../../auth/core/helpers';

export default defineEventHandler(async (event) => {
  const user = await requireUser(event);

  const profile = await fetchProfile(user.id);

  if (profile === null) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Bookmnarks not found',
    });
  }

  return profile;
});

