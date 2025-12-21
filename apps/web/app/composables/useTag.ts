import type { PostTagRequestDto, PostTagResponseDto } from '#shared/types/dto/tags.dto';

export const useTag = () => {
  const updateTag = async (tagId: string, requestData: PostTagRequestDto): Promise<PostTagResponseDto> => {
    const result = await $fetch<PostTagResponseDto>(`/api/tags/${tagId}`, {
      method: 'POST',
      body: requestData,
    });

    return result;
  };

  return {
    updateTag,
  };
};
