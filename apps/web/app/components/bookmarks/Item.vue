<script setup lang="ts">
  const props = defineProps<{
    title: string;
    url: string;
    description?: string;
  }>();
</script>

<template>
  <div class="rounded-lg border p-4 transition-shadow hover:shadow-md">
    <a
      :href="props.url"
      target="_blank"
      rel="noopener noreferrer"
      class="text-lg font-semibold text-blue-600 hover:underline"
    >
      {{ props.title }}
    </a>
    <p
      v-if="props.description"
      class="mt-2 text-gray-600"
    >
      {{ props.description }}
    </p>
  </div>
</template>
