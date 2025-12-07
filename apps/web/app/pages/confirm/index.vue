<script setup lang="ts">
  import { useAuth } from '~/composables/useAuth';
  const user = useSupabaseUser();
  const redirectInfo = useSupabaseCookieRedirect();

  const { signup } = useAuth();
  // FIXME: signup
  watch(
    user,
    () => {
      if (user.value) {
        signup({ name: user.displayName, avater: null });
        // Get redirect path, and clear it from the cookie
        const path = redirectInfo.pluck();
        // Redirect to the saved path, or fallback to home
        return navigateTo(path || '/home');
      }
    },
    { immediate: true }
  );
</script>

<template>
  <div>Waiting for login...</div>
</template>
