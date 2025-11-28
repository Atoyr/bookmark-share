<script setup lang="ts">
  import { useBreadcrumb } from '~/composables/useBreadcrumb';
  import { useSpace } from '~/composables/useSpace';
  import { useBookmark } from '@/composables/useBookmark';
  import { useBookmarks } from '@/composables/useBookmarks';
  import { columns } from '@/components/bookmarks';
  import DataTable from '@/components/DataTable.vue';
  import { BookmarkForm } from '@/components/bookmark-form';
  import type { BookmarkFormModelValues } from '@/components/bookmark-form';

  const route = useRoute();

  const breadcrumb = useBreadcrumb();
  const id = route.params.space_id as string;
  const { space } = useSpace(id);
  const { bookmarks, total } = useBookmarks({space_id: id});
  const { create } = useBookmark();

  watchEffect(() => {
    breadcrumb.value = [{ label: 'Space List', href: '/spaces' }, { label: space.value?.name ?? '' }];
  });

  const formValues = ref ({
    url: "", 
    title:""
  } as BookmarkFormModelValues)

const onSubmit = (values: BookmarkFormModelValues) => {
  create(space.value!.id, values.url, values.title);
};
</script>

<template>
  <p>{{ $route.params.space_id }}</p>
  <div class="px-2">
    <BookmarkForm v-model="formValues" :onSubmit="onSubmit"/>
    <p>total {{ total }}</p>

    <div class="container mx-auto py-10">
      <DataTable
        :columns="columns"
        :data="bookmarks"
      />
    </div>
  </div>
</template>
