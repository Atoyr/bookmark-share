import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Avatar } from './Avatar.vue';

export const avatarRootVariants = cva(['relative', 'flex', 'shrink-0', 'overflow-hidden'], {
  variants: {
    size: {
      small: ['size-6', 'rounded-sm'],
      medium: ['size-8', 'rounded-md'],
      large: ['size-12', 'rounded-lg'],
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export const avatarFallbackVariants = cva(['bg-muted', 'flex', 'size-full', 'items-center', 'justify-center'], {
  variants: {
    size: {
      small: ['text-xs'],
      medium: ['text-sm'],
      large: ['text-lg'],
    },
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
});

export type AvatarRootVariants = VariantProps<typeof avatarRootVariants>;
export type AvatarFallbackVariants = VariantProps<typeof avatarFallbackVariants>;
