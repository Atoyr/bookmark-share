<script setup lang="ts">
  import { useBreadcrumb } from '~/composables/useBreadcrumb';

  const breadcrumb = useBreadcrumb();
  breadcrumb.value = [{ label: 'Space List', href: '/spaces' }, { label: 'space name', href: `/spaces/${'route'}` }, { label: 'Setting' }];
</script>

<template>
  <p>{{ $route.params.space_id }} setting page</p>
</template>
