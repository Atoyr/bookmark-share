import type { PostBookmarkRequestDto, PostBookmarkResponseDto } from '#shared/types/dto/bookmarks.dto';
import type { Bookmark } from '~/types/bookmark';

export const useBookmark = () => {
  const create = async (spaceId: string, title: string, url: string): Promise<Bookmark> => {
    const payload = {
      title: title,
      url: url,
      space_id: spaceId,
    } as PostBookmarkRequestDto;

    const response = await $fetch<PostBookmarkResponseDto>('/api/bookmarks', {
      method: 'POST',
      body: payload,
    });

    return {
      id: response.id,
      title: response.title,
      url: response.url,
      tags: [],
    } as Bookmark;
  };

  return {
    create,
  };
};
