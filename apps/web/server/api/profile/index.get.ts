import { defineEventHandler } from 'h3';
import { requireUser } from '../../auth/core/helpers';

export default defineEventHandler(async (event) => {
  return { name: "hoge", avatar_url: "https://example.com/avatar.png" };

  // const profile = await getUser(user.id);

  // if (profile === null) {
  //   throw createError({
  //     statusCode: 404,
  //     statusMessage: 'Bookmnarks not found',
  //   });
  // }

  // return profile;
});
