<script setup lang="ts">

  console.log("callback auth token")
  const client = useSupabaseClient();
  console.log("use supabase client", client)

  const route = useRoute();
  const next = (route.query.next as string) ?? '/';

  onMounted(async () => {
    console.log("callback auth token")
    // PKCE/Code exchange（URLに?code=... が付いているときにセッション確立）
    const { data, error } = await client.auth.exchangeCodeForSession(window.location.href);
    if (error) {
      console.error(error);
      return navigateTo('/login');
    }
    // セッションが取れたら任意の場所へ
    await navigateTo(next);
  });
</script>

<template>
  <p>Signing you in...</p>
</template>
