<script setup lang="ts">
  import { useAuth } from '@/composables/useAuth';
  const { loginWithGoogle } = useAuth();
  const handleLogin = () => {
    loginWithGoogle();
  };
</script>

<template>
  <ShadButton @click="handleLogin">Googleでログイン</ShadButton>
</template>
