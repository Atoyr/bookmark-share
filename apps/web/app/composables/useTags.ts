import type { GetTagsResponseDto, PostTagsRequestDto, PostTagsResponseDto } from '#shared/types/dto/spaces.dto';
import type { Tag } from '~/types/tag';
import fetchIsPending from '~/utils/fetchIsPending';

export const useTags = (spaceId: string) => {
  const { data, status, error, refresh } = useFetch<GetTagsResponseDto>(`/api/spaces/${spaceId}/tags`, {
    watch: false,
  });

  const tags = computed<Tag[]>(() => {
    if (data?.value == null) {
      return [];
    }

    return data.value.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    }));
  });

  const pending = computed<Boolean>(() => fetchIsPending(status.value));

  const createTags = async (requestData: PostTagsRequestDto): Promise<PostTagsResponseDto> => {
    const result = await $fetch<PostTagsResponseDto>(`/api/spaces/${spaceId}/tags`, {
      method: 'POST',
      body: requestData,
    });

    await refresh();
    return result;
  };

  return {
    tags: readonly(tags),
    pending: readonly(pending),
    error: readonly(error),

    refresh,
    createTags,
  };
};
