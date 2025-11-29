import type { UserDto } from '#shared/types/dto/user.dto';
import type { User } from '~/types/user';
import fetchIsPending from '~/utils/fetchIsPending';

export const useProfile = () => {
  const { data, status, error, refresh } = useFetch<UserDto>('/api/profile/me');
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
    } as UserDto;

    const res = await $fetch<UserDto>('/api/profile/me', {
      method: 'POST',
      body: payload,
    });

    data.value.name = res.name;
    data.value.avatar = res.avatar;
  };

  return {
    me: readonly(me),
    pending: readonly(pending),
    error: readonly(error),

    update,
    refresh,
  };
};
