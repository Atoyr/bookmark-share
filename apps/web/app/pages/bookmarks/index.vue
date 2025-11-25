<script setup lang="ts">
  import { useBookmarks } from '@/composables/useBookmarks';
  import { useBreadcrumb } from '~/composables/useBreadcrumb';
  import { columns } from '@/components/bookmarks';
  import DataTable from '@/components/DataTable.vue';

  const breadcrumb = useBreadcrumb();
  breadcrumb.value = [{ label: 'Bookmarks' }];
  const { bookmarks, total } = useBookmarks();
  console.log('book', bookmarks);
</script>

<template>
  <div class="px-2">
    <p>total {{ total }}</p>
    <div class="container mx-auto py-10">
      <DataTable
        :columns="columns"
        :data="bookmarks"
      />
    </div>
  </div>
</template>
