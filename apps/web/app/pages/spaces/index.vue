<script setup lang="ts">
  import { useBreadcrumb } from '~/composables/useBreadcrumb';
  import { useSpaces } from '~/composables/useSpaces';

  const breadcrumb = useBreadcrumb();
  // TODO: ラベルだけ渡すと表示が黒文字のまま
  breadcrumb.value = [{ label: 'Space List' }];

  const { spaces, fetchSpaces} = useSpaces();
  await fetchSpaces();
</script>

<template>
  <h1>spaces list</h1>
  <template v-for="s in spaces">
    <p>{{s.name}}</p>
  </template>
</template>
