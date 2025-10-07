<script setup lang="ts">

  import BookmarkGroupButton from './BookmarkGroupButton.vue';

  const route = useRoute();

  // When accessing /posts/1, route.params.id will be 1
  console.log(route.params.id);
</script>

<template>
  <div class="size-full bg-blue-500">
    <div>id is {{ $route.params.id }}</div>
    <BookmarkGroupButton />
  </div>
</template>
