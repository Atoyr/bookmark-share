<script setup lang="ts">
  const props = defineProps<{
    user?: User;
    spaces: Space[];
  }>();
</script>

<template>
  <ShadSidebar>
    <ShadSidebarHeader>
      <NavUser :user="props.user" />
    </ShadSidebarHeader>
    <ShadSidebarContent>
      <ShadSidebarGroup>
        <ShadSidebarMenu>
          <ShadSidebarMenuItem
            v-for="space in spaces"
            :key="space.id"
          >
            <ShadSidebarMenuItemButton as-child>
            <a :href='space.url'>
              <span>{{ space.name }}</span>
            </a>
            </ShadSidebarMenuItemButton>
          </ShadSidebarMenuItem>
        </ShadSidebarMenu>
      </ShadSidebarGroup>
    </ShadSidebarContent>
    <ShadSidebarFooter />
  </ShadSidebar>
</template>
