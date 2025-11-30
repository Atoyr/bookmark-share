import { userSchema } from '#shared/schemas/user.schema';
import { updatedAtSchema, createdAndUpdatedSchema } from '#shared/schemas/datetime';

export const postMeRequestSchema = userSchema.extend(updatedAtSchema.shape);
export const postMeResponseSchema = userSchema.extend(createdAndUpdatedSchema.shape);
