import { z } from 'zod';
import {
  getBookmarksResponseSchema,
  postBookmarkRequestSchema,
  postBookmarkResponseSchema,
} from '#shared/schemas/bookmarks';

/**
 * Get Bookmarks Data
 * GET `/api/bookmarks/`
 */
export type GetBookmarksResponseDto = z.infer<typeof getBookmarksResponseSchema>;

/**
 * Post bookmark Request Data
 * POST `/api/bookmarks/`
 */
export type PostBookmarkRequestDto = z.infer<typeof postBookmarkRequestSchema>;

/**
 * Post bookmark Response Data
 * POST `/api/bookmarks/`
 */
export type PostBookmarkResponseDto = z.infer<typeof postBookmarkResponseSchema>;
