<script setup lang="ts">
  import { Check, ChevronsUpDown, GalleryVerticalEnd } from 'lucide-vue-next';
  import { useUser } from '@/composables/useUser';

  const { user } = useUser();
</script>

<template>
  <ShadSidebarMenu>
    <ShadSidebarMenuItem>
      <ShadDropdownMenu>
        <ShadDropdownMenuTrigger as-child>
          <ShadSidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <!-- TODO: アバター -->
            <Avatar fallback="CN" />
            <div class="flex flex-col gap-0.5 leading-none">
              <span class="font-semibold">{{user.name}}</span>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </ShadSidebarMenuButton>
        </ShadDropdownMenuTrigger>
        <ShadDropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width]"
          align="start"
        >
          <!-- TODO: クリックしたときのメニュー -->
          <ShadDropdownMenuItem
            v-for="version in versions"
            :key="version"
            @select="selectedVersion = version"
          >
            v{{ version }}
            <Check
              v-if="version === selectedVersion"
              class="ml-auto"
            />
          </ShadDropdownMenuItem>
        </ShadDropdownMenuContent>
      </ShadDropdownMenu>
    </ShadSidebarMenuItem>
  </ShadSidebarMenu>
</template>
