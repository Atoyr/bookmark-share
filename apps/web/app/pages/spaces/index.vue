<script setup lang="ts">
  import { useBreadcrumb } from '~/composables/useBreadcrumb';

  const breadcrumb = useBreadcrumb();
  // TODO: ラベルだけ渡すと表示が黒文字のまま
  breadcrumb.value = [{ label: 'Space List' }];
</script>

<template>
  <h1>spaces list</h1>
</template>
