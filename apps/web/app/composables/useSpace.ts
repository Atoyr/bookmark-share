import { computed, unref, type MaybeRef } from 'vue';
import type { SpaceDetail } from '~/types/spaceDetail';
import type { GetSpaceDto } from '#shared/types/dto/spaces.dto';

export function useSpace(spaceId: string) {
  console.log('useSpace called with spaceId:', spaceId);
  const route = useRoute();
  const id = computed(() => {
    const v = spaceId ? unref(spaceId) : (route.params.space_id as string);
    return String(v ?? '');
  });

  const { data, status, error, refresh } = useFetch<GetSpaceDto>(`/api/spaces/${id.value}`, { watch: [id] });

  const space = computed<SpaceDetail | null>(() => {
    console.log('data.value', data.value);
    if (!data?.value) {
      return null;
    }

    return {
      id: id.value,
      name: data.value.space.name,
      owner: data.value.space.owner,
      image: '',
      url: '',
    } as SpaceDetail;
  });

  const pending = computed<Boolean>(() => fetchIsPending(status.value));

  return { 
    id: readonly(id), 
    space: readonly(space), 
    pending: readonly(pending), 
    error: readonly(error), 

    refresh 
  };
}
