export const useUser = () => {
  const user = useState('user', () => ({
    name: 'sample name',
    email: '',
    avatar: ''
  }))

  const setUser = (userData: { name: string; email: string; avatar: string }) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = { name: '', email: '', avatar: '' }
  }

  console.log('useUser called')

  return {
    user: readonly(user),
    setUser,
    clearUser
  }
}
