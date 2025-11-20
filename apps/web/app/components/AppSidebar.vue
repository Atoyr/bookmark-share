<script setup lang="ts">

  const props = defineProps<{
    user: User, 
    spaces: Space[], 
  }>();
</script>

<template>
  <ShadSidebar>
    <ShadSidebarHeader>
      <NavUser :user="props.user"/>
    </ShadSidebarHeader>
    <ShadSidebarContent>
      <ShadSidebarGroup />
    </ShadSidebarContent>
    <ShadSidebarFooter />
  </ShadSidebar>
</template>
