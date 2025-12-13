import { z } from 'zod';
import {
  getSpaceResponseSchema,
  getSpacesResponseSchema,
  getTagsResponseSchema,
  postTagsRequestSchema,
  postTagsResponseSchema,
} from '#shared/schemas/spaces';

/**
 * Get Space Data Transfer Object
 * GET `/api/spaces/[space_id]`
 */
export type GetSpaceResponseDto = z.infer<typeof getSpaceResponseSchema>;

/**
 * Get Spaces Data Transfer Object
 * GET `/api/spaces`
 */
export type GetSpacesResponseDto = z.infer<typeof getSpacesResponseSchema>;

/**
 * Get Tags definition Transfer Object
 * GET `/api/spaces/[space_id]/tags`
 */
export type GetTagsResponseDto = z.infer<typeof getTagsResponseSchema>;

/**
 * Post Request Tags definition Transfer Object
 * POST `/api/spaces/[space_id]/tags`
 */
export type PostTagsRequestDto = z.infer<typeof postTagsRequestSchema>;

/**
 * Post Response Tags definition Transfer Object
 * POST `/api/spaces/[space_id]/tags`
 */
export type PostTagsResponseDto = z.infer<typeof postTagsResponseSchema>;
