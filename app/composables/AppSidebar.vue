<script setup lang="ts">
  import type { SidebarProps } from '@/components/ui/sidebar';

  const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: "icon",
  })

</script>

<template>
  <ShadSidebar v-bind="props">
    <ShadSidebarHeader>
      <p>foo</p>
    </ShadSidebarHeader>
    <ShadSidebarContent>
      <ShadNavMain :items="data.navMain" />
      <ShadNavProjects :projects="data.projects" />
    </ShadSidebarContent>
    <ShadSidebarFooter>
      <ShadNavUser :user="data.user" />
    </ShadSidebarFooter>
    <ShadSidebarRail />
  </ShadSidebar>
</template>
