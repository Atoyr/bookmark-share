<script setup lang="ts">
  import { useBreadcrumb } from '~/composables/useBreadcrumb';
  import { useSpace } from '~/composables/useSpace';
  import { useBookmarks } from '@/composables/useBookmarks';
  import { columns } from '@/components/bookmarks';
  import DataTable from '@/components/DataTable.vue';

  const route = useRoute();

  const breadcrumb = useBreadcrumb();
  const id = route.params.space_id as string;
  const { space } = useSpace(id);
  const { bookmarks, total } = useBookmarks({space_id: id});

  watchEffect(() => {
    breadcrumb.value = [{ label: 'Space List', href: '/spaces' }, { label: space.value?.name ?? '' }];
  });
</script>

<template>
  <p>{{ $route.params.space_id }}</p>
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
