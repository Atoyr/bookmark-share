<script setup lang="ts">
  import { useBreadcrumb } from '~/composables/useBreadcrumb';

  const breadcrumb = useBreadcrumb();
  breadcrumb.value = [{ label: 'Dashboard' }];
</script>

<template>
  <h1>dashboard page</h1>
  <ShadButton>Click me</ShadButton>
</template>
