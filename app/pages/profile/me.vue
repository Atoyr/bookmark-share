<script setup lang="ts">
  import { useBreadcrumb } from '~/composables/useBreadcrumb';

  const breadcrumb = useBreadcrumb();
  // TODO: ラベルだけ渡すと表示が黒文字のまま
  breadcrumb.value = [{ label: 'MyProfile' }];
</script>

<template>
  <h1>profile/me</h1>
</template>
