<script setup lang="ts">
  import { useBookmarks } from '@/composables/useBookmarks';
  import { columns } from '@/components/bookmarks';
  import DataTable from '@/components/DataTable.vue';

  const { bookmarks } = useBookmarks();
  console.log('book', bookmarks);
</script>

<template>
  <div class="px-2">
    <div class="container mx-auto py-10">
      <DataTable
        :columns="columns"
        :data="bookmarks"
      />
    </div>
  </div>
</template>
