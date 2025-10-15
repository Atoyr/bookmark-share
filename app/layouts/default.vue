<script setup lang="ts">
  const defaultOpen = useCookie<boolean>('sidebar_state');
</script>

<template>
  <SidebarProvider :defaultOpen="defaultOpen">
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    Select Workspace
                    <ChevronDown class="ml-auto" />
                  </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-[--bits-dropdown-menu-anchor-width]">
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Acme Corp.</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </Sidebar>
    <slot />
  </SidebarProvider>

</template>
