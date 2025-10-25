<script setup lang="ts">
  import { useBreadcrumb } from '~/composables/useBreadcrumb';

  const breadcrumb = useBreadcrumb();
  breadcrumb.value = [
  { label: 'Bookmarks', href: '/bookmarks' }, 
  { label: 'name'}, 
  ];
</script>

<template>
  <div>
  <p>{{ $route.params.bookmark_id }}</p>
  </div>
</template>
