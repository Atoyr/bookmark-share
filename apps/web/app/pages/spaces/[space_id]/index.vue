<script setup lang="ts">
  import { useBreadcrumb } from '~/composables/useBreadcrumb';

  const breadcrumb = useBreadcrumb();
  breadcrumb.value = [{ label: 'Space List', href: '/spaces' }, { label: 'space name' }];
</script>

<template>
  <p>{{ $route.params.space_id }}</p>
</template>
