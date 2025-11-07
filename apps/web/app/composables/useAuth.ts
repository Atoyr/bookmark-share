// export function useAuth() {
//   const client = useSupabaseClient();
//
//   async function loginWithGoogle() {
//     console.log('Logging in with Google...');
//     const origin = window.location.origin;
//     await client.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         redirectTo: `${origin}/auth/callback`,
//       },
//     });
//   }
//
//   async function logout() {
//     await client.auth.signOut();
//   }
//
//   console.log('useAuth composable initialized');
//   return { loginWithGoogle, logout };
// }
