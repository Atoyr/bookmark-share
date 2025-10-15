<template>
  <ShadSidebarGroup>
    <ShadSidebarGroupLabel>Platform</ShadSidebarGroupLabel>
    <ShadSidebarMenu>
      <ShadCollapsible
        v-for="item in items"
        :key="item.title"
        as-child
        :default-open="item.isActive"
        class="group/collapsible"
      >
        <ShadSidebarMenuItem>
          <ShadCollapsibleTrigger as-child>
            <ShadSidebarMenuButton :tooltip="item.title">
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
              <ShadChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </ShadSidebarMenuButton>
          </ShadCollapsibleTrigger>
          <ShadCollapsibleContent>
            <ShadSidebarMenuSub>
              <ShadSidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                <ShadSidebarMenuSubButton as-child>
                  <a :href="subItem.url">
                    <span>{{ subItem.title }}</span>
                  </a>
                </ShadSidebarMenuSubButton>
              </ShadSidebarMenuSubItem>
            </ShadSidebarMenuSub>
          </ShadCollapsibleContent>
        </ShadSidebarMenuItem>
      </ShadCollapsible>
    </ShadSidebarMenu>
  </ShadSidebarGroup>
</template>
