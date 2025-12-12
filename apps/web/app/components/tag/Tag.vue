<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import type { TagVariants } from '.';
  import { tagVariants } from './tagVariants.ts';
  import { cn } from '@/lib/utils';

  const props = defineProps<{
    id?: string;
    name: string;
    removable?: boolean;
    color?: TagVariants['color'];
    class?: HTMLAttributes['class'];
  }>();

  const emit = defineEmits<{
    (e: 'remove', id: string): void;
  }>();
</script>

<template>
  <div :class="cn(tagVariants({ color: props.color }), props.class)">
    <span class="p-1 text-xs">{{ name }}</span>
    <button
      v-if="removable"
      type="button"
      class="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-xs hover:bg-muted focus:outline-none"
      @click="$emit('remove', props.id ?? '')"
      >
      ×
    </button>
  </div>
</template>
