<script setup lang="ts">
  import { ArrowUpRight, Link, MoreHorizontal, StarOff, Trash2 } from 'lucide-vue-next';
  const props = defineProps<{
    spaces: Space[];
  }>();
</script>

<template>
  <ShadSidebarGroup>
    <ShadSidebarGroupLabel> Private </ShadSidebarGroupLabel>
    <ShadSidebarMenu>
      <ShadSidebarMenuItem
        v-for="space in spaces"
        :key="space.id"
      >
        <ShadSidebarMenuButton as-child>
          <NuxtLink :to="space.url">
            <span>{{ space.name }}</span>
          </NuxtLink>
        </ShadSidebarMenuButton>
        <ShadDropdownMenu>
          <ShadDropdownMenuTrigger as-child>
            <ShadSidebarMenuAction show-on-hover>
              <MoreHorizontal />
              <span class="sr-only">More</span>
            </ShadSidebarMenuAction>
          </ShadDropdownMenuTrigger>
          <ShadDropdownMenuContent
            class="w-56 rounded-lg"
            :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'"
          >
            <ShadDropdownMenuItem>
              <StarOff class="text-muted-foreground" />
              <span>Remove from Favorites</span>
            </ShadDropdownMenuItem>
            <ShadDropdownMenuSeparator />
            <ShadDropdownMenuItem>
              <Link class="text-muted-foreground" />
              <span>Copy Link</span>
            </ShadDropdownMenuItem>
          </ShadDropdownMenuContent>
        </ShadDropdownMenu>
      </ShadSidebarMenuItem>
    </ShadSidebarMenu>
  </ShadSidebarGroup>
</template>
