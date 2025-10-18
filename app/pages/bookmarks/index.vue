<script setup lang="ts">
  import { useBookmarks } from '@/composables/useBookmarks';
  const { bookmarks } = useBookmarks();
  console.log('book', bookmarks);
</script>

<template>
  <div v-for="bookmark in bookmarks">
    <p>{{ bookmark.title }} | {{ bookmark.url }}</p>
  </div>
</template>
