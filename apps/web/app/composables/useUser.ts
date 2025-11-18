export const useUser = () => {
  const user = useState('user', () => ({
    name: 'sample name',
    avatar: '',
  }));

  const fetchProfile = async () => {
    const data = await $fetch('/api/profile/me');
    setUser({ name: data.name, avatar: data.avatar ?? '' });
  };

  const setUser = (userData: { name: string; avatar: string }) => {
    user.value = userData;
  };

  const clearUser = () => {
    user.value = { name: '', avatar: '' };
  };

  console.log('useUser called');

  return {
    fetchProfile,
    user: readonly(user),
    setUser,
    clearUser,
  };
};
