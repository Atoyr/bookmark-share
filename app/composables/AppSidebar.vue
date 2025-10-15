<script setup lang="ts">
  import type { SidebarProps } from '@/components/ui/sidebar';

  const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: "icon",
  })

</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <p>foo</p>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
