import { z } from 'zod';
import { postTagRequestSchema, postTagResponseSchema } from '#shared/schemas/tags';

/**
 * Update Tag Request Data Transfer Object
 * POST `/api/tags/[tag_id]`
 */
export type PostTagRequestDto = z.infer<typeof postTagRequestSchema>;

/**
 * Update Tag Response Data Transfer Object
 * POST `/api/tags/[tag_id]`
 */
export type PostTagResponseDto = z.infer<typeof postTagResponseSchema>;
