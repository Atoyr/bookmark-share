import { z } from 'zod';
import { getSpaceResponseSchema, getSpacesResponseSchema } from '#shared/schemas/spaces';

/**
 * Get Space Data Transfer Object
 * GET `/api/spaces/:id`
 */
export type GetSpaceResponseDto = z.infer<typeof getSpaceResponseSchema>;

/**
 * Get Spaces Data Transfer Object
 * GET `/api/spaces`
 */
export type GetSpacesResponseDto = z.infer<typeof getSpacesResponseSchema>;
