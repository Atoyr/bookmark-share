import { defineEventHandler } from 'h3';
import { getSpaces } from '../../usecases/getSpace';

export default defineEventHandler(async (event) => {
  const spaceId = getRouterParam(event, 'space_id');

  throw createError({
    statusCode: 404,
    statusMessage: 'Spaces not found',
  });
});
