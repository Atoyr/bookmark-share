import { z } from 'zod';
import {
  getBookmarksResponseSchema,
  postBookmarkRequestSchema,
  postBookmarkResponseSchema,
} from '../../schemas/bookmark.schema';

export type GetBookmarksResponseDto = z.infer<typeof getBookmarksResponseSchema>;

export type PostBookmarkRequestDto = z.infer<typeof postBookmarkRequestSchema>;

export type PostBookmarkResponseDto = z.infer<typeof postBookmarkResponseSchema>;
