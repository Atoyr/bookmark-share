import { defineEventHandler } from 'h3';
import { fetchSpaces } from '../../services/spaceService';

export default defineEventHandler(async (event) => {
  const spaceId = getRouterParam(event, 'space_id');

  const spaces = await fetchSpaces();

  if (!spaces || spaces.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Spaces not found',
    });
  }

  return spaces;
});

