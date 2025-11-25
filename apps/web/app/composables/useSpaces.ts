import type { GetSpacesDto } from '#shared/types/dto/spaces.dto';
import type { Space } from '~/types/space';

export const useSpaces = () => {
  const { data, status, error, refresh } = useFetch<GetSpacesDto>('/api/spaces', {
    watch: false,
  });
  const spaces = computed<Space[]>(() => {
    if (data?.value == null) {
      return [];
    }

    return data.value.spaces.map((space) => ({
      id: space.id,
      name: space.name,
      owner: space.owner,
      image: space.image,
      url: `/spaces/${space.id}`,
    }));
  });

  const pending = computed<Boolean>(() => fetchIsPending(status.value));
  const count = computed<number>(() => {
    if (data?.value == null) {
      return 0;
    }
    return data.value.count;
  });

  return {
    spaces: readonly(spaces),
    count: readonly(count),
    pending: readonly(pending),
    error: readonly(error),

    refresh,
  };
};
