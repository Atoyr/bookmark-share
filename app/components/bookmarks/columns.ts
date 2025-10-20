import type { Bookmark } from '@/types/Bookmark';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';

export const columns: ColumnDef<Bookmark>[] = [
  {
    id: 'id',
    accessorKey: 'title',
  },
  {
    accessorKey: 'url',
  },
  {
    accessorKey: 'tags',
    cell: ({ row }) => {
      const tags = row.original.tags;
      return h(
        'div',
        { class: 'flex gap-1' },
        tags.map((tag) => h('p', { class: 'text-sm' }, tag.name))
      );
    },
  },
];
