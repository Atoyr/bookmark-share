import type { UserDto } from './user.dto';

/**
 * Space Data Transfer Object
 */
export interface SpaceDto {
  id: string;
  name: string;
  owner: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * List Item Space Data Transfer Object
 */
export interface SpacesItemDto {
  id: string;
  name: string;
  owner: string;
  image: string | null;
}

/**
 * Space Detail Data Transfer Object
 */
export interface SpaceDetailDto {
  id: string;
  name: string;
  owner: string;
  users: UserDto[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Get Space Data Transfer Object
 * GET `/api/spaces/:id`
 */
export interface GetSpaceDto {
  space: SpaceDetailDto;
}

/**
 * Get Spaces Data Transfer Object
 * GET `/api/spaces`
 */
export interface GetSpacesDto {
  count: number;
  spaces: SpacesItemDto[];
}
