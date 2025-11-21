<script setup lang="ts">
  import { AppSidebar } from '@/components/app-sidebar';
  import { useBreadcrumb } from '~/composables/useBreadcrumb';

  import { useProfile } from '~/composables/useProfile';
  import { useSpaces } from '~/composables/useSpaces';
  const breadcrumb = useBreadcrumb();

  const { me } = useProfile();
  const { spaces } = useSpaces();

</script>

<template>
  <ShadSidebarProvider>
    <AppSidebar :user="me" :spaces="spaces"/>
    <ShadSidebarInset>
      <header class="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <ShadSidebarTrigger class="-ml-1" />
        <ShadSeparator
          orientation="vertical"
          class="mr-2 h-4"
        />
        <ShadBreadcrumb>
          <ShadBreadcrumbList>
            <template
              v-for="(item, index) in breadcrumb"
              :key="index"
            >
              <ShadBreadcrumbItem :class="{ 'hidden md:block': index < breadcrumb.length - 1 }">
                <template v-if="item.href">
                  <ShadBreadcrumbLink :href="item.href" :class="{ 'hidden md:block': index < breadcrumb.length - 1 }">
                    {{ item.label }}
                  </ShadBreadcrumbLink>
                </template>
                <template v-else>
                  <ShadBreadcrumbPage :class="{ 'hidden md:block': index < breadcrumb.length - 1 }">
                    {{ item.label }}
                  </ShadBreadcrumbPage>
                </template>
              </ShadBreadcrumbItem>

              <ShadBreadcrumbSeparator
                v-if="index < breadcrumb.length - 1"
                class="hidden md:block"
              />
            </template>
          </ShadBreadcrumbList>
        </ShadBreadcrumb>
      </header>
      <main>
        <slot />
      </main>
    </ShadSidebarInset>
  </ShadSidebarProvider>
</template>
