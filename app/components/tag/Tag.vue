<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import type { TagVariants } from '.';
  import { tagVariants } from '.';
  import { cn } from '@/lib/utils';

  const props = defineProps<{
    name: string;
    color?: TagVariants['color'];
    class?: HTMLAttributes['class'];
  }>();
</script>

<template>
  <div :class="cn(tagVariants({ color: props.color }), props.class)">
    <span class="p-1 text-xs">{{ name }}</span>
  </div>
</template>
