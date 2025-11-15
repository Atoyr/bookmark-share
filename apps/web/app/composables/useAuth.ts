export function useAuth() {
  const client = useSupabaseClient();

  async function loginWithGoogle() {
    console.log('Logging in with Google...');
    const origin = window.location.origin;
    await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/confirm`,
      },
    });
  }

  async function signup(payload: { name: string; avatar: string | null }) {
    await $fetch('/api/auth/upsert-user', {
      method: 'POST',
      body: payload,
    });
  }

  async function logout() {
    await client.auth.signOut();
  }

  return { loginWithGoogle, signup, logout };
}
