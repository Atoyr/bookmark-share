<script setup lang="ts">
  const defaultOpen = useCookie<boolean>('sidebar_state');
</script>

<template>
  <ShadSidebarProvider :defaultOpen="defaultOpen">
    <ShadSidebar>
      <ShadSidebarHeader>
        <ShadSidebarMenu>
          <ShadSidebarMenuItem>
            <ShadDropdownMenu>
              <ShadDropdownMenuTrigger asChild>
                  <ShadSidebarMenuButton>
                    Select Workspace
                    <ChevronDown class="ml-auto" />
                  </ShadSidebarMenuButton>
              </ShadDropdownMenuTrigger>
              <ShadDropdownMenuContent class="w-[--bits-dropdown-menu-anchor-width]">
                <ShadDropdownMenuItem>
                  <span>Acme Inc</span>
                </ShadDropdownMenuItem>
                <ShadDropdownMenuItem>
                  <span>Acme Corp.</span>
                </ShadDropdownMenuItem>
              </ShadDropdownMenuContent>
            </ShadDropdownMenu>
          </ShadSidebarMenuItem>
        </ShadSidebarMenu>
      </ShadSidebarHeader>
    </ShadSidebar>
    <slot />
  </ShadSidebarProvider>

</template>
