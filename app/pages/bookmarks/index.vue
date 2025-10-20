<script setup lang="ts">
  import { useBookmarks } from '@/composables/useBookmarks';
  import { columns } from '@/components/bookmarks';
  import DataTable from '@/components/DataTable.vue'

  const { bookmarks } = useBookmarks();
  console.log('book', bookmarks);
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="bookmarks" />
  </div>
</template>
