<script setup lang="ts" generic="TData, TValue">
  import type { ColumnDef } from '@tanstack/vue-table';
  import { FlexRender, getCoreRowModel, getPaginationRowModel, useVueTable } from '@tanstack/vue-table';

  const props = defineProps<{
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  }>();

  const table = useVueTable({
    get data() {
      return props.data;
    },
    get columns() {
      return props.columns;
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
</script>

<template>
  <div class="rounded-md border">
    <ShadTable>
      <ShadTableHeader>
        <ShadTableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <ShadTableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </ShadTableHead>
        </ShadTableRow>
      </ShadTableHeader>
      <ShadTableBody>
        <template v-if="table.getRowModel().rows?.length">
          <ShadTableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <ShadTableCell
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </ShadTableCell>
          </ShadTableRow>
        </template>
        <template v-else>
          <ShadTableRow>
            <ShadTableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              No results.
            </ShadTableCell>
          </ShadTableRow>
        </template>
      </ShadTableBody>
    </ShadTable>
  </div>
</template>
