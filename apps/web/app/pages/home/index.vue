<script setup lang="ts">
  import { useBreadcrumb } from '~/composables/useBreadcrumb';
  import { useAuth } from '~/composables/useAuth';

  const breadcrumb = useBreadcrumb();
  breadcrumb.value = [{ label: 'Dashboard' }];

  const { signup } = useAuth();

  const handleSignup = () => {
    signup({name:'hoge', avater: null});
  };
</script>

<template>
  <h1>dashboard page</h1>
  <ShadButton>Click me</ShadButton>
  <ShadButton @click="handleSignup">signup</ShadButton>
</template>

