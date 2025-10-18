<script setup lang="ts">
  import { useBookmarks } from '@/composables/useBookmarks';
  import { Item } from '@/components/bookmarks';

  const { bookmarks } = useBookmarks();
  console.log('book', bookmarks);
</script>

<template>
  <div v-for="bookmark in bookmarks">
    <Item
      :title="bookmark.title"
      :url="bookmark.url"
      :key="bookmark.id"
    />
  </div>
</template>
