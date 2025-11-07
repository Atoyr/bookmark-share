<script setup lang="ts">
onMounted(() => console.log('mounted'))
  const handleLogin = () => {
    console.log('login');
  };
</script>

<template>
  <button
    variant="outline" @click="() => {
    console.log('login');
    }"
  >
  Googlelogin
  </button>
</template>
