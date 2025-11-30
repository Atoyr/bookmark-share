import { userSchema } from '#shared/schemas/user.schema';
import { createdAndUpdatedSchema } from '#shared/schemas/datetime';

export const getMeResponseSchema = userSchema.extend(createdAndUpdatedSchema.shape);
