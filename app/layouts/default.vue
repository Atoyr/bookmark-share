<script setup lang="ts">
  import AppSidebar from '@/components/AppSidebar.vue';
</script>

<template>
  <ShadSidebarProvider>
    <AppSidebar />
    <ShadSidebarInset>
      <header class="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <ShadSidebarTrigger class="-ml-1" />
        <ShadSeparator
          orientation="vertical"
          class="mr-2 h-4"
        />
        <ShadBreadcrumb>
          <ShadBreadcrumbList>
            <ShadBreadcrumbItem class="hidden md:block">
              <ShadBreadcrumbLink href="#"> Building Your Application </ShadBreadcrumbLink>
            </ShadBreadcrumbItem>
            <ShadBreadcrumbSeparator class="hidden md:block" />
            <ShadBreadcrumbItem>
              <ShadBreadcrumbPage>Data Fetching</ShadBreadcrumbPage>
            </ShadBreadcrumbItem>
          </ShadBreadcrumbList>
        </ShadBreadcrumb>
      </header>
      <main>
        <slot />
      </main>
    </ShadSidebarInset>
  </ShadSidebarProvider>
</template>
