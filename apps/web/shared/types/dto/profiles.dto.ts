import { z } from 'zod';
import { getMeResponseSchema, postMeRequestSchema, postMeResponseSchema } from '#shared/schemas/profiles/me';

/**
 * Get My profile Response DTO
 * GET `/api/profiles/me`
 */
export type GetMeResponseDto = z.infer<typeof getMeResponseSchema>;

/**
 * Post My profile Request DTO
 * POST `/api/profiles/me`
 */
export type PostMeRequestDto = z.infer<typeof postMeRequestSchema>;

/**
 * Post My profile Response DTO
 * POST `/api/profiles/me`
 */
export type PostMeResponseDto = z.infer<typeof postMeResponseSchema>;
