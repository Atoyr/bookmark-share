<script setup lang="ts">
  import { useBreadcrumb } from '~/composables/useBreadcrumb';

  const breadcrumb = useBreadcrumb();
  // TODO: ラベルだけ渡すと表示が黒文字のまま
  breadcrumb.value = [{ label: 'Profile' }, { label: 'User' }];
</script>

<template>
  <p>{{ $route.params.user_id }} profile</p>
</template>
