<script setup lang="ts">
  import { useAuth } from '@/composables/useAuth';
  const { loginWithGoogle } = useAuth();
  const login = () => {
    console.log('login');
    loginWithGoogle();
  };
</script>

<template>
  <ShadButton @click="login">Googleでログイン</ShadButton>
</template>
