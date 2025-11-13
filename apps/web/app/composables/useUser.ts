export const useUser = () => {
  const user = useState('user', () => ({
    name: 'sample name',
    email: '',
    avatar: ''
  }))

  const fetchProfile = async () => {
    const data = await $fetch('/api/profile');
    setUser({name: data.name, email: data.email, avatar: data.avatar});
  }

  const setUser = (userData: { name: string; email: string; avatar: string }) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = { name: '', email: '', avatar: '' }
  }

  console.log('useUser called')

  return {
    fetchProfile,
    user: readonly(user),
    setUser,
    clearUser
  }
}
