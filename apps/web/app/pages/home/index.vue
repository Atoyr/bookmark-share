<script setup lang="ts">
  import { useBookmarks } from '@/composables/useBookmarks';
  import { useBreadcrumb } from '~/composables/useBreadcrumb';
  import { columns } from '@/components/bookmarks';
  import DataTable from '@/components/DataTable.vue';

  const breadcrumb = useBreadcrumb();
  breadcrumb.value = [{ label: 'Home' }];
  const { bookmarks, total } = useBookmarks({ });
</script>

<template>
  <div class="min-h-screen px-2">
    <div class="flex items-center justify-center px-4 pt-16">
      <div class="text-center">
        <h1 class="text-3xl font-light tracking-wide text-gray-800 md:text-4xl lg:text-5xl">
          夜更かしの方、こんばんは
        </h1>
      </div>
    </div>
    <div class="container mx-auto py-10">
      <DataTable
        :columns="columns"
        :data="bookmarks"
      />
    </div>
  </div>
</template>
