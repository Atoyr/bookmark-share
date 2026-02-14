<script setup lang="ts">
  import { useBookmarks } from '@/composables/useBookmarks';
  import { useBreadcrumb } from '~/composables/useBreadcrumb';
  import { columns } from '@/components/bookmarks';
  import DataTable from '@/components/DataTable.vue';
  import { Page } from '@/components/page';

  const breadcrumb = useBreadcrumb();
  breadcrumb.value = [{ label: 'Bookmarks' }];
  const { bookmarks, total, pending } = useBookmarks();
</script>

<template>
  <Page>
    <template #top>
      <h1 class="py-8 text-4xl font-bold">ブックマーク</h1>
    </template>
    <div class="flex flex-col">
      <div class="container mx-auto py-2">
        <DataTable
          :columns="columns"
          :data="bookmarks"
        />
        <p class="mt-2 text-sm text-muted-foreground">{{ total }} 件</p>
      </div>
    </div>
  </Page>
</template>
