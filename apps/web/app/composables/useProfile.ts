import type { GetMeResponseDto, PostMeRequestDto, PostMeResponseDto } from '#shared/types/dto/profiles.dto';
import type { User } from '~/types/user';
import fetchIsPending from '~/utils/fetchIsPending';

export const useProfile = () => {
  const { data, status, error, refresh } = useFetch<GetMeResponseDto>('/api/profiles/me');
  const me = computed<User | null>(() => {
    return data.value ? ({ name: data.value.name, avatar: data.value.avatar ?? '' } as User) : null;
  });
  const pending = computed<Boolean>(() => fetchIsPending(status.value));

  const update = async (user: User) => {
    if (data.value == null) {
      throw new Error('No user data available');
    }
    const payload = {
      id: data.value.id,
      name: user.name,
      avatar: user.avatar,
      updated_at: data.value.updated_at,
    } as PostMeRequestDto;

    const res = await $fetch<PostMeResponseDto>('/api/profile/me', {
      method: 'POST',
      body: payload,
    });

    data.value.name = res.name;
    data.value.avatar = res.avatar;
    data.value.updated_at = res.updated_at;
  };

  return {
    me: readonly(me),
    pending: readonly(pending),
    error: readonly(error),

    update,
    refresh,
  };
};
