<script setup lang="ts">
  const props = defineProps<{
    onReset: () => void;
  }>();

  defineEmits<{
    (e: 'cancel'): void;
  }>();
</script>

<template>
  <div class="flex gap-2 pt-2">
    <ShadButton
      type="submit"
      form="form-bookmark"
    >
      Submit
    </ShadButton>
    <ShadButton
      type="button"
      variant="outline"
      @click="$emit('cancel')"
    >
      cancel
    </ShadButton>
  </div>
</template>
