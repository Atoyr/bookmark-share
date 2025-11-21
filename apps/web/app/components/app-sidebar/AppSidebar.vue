<script setup lang="ts">
  import { Home } from 'lucide-vue-next';
  import NavUser from './NavUser.vue';
  import NavPrivateSpace from './NavPrivateSpace.vue';
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
          <ShadSidebarMenuItem>
            <ShadSidebarMenuButton as-child>
              <NuxtLink to="/home">
                <component :is="Home" />
                <span>HOME</span>
              </NuxtLink>
            </ShadSidebarMenuButton>
          </ShadSidebarMenuItem>
        </ShadSidebarMenu>
      </ShadSidebarGroup>
      <!-- Private -->
      <NavPrivateSpace :spaces="props.spaces" />
    </ShadSidebarContent>
    <ShadSidebarFooter />
  </ShadSidebar>
</template>
