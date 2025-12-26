import type { Bookmark } from '@/types/Bookmark';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import { default as TagItem } from '@/components/tag/TagItem.vue';
import { ExternalLink } from 'lucide-vue-next';

export const columns: ColumnDef<Bookmark>[] = [
  {
    id: 'id',
    accessorKey: 'title',
    cell: ({ row }) => {
      const title = row.original.title;
      const url = row.original.url;
      return h('div', { class: 'flex items-center gap-2' }, [
        h('span', { class: 'flex-auto' }, title),
        h(
          'a',
          {
            href: url,
            target: '_blank',
            rel: 'noopener noreferrer',
            class: 'text-primary hover:text-primary/80 flex-none',
          },
          [h(ExternalLink, { class: 'h-4 w-4' })]
        ),
      ]);
    },
  },
  {
    accessorKey: 'tags',
    cell: ({ row }) => {
      const tags = row.original.tags;
      return h(
        'div',
        { class: 'flex gap-1' },
        tags.map((tag) => h(TagItem, { name: tag.name, color: tag.color }))
      );
    },
  },
];
