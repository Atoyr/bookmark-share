import type { UserDto } from './user.dto';

/**
 * Space Data Transfer Object
 */
export interface SpaceDto {
  id: string;
  name: string;
  owner: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
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
  image: string | null;
  users: UserDto[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Get Space Data Transfer Object
 * GET `/api/spaces/:id`
 */
export interface GetSpaceResponseDto {
  space: SpaceDetailDto;
}

/**
 * Get Spaces Data Transfer Object
 * GET `/api/spaces`
 */
export interface GetSpacesResponseDto {
  count: number;
  spaces: SpacesItemDto[];
}
