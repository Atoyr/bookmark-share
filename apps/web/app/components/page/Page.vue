
<template>
  <div class="grid grid-cols-[auto_1fr_auto]">
    <div class="w-32 h-auto">
      <slot name="top-left" />
    </div>

    <div class="h-auto">
      <slot name="top" />
    </div>

    <div class="w-32 h-auto">
      <slot name="top-right" />
    </div>

    <div class="w-32 h-full">
      <slot name="left" />
    </div>

    <div class="h-full">
      <slot />
    </div>

    <div class="w-32 h-full">
      <slot name="right" />
    </div>
  </div>
</template>
