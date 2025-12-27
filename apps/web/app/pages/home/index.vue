<script setup lang="ts">
  import { useBookmarks } from '@/composables/useBookmarks';
  import { useBreadcrumb } from '~/composables/useBreadcrumb';
  import { columns } from '@/components/bookmarks';
  import DataTable from '@/components/DataTable.vue';

  import TagInput from '@/components/tag/TagInput.vue';
  import type { Tag } from '@/types/tag';

  const breadcrumb = useBreadcrumb();
  breadcrumb.value = [{ label: 'Home' }];
  const { bookmarks, total } = useBookmarks({});

  const tags = ref<Tag[]>([
    {id: "1", name:"Vue", color:"red"}, 
    {id: "2", name:"Nuxt", color:"green"}, 
  ])

  const defineTags = [
  {id: "1", name:"Vue", color:"red"},
  {id: "2", name:"Nuxt", color:"green"},
  {id: "3", name:"hoge", color:"orange"}
  ] as Tag[]

  // TODO: 実際のspace IDを取得する（例: useSpace()などのcomposableから）
  const spaceId = '1bd384c9-12be-4799-a084-85e1759ba240'
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
    <TagInput
      v-model="tags"
      :define-tags="defineTags"
      :space-id="spaceId"
      placeholder="Add tags..."
    />
    <div class="container mx-auto py-10">
      <DataTable
        :columns="columns"
        :data="bookmarks"
      />
    </div>
  </div>
</template>
