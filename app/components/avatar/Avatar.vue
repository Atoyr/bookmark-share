<script setup lang="ts">
  import { AvatarRoot, AvatarImage, AvatarFallback } from 'reka-ui';
  import { cn } from '@/lib/utils';
  import { avatarRootVariants, avatarFallbackVariants } from './avatarVariants.ts';

  const props = defineProps<{
    src?: string;
    size?: avatarRootVariants['size'];
    crossOrigin?: string;
    referrerPolicy?: string;
    delayMs?: number;
    fallback?: string;
    fallbackColor?: avatarFallbackVariants['color'];
  }>();

</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :class="cn(avatarRootVariants({ size: props.size }))"
  >
  <AvatarImage
    v-if="props.src"
    data-slot="avatar-image"
    :src="props.src"
    :cross-origin="props.crossOrigin"
    :referrer-policy="props.referrerPolicy"
    class="aspect-square size-full"
  />

  <AvatarFallback
    data-slot="avatar-fallback"
    :delay-ms="props.delayMs"
    :class="cn(avatarFallbackVariants({ fallbackColor: props.fallbackColor, size: props.size }))"
  >
    <span v-if="props.fallback">{{ props.fallback }}</span>
    <slot />
  </AvatarFallback>
  </AvatarRoot>
</template>
