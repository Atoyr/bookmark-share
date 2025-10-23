<script setup lang="ts">
  import { AvatarRoot, AvatarImage, AvatarFallback } from 'reka-ui';
  import { cn } from '@/lib/utils';
  import { avatarRootVariants, avatarFallbackVariants } from '.';

  const props = defineProps<{
    src: string;
    size: avatarRootVariants['size'];
    crossOrigin?: string;
    referrerPolicy?: string;
    delayMs: number;
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
    data-slot="avatar-image"
    :src="props.src"
    :crossOrigin="props.crossOrigin ?? ''"
    :referrerPolicy="props.referrerPolicy ?? ''"
    class="aspect-square size-full"
  />

  <AvatarFallback
    data-slot="avatar-fallback"
    :delayMs="props.delayMs"
    :class="cn(avatarFallbackVariants({ faollbackColor: props.fallbackColor, size: props.size }))"
  >
    <span v-if="props.fallback">{{ props.fallback }}</span>
    <slot />
  </AvatarFallback>
  </AvatarRoot>
</template>

<!--
<template>
  <ShadAvater
    class="bg-blackA3 inline-flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-md border align-middle select-none dark:border-stone-700"
  >
    <ShadAvatarFallback
      class="text-grass11 flex h-full w-full items-center justify-center bg-white text-sm leading-1 font-medium dark:bg-stone-800 dark:text-stone-300"
    >
      {{ fallback }}
    </ShadAvatarFallback>
  </ShadAvater>
</template>
-->
