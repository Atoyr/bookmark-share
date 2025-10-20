<script setup lang="ts">
  import type { BadgeVariants } from '@/components/ui/badge';
  const props = defineProps<{
    name: string;
    color?: string;
    variant?: {
      type: BadgeVariants;
      default: 'default';
    };
  }>();
</script>

<template>
  <ShadBadge :variant="props.variant">{{ name }}</ShadBadge>
</template>
