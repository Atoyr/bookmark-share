import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Tag } from './Tag.vue';

export const tagVariants = cva(
  [
    'data-[state=active]:ring-ring',
    'ring-offset-background',
    'flex',
    'h-5',
    'p-0.5',
    'gap-2',
    'items-center',
    'rounded',
    'data-[state=active]:ring-2',
    'data-[state=active]:ring-offset-2',
  ],
  {
    variants: {
      color: {
        gray: 'bg-slate-200 dark:bg-slate-700 text-black dark:text-white',
        brown: 'bg-red-200 dark:bg-red-700 text-black dark:text-white',
        orange: 'bg-orange-200 dark:bg-orange-700 text-black dark:text-white',
        yellow: 'bg-yellow-200 dark:bg-yellow-700 text-black dark:text-white',
        green: 'bg-green-200 dark:bg-green-700 text-black dark:text-white',
        blue: 'bg-blue-200 dark:bg-blue-700 text-black dark:text-white',
        purple: 'bg-purple-200 dark:bg-purple-700 text-black dark:text-white',
        pink: 'bg-pink-200 dark:bg-pink-700 text-black dark:text-white',
        red: 'bg-red-200 dark:bg-red-700 text-black dark:text-white',
      },
    },
    defaultVariants: {
      color: 'gray',
    },
  }
);

export type TagVariants = VariantProps<typeof tagVariants>;
